<template>
  <el-form-item :label="label">
    <el-select v-model="formData.select">
      <el-option label="不限" value="unlimited"></el-option>
      <el-option label="自定义" value="custom"></el-option>
    </el-select>
    <el-input-number
      v-if="formData.select === 'custom'"
      v-model="formData.count"
      controls-position="right"
      :min="1"
      :max="1000"
    ></el-input-number>
    次
  </el-form-item>
</template>

<script>
export default {
  model: {
    prop: 'formData',
    event: 'change',
  },
  props: {
    label: String,
    formData: Object,
  },
};
</script>

<style></style>
