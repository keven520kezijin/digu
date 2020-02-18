<template>
  <knowledge-group-form
    :initValues="initValue"
    :repositoryMenuForm="repositoryMenuForm"
    :visible="visible"
    :disabledCopy="disabledCopy"
    :sound="true"
    @cancel="$emit('cancel')"
    @submit="handleCopyGroup"
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
    oldGroup: Object,
    disabledCopy: Boolean,
  },
  data() {
    return {
      knowledgeGroup: {},
    };
  },
  computed: {
    initValue() {
      const { useTemplateFlag, referenceType, relatedType, referenceTemplates } = this.knowledgeGroup;
      return {
        groupName: `${this.oldGroup.groupName}的副本`,
        knowledgeTypeId: this.oldGroup.knowledgeTypeId || '',
        useTemplate: useTemplateFlag === 1,
        knowledgeTemplates: (referenceTemplates || []).map(r => ({ id: r.templateId, groupName: r.templateName })),
        referenceType: this.disabledCopy ? 1 : referenceType ? 1 : 0,
        relatedType: relatedType ? 1 : 0,
        soundCopy: {
          copySoundFlag: 0,
          soundGroupId: undefined,
        },
      };
    },
  },
  methods: {
    async fetchKnowledgeGroup() {
      const loading = this.$loading({
        customClass: 'top-zindex-mask',
      });
      try {
        const res = await this.$apiClient.get('/knowledge/queryKnowledgeGroupDetail.json', {
          params: { groupId: this.oldGroup.id },
        });
        this.knowledgeGroup = res.returnObject;
        loading.close();
      } catch (e) {
        loading.close();
        this.$message.error(e.errorInfoList[0].errorMessage);
        this.$emit('cancel');
      }
    },
    async handleCopyGroup({ formData, callback }) {
      const { groupName, knowledgeTemplates, useTemplate, knowledgeTypeId, soundCopy, ...restParams } = formData;
      const params = {
        newGroupName: groupName,
        oldGroupId: this.oldGroup.id,
        useTemplateFlag: useTemplate ? 1 : 0,
        knowledgeTemplateIds: useTemplate ? knowledgeTemplates.map(t => t.id) : [],
        knowledgeTypeId: !knowledgeTypeId || knowledgeTypeId === 'unclassified' ? undefined : knowledgeTypeId,
        copySoundFlag: soundCopy.copySoundFlag,
        soundGroupId: soundCopy.soundGroupId,
        ...restParams,
      };
      try {
        await this.$apiClient.post('knowledge/copyKnowledgeGroup.json', params);
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
    'oldGroup.id': function() {
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
