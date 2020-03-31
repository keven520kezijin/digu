<template>
  <dg-checkbox-collapse-item
    :title="title"
    :name="name"
    :value="formData.knowledgeStrategySwitch === 1"
    :disabled="isDisabled"
    @change="handleSwitchChange"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
  >
    <template slot="titleMore">
      <el-tooltip class="item" effect="light" placement="bottom-end" popper-class="speech-editor-tip">
        <div slot="content">
          当用户反问时触发了知识库，可选择满足某些条件后，执行播放什么类型的话术。次设置为全局兜底策略，如果需要个性化配置请在编辑器上操作。
          话术编辑器【知识库返回策略】说明文案：当用户反问时触发了知识库，可选择触发某些条件后，回到当前流程并播放什么类型的话术。
        </div>
        <i class="el-icon-question"></i>
      </el-tooltip>
    </template>
    <el-form-item v-if="formData.knowledgeStrategySwitch === 1">
      <label slot="label" class="form-item-label">触发条件</label>
      <el-radio-group v-model="formData.strategyTrigger" :disabled="isDisabled">
        <el-radio :label="1">意图</el-radio>
        <el-radio :label="0">无需回答知识库</el-radio>
      </el-radio-group>
      <el-select
        v-if="formData.strategyTrigger === 1"
        v-model="formData.triggerConditions"
        value-key="id"
        filterable
        multiple
        placeholder="请选择用户提问后触发了什么条件后可以返回当前编辑器"
        :disabled="isDisabled"
      >
        <el-option v-for="item in intentions" :key="item.id" :label="item.intentionName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="formData.knowledgeStrategySwitch === 1" :error="knowledgePlayFlowTypeError">
      <label slot="label" class="form-item-label">返回调用</label>
      <el-select
        v-model="formData.knowledgePlayFlowType"
        value-key="id"
        filterable
        placeholder="请选择从知识库返回后，播放哪类话术"
        :disabled="isDisabled"
      >
        <el-option v-for="item in $options.flowOptions" :key="item.id" :label="item.label" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
  </dg-checkbox-collapse-item>
</template>

<script>
import DgCheckboxCollapseItem from '../DgCheckboxCollapseItem';

export default {
  components: { DgCheckboxCollapseItem },
  model: {
    prop: 'formData',
    event: 'change',
  },
  props: {
    name: String,
    title: String,
    formData: Object,
    industryId: String,
    isDisabled: Boolean,
    knowledgePlayFlowTypeError: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      intentions: [],
      loading: false,
    };
  },
  flowOptions: [
    { id: '1', label: '正向话术' },
    { id: '2', label: '复述话术' },
    { id: '3', label: '异常话术' },
    { id: '4', label: '静默话术' },
  ],
  methods: {
    async queryIntentions() {
      try {
        this.loading = true;
        const res = await this.$apiClient.post('intention/queryIntentionSpeechcraftList.json', {
          intentionType: 1,
          industryId: this.industryId,
          pageSize: 5000,
        });
        this.intentions = res.returnObject.recordList;
      } finally {
        this.loading = false;
      }
    },
    handleSwitchChange(v) {
      this.$emit('change', { ...this.formData, knowledgeStrategySwitch: v ? 1 : 0 });
    },
  },
  created() {
    this.queryIntentions();
  },
  watch: {
    industryId() {
      this.queryIntentions();
    },
  },
};
</script>

<style lang="less" scoped>
.form-item-label {
  border-left: 4px solid #4e8ff9;
  padding: 0 0 0 8px;
  font-size: 13px;
  > span {
    color: #bac0c9;
  }
}
</style>
