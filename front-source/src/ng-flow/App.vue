<template>
    <div class="flow-outer" @keydown.ctrl.83.prevent="saveToFlow" @keydown.meta.83.prevent="saveToFlow" tabindex="1">
        <Header
                :speechCraft="speechCraft"
                :viewType="viewType"
                @updateSpeechForm="updateSpeechForm"
                :saveTime="saveTime"
                @backToFlow="saveBackToFlow"
        ></Header>
        <div class="flow-container">
            <Drawer v-on:drawerOpen="drawerOpen()" v-on:drawerClose="drawerClose()"></Drawer>
            <Main
                    class="main"
                    :class="isDrawerOpen ? '' : 'full-width'"
                    :speechCraft="speechCraft"
                    v-model="flowRobotNodes"
            ></Main>
        </div>
        <div v-if="changeNoticeDialogVisible" class="sync-message-modal">
            <span>
                <i class="el-icon-warning"></i>
                您正在编辑的话术在{{lastEditTime}}一个版本已经保存草稿,您想要
            </span>
            <el-link type="primary" @click="changeNoticeRedirect()">查看</el-link>，
            <el-link type="primary" @click="changeNoticeUse()">使用</el-link>或者
            <el-link type="primary" @click="changeNoticeClose()">放弃</el-link>它？
            <a class="el-icon-close" @click="changeNoticeClose()"></a>
        </div>
        <div v-if="changeSoundNoticeDialogVisible" class="sync-message-modal sync-sound-message-modal">
            <span>
                <i class="el-icon-warning"></i>
                音频库有更新,
            </span>
            <el-link type="primary" @click="changeSoundNoticeUse()">更新</el-link>，
            或
            <el-link type="primary" @click="changeSoundNoticeIgnore()">忽略</el-link>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { trimStart } from 'lodash/string';
    import queryString from 'query-string';
    import Header from './components/Header';
    import Drawer from './components/Drawer';
    import Main from './components/Main';
    import { API_ERROR_CODE, API_SUCCESS_CODE } from '../common/enums';
    import { flow, backToFlow } from './lib/postMessageBridge';
    import { xmlToFlowRobotData, flowRobotDataToXml } from './lib/nodeHandler';
    import moment from 'moment';
    import bus from '../common/bus';

    export default {
        components: {
            Header,
            Drawer,
            Main,
        },

        data() {
            return {
                isDrawerOpen: true,
                speechCraft: {},
                viewType: '',
                flowRobotNodes: [],
                flowXml2JsonData: null,
                saveTime: '',
                lastEditTime: '',
                changeNoticeDialogVisible: false,
                preUseFlowRobotNodes: null,
                initFlowRobotNodesJson: '',
                soundUpdateStringFlag: "",
                changeSoundNoticeDialogVisible: false,
            };
        },

        async created() {
            if (window.location.hash === '#backToFlow') {
                backToFlow();
                return;
            }
            const parsedHash = queryString.parse(window.location.hash.replace(/^(.*)\?/g, ''));
            this.viewType = parsedHash.viewType;
            this.speechCraft = await this.getSpeechCraftDetail(parsedHash.speechcraftId);
            this.flowRobotNodes = xmlToFlowRobotData(await this.getFlowData());
            this.initFlowRobotNodesJson = JSON.stringify(this.flowRobotNodes);
            setInterval(async () => {
                await this.saveToFlow();
            }, 1000 * 60 * 10);


            setInterval(async () => {
                // 轮训检查数据是否有变动
                const res = await this.getSpeechcraftFlowByFlowType(parsedHash.speechcraftId);
                this.preUseFlowRobotNodes = xmlToFlowRobotData(res.flowContent);
                if (JSON.stringify(this.preUseFlowRobotNodes) !== this.initFlowRobotNodesJson) {
                    this.lastEditTime = res.editTime;
                    this.changeNoticeDialogVisible = true;
                }

                // 轮训检查音频库
                await this.getAudioUpdate();
            }, 5000);

            await this.getAudioUpdate();
        },

        methods: {
            changeNoticeRedirect() {
                window.open(`${baseHost}/flow/index.html?viewType=1&speechcraftId=${this.speechCraft.speechcraftId}&flowType=1`);
            },

            changeNoticeUse() {
                this.flowRobotNodes = this.preUseFlowRobotNodes;
                this.initFlowRobotNodesJson = JSON.stringify(this.preUseFlowRobotNodes);
                this.changeNoticeDialogVisible = false;
            },

            changeNoticeClose() {
                this.initFlowRobotNodesJson = JSON.stringify(this.preUseFlowRobotNodes);
                this.changeNoticeDialogVisible = false;
            },

            changeSoundNoticeUse() {
                bus.$emit('updateSoundList', true);
                this.changeSoundNoticeDialogVisible = false;
            },

            changeSoundNoticeIgnore() {
                this.changeSoundNoticeDialogVisible = false;
            },

            updateSpeechForm(k, v) {
                this.speechCraft[k] = v;
            },

            async getSpeechCraftDetail(speechcraftId) {
                if (!speechcraftId) {
                    this.$message.error('话术不存在');
                    return;
                }

                const res = await axios.get(`${this.$baseUrl}speechcraft/querySpeechcraftDetail.json?speechcraftId=${speechcraftId}`);
                const { resultMessageEnum, returnObject } = res.data;
                if (resultMessageEnum !== API_SUCCESS_CODE) {
                    this.$message.error('接口数据错误');
                    return;
                }

                return returnObject;
            },

            async getSpeechcraftFlowByFlowType(speechcraftId) {
                if (!speechcraftId) {
                    this.$message.error('话术不存在');
                    return;
                }
                const res = await axios.get(`${this.$baseUrl}speechcraft/querySpeechcraftFlowByFlowType.json?speechcraftId=${speechcraftId}&flowType=1`);
                const { resultMessageEnum, returnObject } = res.data;
                if (resultMessageEnum !== API_SUCCESS_CODE) {
                    this.$message.error('接口数据错误');
                    return;
                }

                return returnObject;
            },


            async getAudioUpdate() {
                const { data } = await axios.get(this.$baseUrl + 'sound/querySoundConfigGroupList.json');
                if (data.resultMessageEnum !== API_SUCCESS_CODE) {
                    this.$message.error('后端数据加载异常');
                    return;
                }

                const audioGroupIds = [];
                data.returnObject.forEach(item => {
                    audioGroupIds.push(item.id)
                });

                const { data: timeStampRes } = await axios.post(this.$baseUrl + 'sound/querySoundItemTimestampList.json', audioGroupIds);
                if (timeStampRes.resultMessageEnum !== API_SUCCESS_CODE) {
                    this.$message.error('音频库后端检查后端数据加载异常');
                    return;
                }

                const flag = JSON.stringify(timeStampRes.returnObject);
                if (this.soundUpdateStringFlag !== "" && this.soundUpdateStringFlag !== flag) {
                    this.changeSoundNoticeDialogVisible = true;
                }
                this.soundUpdateStringFlag = flag
            },

            getFlowData() {
                return new Promise((resolve, reject) => {
                    try {
                        const getFlowTimer = setInterval(async () => {
                            const res = await flow.get();
                            if (res) {
                                clearTimeout(getFlowTimer);
                                resolve(res);
                            }
                        }, 100)
                    } catch (e) {
                    }
                })
            },

            async saveToFlow() {
                const xml = flowRobotDataToXml(this.flowRobotNodes, await flow.get());
                const ret = await flow.set(xml);
                if (ret === 'success') {
                    this.saveTime = moment().format('HH:mm:ss');
                    this.initFlowRobotNodesJson = JSON.stringify(this.flowRobotNodes);
                }
            },

            /**
             * 保存并返回流程图
             * @return {Promise.<void>}
             */
            async saveBackToFlow() {
                await this.saveToFlow();
                backToFlow();
            },

            drawerOpen() {
                this.isDrawerOpen = true;
            },

            drawerClose() {
                this.isDrawerOpen = false;
            },
        },
    }
</script>
<style lang="less">
    body {
        background: repeating-linear-gradient(
                -45deg,
                #E6EBF4,
                #E6EBF4 1px,
                transparent 0,
                transparent 8px
        ) #EDF3FE;
        overflow-x: hidden;
    }

    .main {
        position: absolute;
        left: 31px;
        top: 111px;
        bottom: 32px;
        right: 365px;
        transition: right 0.2s linear;
        &.full-width {
            right: 31px;
        }
    }

    .flow-outer {
        display: flex;
        flex-direction: column;
        height: 100%;
        outline: none;
    }

    .flow-container {
        flex: 1;
    }

    .sync-message-modal {
        text-align: center;
        position: absolute;
        z-index: 1000;
        width:720px;
        padding: 12px 0;
        margin: 0 auto;
        top: 90px;
        right: 0;
        left: 0;
        background:rgba(255,255,255,1);
        box-shadow:1px 3px 10px 0px rgba(122,125,133,0.12);
        border-radius:4px;
        border:1px solid rgba(222,226,230,1);
        color: #647184;

        .el-icon-warning {
            font-size: 16px;
            color: #F8AF2B;
        }

        .el-icon-close {
            color: #647184;
            cursor: pointer;
            float: right;
            margin-right: 20px;
            font-size: 16px;
        }
    }

    .sync-sound-message-modal {
        width: 500px;
    }
</style>

