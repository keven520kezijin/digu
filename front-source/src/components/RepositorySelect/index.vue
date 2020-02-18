<template>
  <div>
    <label class="el-form-item__label action-label">
      选择模版
      <!-- <a @click="dialogVisible = true">点击添加</a> -->
    </label>
    <div class="selection">
      <el-tag size="medium" v-for="group in stableSelection || []" :key="group.id">{{ group.groupName }}</el-tag>
      <el-tag closable size="medium" v-for="group in selection" :key="group.id" @close="handleRemove(group.id)">{{
        group.groupName
      }}</el-tag>
      <el-button class="button-new-tag" size="small" @click="dialogVisible = true">+ 点击添加</el-button>
    </div>
    <list-dialog
      :visible="dialogVisible"
      @close="dialogVisible = false"
      @submit="handleSubmit"
      :defaultSelection="selection"
      :stableSet="stableSet"
    ></list-dialog>
  </div>
</template>
<script>
import ListDialog from './ListDialog';

export default {
  name: 'repository-select',
  components: { ListDialog },
  model: {
    prop: 'selection',
    event: 'change',
  },
  props: {
    selection: Array,
    stableSelection: Array,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  computed: {
    stableSet() {
      return new Set((this.stableSelection || []).map(s => s.id));
    },
  },
  methods: {
    handleSubmit(v) {
      this.$emit('change', v);
    },
    handleRemove(v) {
      this.$emit(
        'change',
        this.selection.filter(s => s.id !== v),
      );
    },
  },
};
</script>
<style scoped lang="less">
.el-form-item__label.action-label {
  display: flex;
  justify-content: space-between;
  > a:hover {
    cursor: pointer;
  }
}
.selection > .el-tag {
  margin-right: 8px;
  margin-bottom: 4px;
}
</style>
