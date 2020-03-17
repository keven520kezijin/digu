<template>
  <div class="drawer-form">
    <el-form :model="formData" ref="groupForm" :rules="formRules" label-position="top">
      <el-form-item label="知识库名称" prop="groupName">
        <el-input v-model="formData.groupName"></el-input>
      </el-form-item>
      <el-form-item label="知识库分类" prop="knowledgeTypeId">
        <el-select v-model="formData.knowledgeTypeId">
          <el-option label="未分类" :value="''"></el-option>
          <el-option
            v-for="item in repositoryMenuForm"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <slot v-bind:formData="formData">
        <el-form-item>
          <el-checkbox v-model="formData.useTemplate">使用知识库模版</el-checkbox>
        </el-form-item>
        <template v-if="formData.useTemplate">
          <el-form-item :label="useTemplateLabel" class="custom-form-item">
            <div class="knowleage-reference-radio-group">
              <div v-if="!disabledCopy">
                <el-radio v-model="formData.referenceType" :label="0">复制</el-radio>
              </div>
              <div>
                <el-radio v-if="!disabledCopy" v-model="formData.referenceType" :label="1">关联</el-radio>
                <div v-if="formData.referenceType === 1">
                  <el-radio v-model="formData.relatedType" :label="0">关联问题模板</el-radio>
                  <el-radio v-model="formData.relatedType" :label="1">关联完整问答模板</el-radio>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item class="custom-form-item">
            <repository-select v-model="formData.knowledgeTemplates"></repository-select>
          </el-form-item>
        </template>
      </slot>
      <sound-file-copy v-if="isCopySoundShow" v-model="formData.soundCopy"></sound-file-copy>
      <el-form-item>
        <div class="form-buttons">
          <el-button @click="handleCancel">取消</el-button>
          <el-button :loading="loading" :disabled="loading" type="primary" @click="handleSubmit">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import RepositorySelect from '../RepositorySelect';
import SoundFileCopy from '../SoundFileCopy';

export default {
  components: { RepositorySelect, SoundFileCopy },
  props: {
    repositoryMenuForm: Array,
    visible: Boolean,
    initValues: Object,
    disabledCopy: Boolean,
    sound: Boolean,
  },
  data() {
    return {
      loading: false,
      formData: JSON.parse(JSON.stringify(this.initValues)),
    };
  },
  computed: {
    formRules() {
      return {
        groupName: { required: true, message: '请输入知识库名称', trigger: 'blur' },
      };
    },
    isCopySoundShow() {
      return this.sound || (this.formData.useTemplate && this.formData.referenceType === 0);
    },
    useTemplateLabel() {
      return this.disabledCopy ? '选择关联问题还是关联完整问答' : '选择复制还是关联知识库模版';
    },
  },
  methods: {
    handleCancel() {
      this.$emit('cancel');
    },
    handleSubmit() {
      this.$refs['groupForm'].validate(valid => {
        this.loading = true;
        this.$emit('submit', {
          formData: this.formData,
          callback: () => {
            this.loading = false;
          },
        });
      });
    },
  },
  watch: {
    initValues(v) {
      this.formData = JSON.parse(JSON.stringify(v));
    },
  },
};
</script>

<style lang="less" scoped>
.drawer-form {
  .el-select {
    display: block;
  }
  .form-buttons {
    margin-top: 30px;
  }
  .el-select > .el-input {
    display: inline-block;
  }
}
.custom-form-item {
  .el-form-item__label {
    border-left: 4px solid #4e8ff9;
    padding: 0 0 0 8px;
    line-height: 1;
    margin: 8px 0;
  }
}

.knowleage-reference-radio-group {
  display: flex;
  align-items: flex-start;
  > div:first-child {
    margin-right: 30px;
  }
}

.el-form-item__label.action-label {
  display: flex;
  justify-content: space-between;
}
</style>
