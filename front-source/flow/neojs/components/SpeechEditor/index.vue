<template>
  <el-form class="drawer-form">
    <el-collapse v-model="activeNames" @change="handleCollapseChange">
      <el-collapse-item title="话术内容" name="1">
        <dg-form-item label="标题">
          <el-input v-model="speechLabel" placeholder="请输入标题" :disabled="isDisabled"></el-input>
        </dg-form-item>
        <content-area :isDisabled="isDisabled"></content-area>
      </el-collapse-item>
      <checkbox-group :isDisabled="isDisabled" name="2"></checkbox-group>
      <adapter-fields name="3" v-model="adapterForm" :disabled="isDisabled" :multiple="true"></adapter-fields>
      <strategy-field
        name="4"
        title="知识库返回策略"
        :industryId="industryType"
        :isDisabled="isDisabled"
        v-model="knowledgeForm"
      ></strategy-field>
    </el-collapse>
    <el-button v-if="!deleteDisabled" @click="handleDelete" type="danger" round class="footer-button">删除</el-button>
  </el-form>
</template>

<script>
import { debounce } from 'lodash';
import DgFormItem from '../DgFormItem';
import ContentArea from './ContentArea';
import CheckboxGroup from './CheckboxGroup';
import StrategyField from '../StrategyField';
import AdapterFields from './AdapterFields';

export default {
  components: { DgFormItem, ContentArea, CheckboxGroup, StrategyField, AdapterFields },
  props: {
    isDisabled: Boolean,
    visible: Boolean,
  },
  data() {
    const { _strategyTriggerCondition, _knowledgePlayFlowType, _preCallServices, _lastCallServices } = $.utils;
    return {
      activeNames: ['1', '2', '3', '4'],
      industryType: '1',
      speechcraftId: null,
      speechLabel: $.utils._speechLabel,
      knowledgeForm: {
        knowledgeStrategySwitch: +$.utils._knowledgeStrategySwitch,
        strategyTrigger: _strategyTriggerCondition ? 1 : 0,
        triggerConditions: _strategyTriggerCondition ? _strategyTriggerCondition.split(',') : [],
        knowledgePlayFlowType: $.utils._knowledgePlayFlowType,
      },
      adapterForm: {
        callServiceSwitch: !!_preCallServices || !!_lastCallServices,
        preCallServices: _preCallServices ? _preCallServices.split(',').map(v => ['', v]) : [],
        lastCallServices: _lastCallServices ? _lastCallServices.split(',').map(v => ['', v]) : [],
      },
    };
  },
  computed: {
    deleteDisabled() {
      return this.isDisabled || _nodeType === 'start';
    },
  },
  methods: {
    handleCollapseChange(v) {
      this.activeNames = v;
    },
    updateModel: debounce(() => {
      updateModel(currentCell);
    }, 300),
    async fetchSpeechcraftDetail() {
      try {
        const res = await this.$apiClient.get('speechcraft/querySpeechcraftDetail.json', {
          params: { speechcraftId: this.speechcraftId },
        });
        const { industryType } = res.returnObject;
        this.industryType = industryType;
      } catch (e) {
        if (e.resultMessageEnum === '0001') {
          this.$message.error($.utils.getErrorMessage(e.errorInfoList));
        }
      }
    },
    handleDelete() {
      graph.removeCells();
      this.$emit('cancel');
    },
  },
  mounted() {
    this.speechcraftId = $.utils.getUrlParam('speechcraftId');
    if (!this.visible) {
      this.updateModel();
    } else {
      this.$apiClient
        .post('adapter/queryAdapterServiceList.json', { currentPage: 0, pageSize: 500, searchType: 2 })
        .then(data => {
          const { recordList } = data.returnObject;
          const recordMap = recordList.reduce((r, v) => ({ ...r, [v.serviceUrl]: v.serviceNameEn }), {});
          const { preCallServices, lastCallServices } = this.adapterForm;
          this.adapterForm.preCallServices = preCallServices
            .filter(([, v]) => !!recordMap[v])
            .map(([, v]) => [recordMap[v], v]);

          this.adapterForm.lastCallServices = lastCallServices
            .filter(([, v]) => !!recordMap[v])
            .map(([, v]) => [recordMap[v], v]);
        });
    }
  },
  watch: {
    speechLabel(v) {
      $.utils._speechLabel = v;
      this.updateModel();
    },
    'knowledgeForm.knowledgeStrategySwitch': function(v) {
      $.utils._knowledgeStrategySwitch = `${v}`;
    },
    'knowledgeForm.strategyTrigger': function(v) {
      if (!v) {
        this.knowledgeForm.triggerConditions = [];
      }
    },
    'knowledgeForm.triggerConditions': function(v) {
      $.utils._strategyTriggerCondition = v.join(',');
    },
    'knowledgeForm.knowledgePlayFlowType': function(v) {
      $.utils._knowledgePlayFlowType = v;
    },
    'adapterForm.callServiceSwitch': function(v) {
      if (!v) {
        this.preCallServices = [];
        this.lastCallServices = [];
      }
    },
    'adapterForm.preCallServices': function(v) {
      $.utils._preCallServices = v.map(sv => sv[1]).join(',');
    },
    'adapterForm.lastCallServices': function(v) {
      $.utils._lastCallServices = v.map(sv => sv[1]).join(',');
    },
  },
};
</script>

<style lang="less" scoped>
.footer-button {
  width: 100%;
  margin-top: 40px;
}
</style>
<style lang="less">
.drawer-form {
  .el-checkbox__label {
    font-size: 13px;
  }
}
</style>
