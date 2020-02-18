<template>
  <dg-checkbox-collapse-item
    :name="name"
    title="调用适配服务"
    v-model="formData.callServiceSwitch"
    :disabled="disabled"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
  >
    <template slot="titleMore">
      <el-tooltip class="item" effect="light" popper-class="speech-tip" placement="right-start">
        <div slot="content">
          在外呼任务拨打前或者拨打后，可从开发者接口中获取定制化服务调用，<br />并根据返回值进行逻辑控制。
        </div>
        <i class="el-icon-question"></i>
      </el-tooltip>
    </template>
    <div v-if="formData.callServiceSwitch">
      <dg-form-item label="之前">
        <el-cascader
          clearable
          :disabled="disabled"
          :props="props"
          v-model="formData.preCallServices"
          :options="options"
          class="full-width"
        ></el-cascader>
      </dg-form-item>
      <dg-form-item label="之后">
        <el-cascader
          clearable
          :disabled="disabled"
          :props="props"
          v-model="formData.lastCallServices"
          :options="options"
          class="full-width"
        ></el-cascader>
      </dg-form-item>
    </div>
  </dg-checkbox-collapse-item>
</template>
<script>
import { groupBy } from 'lodash';
import DgCheckboxCollapseItem from '../DgCheckboxCollapseItem';
import DgFormItem from '../DgFormItem';

export default {
  components: { DgCheckboxCollapseItem, DgFormItem },
  model: {
    prop: 'formData',
    event: 'change',
  },
  props: {
    formData: Object,
    name: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      services: [],
      loading: false,
      props: { multiple: this.multiple },
    };
  },
  computed: {
    options() {
      const groupedServices = groupBy(this.services, 'serviceNameEn');
      return Object.keys(groupedServices).map(k => {
        const interfaceNames = groupedServices[k];
        const serviceName = interfaceNames[0].serviceNameCn;
        return {
          value: k,
          label: serviceName,
          children: interfaceNames.map(v => ({
            value: v.serviceUrl,
            label: v.interfaceNameCn,
          })),
        };
      });
    },
  },
  mounted() {
    this.loading = true;
    this.$apiClient
      .post('adapter/queryAdapterServiceList.json', { currentPage: 0, pageSize: 500, searchType: 2 })
      .then(data => {
        const { recordList } = data.returnObject;
        this.services = recordList;
        this.loading = false;
      })
      .catch(res => {
        this.loading = false;
      });
  },
  watch: {
    'formData.callServiceSwitch': function(v) {
      if (!v) {
        this.formData.preCallServices = [];
        this.formData.lastCallServices = [];
      }
    },
  },
};
</script>
<style scoped lang="less">
.full-width {
  width: 100%;
}
.form-item-label {
  border-left: 4px solid #4e8ff9;
  padding: 0 0 0 8px;
  > span {
    color: #bac0c9;
  }
}
</style>
