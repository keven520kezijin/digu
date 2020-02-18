<template>
  <knowledge-group-form
    :initValues="$options.initValue"
    :repositoryMenuForm="repositoryMenuForm"
    :visible="visible"
    @cancel="$emit('cancel')"
    @submit="handleAddGroup"
  ></knowledge-group-form>
</template>

<script>
import KnowledgeGroupForm from './index';

export default {
  components: {
    KnowledgeGroupForm,
  },
  props: {
    repositoryMenuForm: Array,
    visible: Boolean,
  },
  initValue: {
    groupName: '',
    knowledgeTypeId: '',
    useTemplate: false,
    knowledgeTemplates: [],
    referenceType: 0,
    relatedType: 0,
  },
  methods: {
    async handleAddGroup({ formData, callback }) {
      const { groupName, knowledgeTemplates, useTemplate, knowledgeTypeId, ...restParams } = formData;
      const params = {
        groupName,
        referenceTemplateIds: useTemplate ? knowledgeTemplates.map(t => t.id) : [],
        useTemplateFlag: useTemplate ? 1 : 0,
        knowledgeTypeId: !knowledgeTypeId || knowledgeTypeId === 'unclassified' ? undefined : knowledgeTypeId,
        ...restParams,
      };
      try {
        await this.$apiClient.post('knowledge/addKnowledgeGroup.json?', params);
        this.$emit('success');
      } catch (e) {
        this.$message.error(e.errorInfoList[0].errorMessage);
      } finally {
        callback();
      }
    },
  },
};
</script>

<style></style>
