<template>
  <el-checkbox
    class="mock-collapse-checkbox"
    v-if="!value"
    :value="value"
    @change="handleSwitchChange"
    :disabled="disabled"
    >{{ title }}<slot name="titleMore"></slot
  ></el-checkbox>
  <el-collapse-item v-else :name="name" :disabled="collapseDisabled">
    <template slot="title">
      <el-checkbox
        class="collapse-checkbox"
        :value="value"
        @change="handleSwitchChange"
        :disabled="disabled"
      ></el-checkbox>
      {{ title }}
      <slot name="titleMore"></slot>
    </template>
    <slot></slot>
  </el-collapse-item>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    name: String,
    title: String,
    disabled: Boolean,
    collapseDisabled: Boolean,
    value: Boolean,
  },
  methods: {
    handleSwitchChange(v) {
      this.$emit('change', v);
    },
  },
};
</script>

<style lang="less" scoped>
.collapse-checkbox {
  padding-right: 10px;
}
</style>
<style lang="less">
.mock-collapse-checkbox {
  height: 40px;
  line-height: 40px;
  margin: 0;
  display: block;
}
</style>
