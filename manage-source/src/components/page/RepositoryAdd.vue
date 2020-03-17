<template>
  <div>
    <div class="custom-header">
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>管理中心</el-breadcrumb-item>
          <el-breadcrumb-item>知识库管理</el-breadcrumb-item>
          <el-breadcrumb-item>通用知识库</el-breadcrumb-item>
          <el-breadcrumb-item>添加问答对</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <el-button @click="goGengal">返回</el-button>
      </div>
    </div>
    <div class="content">
      <knowledge-item-add-form
        :groupId="$route.params.id"
        @success="handleSuccess"
        @cancel="goGengal"
      ></knowledge-item-add-form>
    </div>
  </div>
</template>

<script>
import KnowledgeItemAddForm from '../common/KnowledgeItemForm/Add';

export default {
  components: { KnowledgeItemAddForm },
  computed: {
    repositoryUrl() {
      return `/repository/config/${this.$route.params.id}`;
    },
  },
  methods: {
    handleSuccess() {
      this.$message({
        message: `添加成功！`,
        type: 'success',
      });
      this.$router.replace(this.repositoryUrl);
    },
    goGengal: function() {
      this.$router.push(this.repositoryUrl);
    },
  },
};
</script>

<style lang="less" scoped>
.repos-header {
  background: white;
}
.content {
  padding: 20px;
}
.custom-header {
  height: 50px;
  background: white;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
