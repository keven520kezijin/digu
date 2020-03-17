<template>
  <div>
    <div class="custom-header">
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>管理中心</el-breadcrumb-item>
          <el-breadcrumb-item>知识库管理</el-breadcrumb-item>
          <el-breadcrumb-item>通用知识库</el-breadcrumb-item>
          <el-breadcrumb-item>编辑问答对</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <el-button @click="goGengal">返回</el-button>
      </div>
    </div>
    <div class="content">
      <knowledge-item-edit-form
        :id="$route.params.id"
        @success="handleSuccess"
        @cancel="goGengal"
      ></knowledge-item-edit-form>
    </div>
  </div>
</template>

<script>
import KnowledgeItemEditForm from '../common/KnowledgeItemForm/Edit';

export default {
  components: { KnowledgeItemEditForm },
  methods: {
    handleSuccess() {
      this.$message({
        message: `编辑成功！`,
        type: 'success',
      });
      this.$router.go(-1);
    },
    goGengal: function() {
      this.$router.go(-1);
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
