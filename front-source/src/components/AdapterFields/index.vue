<template>
  <div>
    <el-form-item prop="callServiceSwitch">
      <el-checkbox :disabled="disabled" v-model="formData.callServiceSwitch">调用适配服务</el-checkbox>
      <el-tooltip class="item" effect="light" popper-class="speech-tip" placement="right-start">
        <div slot="content">
          在外呼任务拨打前或者拨打后，可从开发者接口中获取定制化服务调用，<br />并根据返回值进行逻辑控制。
        </div>
        <i class="el-icon-question"></i>
      </el-tooltip>
    </el-form-item>
    <el-form-item v-if="formData.callServiceSwitch" prop="preCallServiceIds">
      <label slot="label" class="form-item-label">拨打前使用<span>（与“拨打后使用”必填1个）</span></label>
      <el-cascader
        clearable
        :disabled="disabled"
        :props="props"
        v-model="formData.preCallServiceIds"
        :options="options"
        class="full-width"
      ></el-cascader>
    </el-form-item>
    <el-form-item v-if="formData.callServiceSwitch" prop="lastCallServiceIds">
      <label slot="label" class="form-item-label">拨打后使用</label>
      <el-cascader
        clearable
        :disabled="disabled"
        :props="props"
        v-model="formData.lastCallServiceIds"
        :options="options"
        class="full-width"
      ></el-cascader>
    </el-form-item>
  </div>
</template>
<script>
import { groupBy } from 'lodash';
export default {
  model: {
    prop: 'formData',
    event: 'change',
  },
  props: {
    formData: Object,
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
            value: v.id,
            label: v.interfaceNameCn,
          })),
        };
      });
    },
  },
  mounted() {
    this.$apiClient
      .post('adapter/queryAdapterServiceList.json', { currentPage: 0, pageSize: 500, searchType: 2 })
      .then(data => {
        const { recordList } = data.returnObject;
        this.services = recordList;
      });
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
