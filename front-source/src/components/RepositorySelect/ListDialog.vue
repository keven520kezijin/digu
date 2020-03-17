<template>
  <el-dialog
    :visible="visible"
    :append-to-body="true"
    title="知识库模版"
    width="80%"
    @close="handleClose"
  >
    <repository-table
      v-if="listVisible"
      rowSelection
      :key="repositoryKey"
      @selection-change="handleSelectionChange"
      :selection="selection"
      :stableSet="stableSet"
    >
      <template v-slot:acion-column="scope">
        <a @click="handleViewClick(scope.row)" href="javascript:void(0)">查看</a>
      </template>
    </repository-table>
    <knowledge-item-list v-else :groupId="groupId"></knowledge-item-list>
    <span v-if="listVisible" slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
    <span v-else slot="footer" class="dialog-footer">
      <el-checkbox
        :value="isSngleSelected"
        :disabled="isSngleDisabled"
        @change="handleSingleSelectChange"
      >选择该模版</el-checkbox>
      <el-button type="primary" @click="detail = null" class="back-btn">返回列表</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { isUndefined } from 'lodash';
import RepositoryTable from '../RepositoryTable';
import KnowledgeItemList from '../KnowledgetItemList';

export default {
  components: { RepositoryTable, KnowledgeItemList },
  props: {
    visible: Boolean,
    defaultSelection: Array,
    stableSet: Set,
  },
  data() {
    return {
      selection: this.defaultSelection,
      detail: null,
      repositoryKey: 0,
    };
  },
  computed: {
    listVisible() {
      return this.detail === null;
    },
    isSngleSelected() {
      if (!this.detail) return false;
      return !!this.selection.find(v => v.id === this.detail.id) || this.stableSet.has(this.detail.id);
    },
    isSngleDisabled() {
      if (!this.detail) return false;
      return this.stableSet.has(this.detail.id);
    },
    groupId() {
      return this.detail && this.detail.id;
    },
  },
  methods: {
    handleClose() {
      this.selection = this.defaultSelection;
      this.detail = null;
      this.$emit('close');
    },
    handleSubmit() {
      this.$emit('submit', this.selection);
      this.handleClose();
    },
    handleViewClick(v) {
      this.detail = v;
    },
    handleSelectionChange(v) {
      this.selection = v;
    },
    handleSingleSelectChange(v) {
      if (v) {
        this.selection = this.selection.concat(this.detail);
      } else {
        this.selection = this.selection.filter(s => s.id !== this.detail.id);
      }
    },
  },
  watch: {
    defaultSelection(v) {
      this.selection = v;
    },
    visible(v) {
      if (v) {
        this.repositoryKey++;
      }
    },
  },
};
</script>
<style scoped>
.back-btn {
  margin-left: 12px;
}
</style>
