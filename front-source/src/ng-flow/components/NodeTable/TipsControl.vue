<template>
    <div>
        <ul v-if="isShow && (showDeleteButton || showAppendButton)">
            <li v-if="showDeleteButton" @click="deleteHandle(() => $emit('deleteSpeech'))">删除分话术</li>
            <li v-if="showAppendButton" @click="$emit('appendSpeech')">新增分话术</li>
        </ul>
        <el-dialog
                title="刪除话术"
                :visible.sync="dialogVisible"
                width="30%"
                :modal-append-to-body="false"
                :append-to-body="true"
                :destroy-on-close="true"
        >
            <span>删除话术后，在保存后编辑器也会同步删除</span>
            <span slot="footer" class="dialog-footer">
                <el-checkbox class="dialog-footer-checkbox" v-model="checked">不在提示</el-checkbox>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            showDeleteButton: {
                type: Boolean,
                default: true,
            },
            showAppendButton: {
                type: Boolean,
                default: true,
            }
        },

        data() {
            return {
                isShow: false,
                confirmCallback: () => {},
                dialogVisible: false,
                checked: false,
            };
        },

        methods: {
            toggle() {
                this.isShow = !this.isShow;
            },

            close() {
                this.isShow = false;
            },

            deleteHandle(cb) {
                if (this.$cookies.get('deleteFlowChecked')) {
                    cb();
                    return;
                }
                this.confirmCallback = cb;
                this.dialogVisible = true;
            },

            handleConfirm() {
                if (this.checked) {
                    this.$cookies.set("deleteFlowChecked", 1 ,60 * 60 * 24 * 15)
                }
                this.dialogVisible = false;
                this.confirmCallback();
            },
        }
    }
</script>

<style lang="less" scoped>
    .dialog-footer-checkbox {
        margin-right: 20px;
    }
    ul {
        width: 98px;
        background: rgba(255,255,255,1);
        box-shadow: 1px 2px 5px 0 rgba(199,202,208,0.44);
        border-radius: 4px;
        border: 1px solid rgba(222,226,230,1);
        line-height: 32px;

        li {
            list-style: none;
            &:hover {
                color: #4B8FFF;
            }
        }
    }
</style>
