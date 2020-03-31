<template>
  <div class="drawer-form" v-loading="loading">
    <el-form :model="knowledgeForm" :label-position="top">
      <el-collapse v-model="activeNames" @change="handleCollapseChange">
        <el-collapse-item title="使用知识库" name="1">
          <el-form-item>
            <el-radio-group
              v-model="knowledgeForm.useKnowledgeFlag"
              @change="changeUseKnowledge"
              :disabled="isDisabled"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="isUseKnowledge" :error="error.knowledge">
            <el-select
              filterable
              multiple
              v-model="knowledgeForm.knowledge"
              value-key="knowledgeGroupId"
              placeholder="选择知识库"
              :disabled="isDisabled"
            >
              <el-option
                v-for="item in knowledgeList"
                :key="item.knowledgeGroupId"
                :label="item.knowledgeGroupName"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-collapse-item>
        <div v-if="isUseKnowledge">
          <el-collapse-item title="优先级规则" name="2">
            <el-form-item>
              <el-radio-group
                v-model="knowledgeForm.priorityRule"
                @change="changeUseKnowledge"
                :disabled="isDisabled"
              >
                <el-radio :label="0">优先命中意图和问题</el-radio>
                <el-radio :label="1">优先命中关键词</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              单问交互上限
              <el-tooltip
                class="item"
                effect="light"
                placement="bottom-end"
                popper-class="speech-editor-tip"
              >
                <div slot="content">同一问题最多允许询问的次数，如果该问题在知识库内配置的答案数小于单问交互次数，则重复循环。</div>
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <el-form-item>
              <label slot="label" class="form-item-label">上限次数</label>
              <el-input-number
                v-model="knowledgeForm.singleAskedLimit"
                controls-position="right"
                :min="1"
                :max="10"
                :disabled="isDisabled"
              ></el-input-number>
            </el-form-item>
            <el-form-item>
              <label slot="label" class="form-item-label">上限挂机话术</label>
              <div
                class="speech-content-container"
                :id="'hungup-speechcraft-content'"
                :disabled="isDisabled"
              ></div>
              <div class="button-group">
                <input
                  type="button"
                  value="使用音频"
                  class="sound-record-btn sound-btn"
                  onclick="showUploadRecordDialog();"
                  :disabled="isDisabled"
                />
                <input
                  type="button"
                  value="话术试听"
                  class="sound-play-btn sound-btn"
                  @click="createVideoPlayTest"
                  :disabled="isDisabled"
                />
              </div>
            </el-form-item>
          </el-collapse-item>
          <strategy-field
            name="4"
            title="知识库返回策略（兜底）"
            :industryId="industryType"
            :isDisabled="isDisabled"
            :knowledgePlayFlowTypeError="error.knowledgePlayFlowType"
            v-model="knowledgeForm"
          ></strategy-field>
        </div>
      </el-collapse>
      <div class="form-footer">
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button v-if="!isDisabled" type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { isUndefined } from 'lodash';
import StrategyField from '../StrategyField';

export default {
  components: { StrategyField },
  props: {
    visible: Boolean,
    isDisabled: Boolean,
  },
  data() {
    return {
      readyFlag: 0,
      speechcraftId: null,
      activeNames: ['1', '2', '3', '4'],
      knowledgeList: [],
      industryType: '1',
      knowledgeForm: {
        priorityRule: 0,
        useKnowledgeFlag: 0,
        singleAskedLimit: 1,
        knowledge: [],
        knowledgeStrategySwitch: 0,
        strategyTrigger: 1,
        triggerConditions: [],
        knowledgePlayFlowType: undefined,
      },
      error: {
        knowledgePlayFlowType: '',
        knowledge: '',
      },
    };
  },
  computed: {
    isUseKnowledge() {
      return this.knowledgeForm.useKnowledgeFlag === 1;
    },
    hungupSpeechcraftContent: {
      cache: false,
      get: function() {
        return $.utils._dialogVue.knowledgeForm.hungupSpeechcraftContent;
      },
      set: function(hungupSpeechcraftContent) {
        $.utils._dialogVue.knowledgeForm.hungupSpeechcraftContent = hungupSpeechcraftContent;
      },
    },
    loading() {
      return this.readyFlag !== 2;
    },
  },
  methods: {
    async queryKnowledgeGroupList() {
      try {
        const res = await this.$apiClient.get('knowledge/queryKnowledgeGroupList.json');
        if (res.returnObject) {
          this.knowledgeList = res.returnObject.map(k => ({
            knowledgeGroupId: k.id,
            knowledgeGroupName: k.groupName,
          }));
        }
        this.readyFlag++;
      } catch (e) {
        if (e.resultMessageEnum === '0001') {
          this.$message.error($.utils.getErrorMessage(e.errorInfoList));
        }
      }
    },
    async fetchSpeechcraftDetail() {
      try {
        const res = await this.$apiClient.get('speechcraft/querySpeechcraftDetail.json', {
          params: { speechcraftId: this.speechcraftId },
        });
        const {
          useKnowledgeFlag,
          singleAskedLimit,
          hungupSpeechcraftContent,
          knowledgeList,
          industryType,
          knowledgeStrategySwitch,
          strategyTriggerCondition,
          knowledgePlayFlowType,
          priorityRule,
        } = res.returnObject;
        this.industryType = industryType;
        this.knowledgeForm.useKnowledgeFlag = useKnowledgeFlag;
        if (useKnowledgeFlag === 1) {
          this.knowledgeForm.singleAskedLimit = isUndefined(singleAskedLimit) ? 1 : singleAskedLimit;
          this.hungupSpeechcraftContent = isUndefined(hungupSpeechcraftContent) ? '' : hungupSpeechcraftContent;
          this.knowledgeForm.knowledge = (knowledgeList || []).map(({ knowledgeGroupId, knowledgeGroupName }) => ({
            knowledgeGroupId,
            knowledgeGroupName,
          }));

          this.knowledgeForm.knowledgeStrategySwitch = knowledgeStrategySwitch;
          this.knowledgeForm.strategyTrigger = strategyTriggerCondition ? 1 : 0;
          this.knowledgeForm.triggerConditions = strategyTriggerCondition ? strategyTriggerCondition.split(',') : [];
          this.knowledgeForm.knowledgePlayFlowType = isUndefined(knowledgePlayFlowType)
            ? undefined
            : `${knowledgePlayFlowType}`;
          this.knowledgeForm.priorityRule = priorityRule;
        }
        this.readyFlag++;
      } catch (e) {
        if (e.resultMessageEnum === '0001') {
          this.$message.error($.utils.getErrorMessage(e.errorInfoList));
        }
      }
    },
    initHungupSpeechcraftEditor() {
      this.$nextTick(() => {
        new richEditor('hungup-speechcraft-content', _style, this.hungupSpeechcraftContent, this.isDisabled);
      });
    },
    createVideoPlayTest() {
      const currentContent = this.hungupSpeechcraftContent;
      let currentContentArr = currentContent.split('<');
      let data = {};
      data.audios = [];
      data.isAudit = 0;
      let inputTextArr = [];
      var showInnerHtml = "<div style='float:left;'>";
      currentContentArr.forEach(elements => {
        let pathIndex = elements.indexOf('path=');
        let contentIndex = elements.indexOf('content=');
        let splitArr = elements.split('>');
        let _text = '';
        let _url = '';
        let item = {};
        if (pathIndex != '-1' /** && contentIndex != '-1' **/) {
          let contentIndexEnd = elements.indexOf('>');
          const tmp = elements.slice(pathIndex + 6);
          _url = tmp.slice(0, tmp.indexOf('"'));
          if (contentIndex != '-1') {
            _text = elements.slice(contentIndex + 9, contentIndexEnd - 1);
            _text = _text.replace(/&nbsp;/g, '');
          }
          item.url = _url;
          item.text = _text;
          data.audios.push(item);
          showInnerHtml += _text;
        } else if (
          splitArr.length == 2 &&
          splitArr[1] != '' &&
          splitArr[1] != '&nbsp' &&
          splitArr[1].indexOf('.wav}') == -1 &&
          splitArr[1].indexOf('.mp4}') == -1 &&
          splitArr[1].indexOf('.mp3}') == -1
        ) {
          _text = splitArr[1];
          _text = _text.replace(/&nbsp;/g, '');
          let leftKH = _text.split('[');
          let rightKH = _text.split(']');
          if (leftKH.length != rightKH.length) {
            this.$message.error('变量的括号没有匹配成功,请检查括号是否一一对应');
            return;
          }
          //组装innerHtml
          leftKH.forEach(el => {
            let leftKHSplit = [];
            leftKHSplit = el.split(']');
            if (leftKHSplit.length == 2) {
              inputTextArr.push(leftKHSplit[0]);
              let inputStr =
                '[' +
                leftKHSplit[0] +
                ']' +
                '<input type="text" placeholder="输入变量值" id="' +
                leftKHSplit[0] +
                '" value="">';
              showInnerHtml += inputStr + leftKHSplit[1];
            } else {
              showInnerHtml += el;
            }
          });
          item.text = _text;
          data.audios.push(item);
        }
      });
      showInnerHtml += '</div>';
      $.utils._dialogVue.videoVisible = true;
      $.utils._dialogVue.$nextTick(() => {
        document.getElementById('testVideoHtml').innerHTML = showInnerHtml;
      });
      $.utils._dialogVue.splitAuditionArr = inputTextArr;
      $.utils._dialogVue.splitAuditionData = data;
    },
    validate() {
      const { useKnowledgeFlag, knowledge, knowledgeStrategySwitch, knowledgePlayFlowType } = this.knowledgeForm;
      if (useKnowledgeFlag === 1 && !knowledge.length) {
        this.error.knowledge = '缺少知识库';
        return true;
      }

      if (knowledgeStrategySwitch === 1 && !knowledgePlayFlowType) {
        this.error.knowledgePlayFlowType = '缺少知识库返回话术';
        return true;
      }

      return false;
    },
    async handleSubmit() {
      if (this.validate()) return;
      const {
        useKnowledgeFlag,
        knowledge,
        singleAskedLimit,
        priorityRule,
        knowledgeStrategySwitch,
        triggerConditions,
        strategyTrigger,
        knowledgePlayFlowType,
      } = this.knowledgeForm;
      const data = {
        modifyKnowledgeFlag: true,
        id: this.speechcraftId,
        useKnowledgeFlag,
        knowledgeList: knowledge,
        singleAskedLimit,
        hungupSpeechcraftContent: this.hungupSpeechcraftContent,
        priorityRule,
        knowledgeStrategySwitch,
        strategyTriggerCondition: strategyTrigger === 1 ? triggerConditions.join(',') : null,
        knowledgePlayFlowType: isUndefined(knowledgePlayFlowType) ? undefined : +knowledgePlayFlowType,
      };

      await this.$apiClient.post('speechcraft/modifySpeechcraft.json', data);
      this.$message({
        message: `编辑成功！`,
        type: 'success',
      });
      this.$emit('cancel');
    },
    handleCollapseChange(v) {
      this.activeNames = v;
    },
  },
  mounted() {
    this.speechcraftId = $.utils.getUrlParam('speechcraftId');
    if (this.visible) {
      this.queryKnowledgeGroupList();
      this.fetchSpeechcraftDetail();
    }
  },
  watch: {
    'knowledgeForm.knowledgePlayFlowType': function(v) {
      this.error.knowledgePlayFlowType = '';
    },
    'knowledgeForm.useKnowledgeFlag': function(v) {
      this.error.knowledge = '';
      if (v === 1) {
        this.initHungupSpeechcraftEditor();
      }
    },
    'knowledgeForm.knowledge': function(v) {
      this.error.knowledge = '';
    },
  },
};
</script>

<style lang="less">
.drawer-form {
  padding: 0 24px 24px;
  .el-collapse {
    border: none;
    .el-form-item {
      margin-bottom: 5px;
      .el-form-item__label {
        float: initial;
      }
    }
  }
  .el-collapse-item__header {
    height: 40px;
    line-height: 40px;
  }
  .el-collapse-item__content {
    padding-bottom: 18px;
  }
  .el-collapse-item__wrap {
    border-bottom: none;
  }
}
</style>
<style lang="less" scoped>
.form-item-label {
  border-left: 4px solid #4e8ff9;
  padding: 0 0 0 8px;
  font-size: 13px;
  > span {
    color: #bac0c9;
  }
}
.form-footer {
  margin-top: 50px;
}
.button-group {
  margin-top: -1px;
  display: flex;
}
.sound-btn {
  width: 100%;
  border-radius: 0 0 4px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4e8ff9;
  margin: 0;
  &:first-of-type {
    border-radius: 0 0 0 4px;
  }
  &:last-of-type {
    border-radius: 0 0 4px 0;
  }
  span {
    display: flex;
    align-items: center;
  }
  i {
    font-size: 18px;
  }
}
</style>
