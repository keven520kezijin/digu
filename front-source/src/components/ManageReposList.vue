<template>
  <el-dialog append-to-body width="80%" :visible="visible" @close="handleClose">
    <div slot="title">知识库模版</div>
    <repository-table v-if="listVisible" :key="repositoryKey" :selection="[]">
      <template v-slot:acion-column="scope">
        <a @click="handleViewClick(scope.row.id)" href="javascript:void(0)">查看</a>
        <a
          @click="handleCopyClick(scope.row)"
          href="javascript:void(0)"
          :style="{'margin-left': '10px'}"
        >复制</a>
      </template>
    </repository-table>
    <knowledge-item-list v-else :groupId="detailID"></knowledge-item-list>
    <span v-if="!listVisible" slot="footer" class="dialog-footer">
      <el-button type="primary" @click="detailID = null" class="back-btn">返回列表</el-button>
    </span>
  </el-dialog>
</template>

<script>
import RepositoryTable from './RepositoryTable';
import KnowledgeItemList from './KnowledgetItemList';

export default {
  components: { RepositoryTable, KnowledgeItemList },
  props: {
    visible: Boolean,
  },
  data() {
    return {
      detailID: null,
      repositoryKey: 0,
    };
  },
  computed: {
    listVisible() {
      return this.detailID === null;
    },
  },
  methods: {
    handleClose() {
      this.detailID = null;
      this.$emit('close');
    },
    handleViewClick(v) {
      this.detailID = v;
    },
    handleCopyClick(v) {
      this.$emit('close');
      this.$emit('copy', v);
    },
  },
  watch: {
    visible(v) {
      if (v) {
        this.repositoryKey++;
      }
    },
  },
};
</script>

<style>
</style>