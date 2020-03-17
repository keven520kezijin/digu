<template>
  <knowledge-group-form
    :initValues="initValue"
    :repositoryMenuForm="repositoryMenuForm"
    :visible="visible"
    @cancel="$emit('cancel')"
    @submit="handleEditGroup"
  >
    <template v-if="isReference" v-slot:default="slotProps">
      <el-form-item :label="labelTitle" class="custom-form-item"></el-form-item>
      <el-form-item class="custom-form-item">
        <repository-select
          v-model="slotProps.formData.knowledgeTemplates"
          :stableSelection="stableSelection"
        ></repository-select>
      </el-form-item>
    </template>
  </knowledge-group-form>
</template>

<script>
import KnowledgeGroupForm from './index';
import RepositorySelect from '../RepositorySelect';

export default {
  components: { KnowledgeGroupForm, RepositorySelect },
  props: {
    id: String,
    repositoryMenuForm: Array,
    visible: Boolean,
  },
  data() {
    return {
      knowledgeGroup: null,
    };
  },
  computed: {
    initValue() {
      const { groupName, knowledgeTypeId, useTemplateFlag, referenceType, relatedType } = this.knowledgeGroup || {};
      return {
        groupName: groupName,
        knowledgeTypeId: knowledgeTypeId || '',
        useTemplate: useTemplateFlag === 1,
        knowledgeTemplates: [],
        referenceType: referenceType || 0,
        relatedType: relatedType || 0,
      };
    },
    isReference() {
      const { useTemplateFlag, referenceType } = this.knowledgeGroup || {};
      return useTemplateFlag === 1 && referenceType === 1;
    },
    stableSelection() {
      const { referenceTemplates, referenceType } = this.knowledgeGroup || {};
      if (referenceType === 0) return [];
      return (referenceTemplates || []).map(r => ({ id: r.templateId, groupName: r.templateName }));
    },
    labelTitle() {
      const { referenceType, relatedType } = this.knowledgeGroup || {};
      if (referenceType === 0) return '已复制知识库模版';
      return `已关联知识库模版${relatedType === 0 ? '问题模板' : '问答模板'}`;
    },
  },
  methods: {
    referenceAlert() {
      this.$confirm('新增关联知识库模版后不可改变或取消', '新增关联提示', {
        confirmButtonText: '知道了',
        cancelButtonText: '取消',
        type: 'warning',
      });
    },
    async fetchKnowledgeGroup() {
      const loading = this.$loading({
        customClass: 'top-zindex-mask',
      });
      try {
        const res = await this.$apiClient.get('/knowledge/queryKnowledgeGroupDetail.json', {
          params: { groupId: this.id },
        });
        this.knowledgeGroup = res.returnObject;
        loading.close();
        this.$nextTick(() => {
          if (this.isReference) {
            this.referenceAlert();
          }
        });
      } catch (e) {
        loading.close();
        this.$message.error(e.errorInfoList[0].errorMessage);
        this.$emit('cancel');
      }
    },
    async handleEditGroup({ formData, callback }) {
      const { groupName, knowledgeTemplates, useTemplate, knowledgeTypeId, ...restParams } = formData;
      const params = {
        id: this.id,
        groupName,
        useTemplateFlag: useTemplate ? 1 : 0,
        knowledgeTemplateIds: useTemplate ? knowledgeTemplates.concat(this.stableSelection).map(t => t.id) : [],
        knowledgeTypeId: !knowledgeTypeId || knowledgeTypeId === 'unclassified' ? undefined : knowledgeTypeId,
        ...restParams,
      };
      try {
        await this.$apiClient.post('knowledge/modifyKnowledgeGroup.json', params);
        this.$emit('success');
      } catch (e) {
        this.$message.error(e.errorInfoList[0].errorMessage);
      } finally {
        callback();
      }
    },
  },
  created() {
    this.fetchKnowledgeGroup();
  },
  watch: {
    id() {
      this.fetchKnowledgeGroup();
    },
  },
};
</script>

<style>
.top-zindex-mask {
  z-index: 2003 !important;
}
</style>
