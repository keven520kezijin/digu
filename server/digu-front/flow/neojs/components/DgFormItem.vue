<template>
  <el-form-item>
    <slot name="label"
      ><label slot="label" class="dg-form-item-label">{{ label }}</label></slot
    >
    <slot></slot>
  </el-form-item>
</template>

<script>
export default {
  props: {
    label: String,
  },
};
</script>

<style lang="less" scoped>
.dg-form-item-label {
  border-left: 4px solid #4e8ff9;
  padding: 0 0 0 8px;
  font-size: 13px;
  > span {
    color: #bac0c9;
  }
}
</style>
