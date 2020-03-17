<template>
  <div>
    <div class="dialog-content">
      <el-form label-position="top">
        <adapter-fields v-model="formData"></adapter-fields>
      </el-form>
    </div>
    <div class="el-dialog__footer">
      <span class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </div>
  </div>
</template>
<script>
import AdapterFields from '../AdapterFields';

export default {
  components: {
    AdapterFields,
  },
  props: {
    task: Object,
  },
  data() {
    return {
      formData: {
        ...this.task,
        preCallServiceIds: this.task.preCallServiceIds,
        lastCallServiceIds: this.task.lastCallServiceIds,
        callServiceSwitch: this.task.callServiceSwitch === 1,
      },
    };
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    async handleSubmit() {
      const { preCallServiceIds, lastCallServiceIds, callServiceSwitch, ...restData } = this.formData;
      try {
        const data = await this.$apiClient.post('task/updateTask.json', {
          ...restData,
          callServiceSwitch: callServiceSwitch ? 1 : 0,
          preCallServiceIds:
            preCallServiceIds && preCallServiceIds.length && callServiceSwitch
              ? preCallServiceIds[preCallServiceIds.length - 1]
              : null,
          lastCallServiceIds:
            lastCallServiceIds && lastCallServiceIds.length && callServiceSwitch
              ? lastCallServiceIds[lastCallServiceIds.length - 1]
              : null,
        });
        this.$message({ message: '更新成功！', type: 'success' });
        this.$emit('close');
        this.$emit('refresh');
      } catch (e) {
        this.$$message.error('系统错误！');
        console.error(e);
      }
    },
  },
};
</script>
<style scoped>
.dialog-content {
  padding-bottom: 30px;
  width: 300px;
  margin: 0 auto;
}
.el-dialog__footer {
  margin-right: -20px;
  margin-bottom: -30px;
}
.el-button + .el-button {
  margin-left: 0;
}
</style>
