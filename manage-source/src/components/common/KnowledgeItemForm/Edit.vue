<template>
  <div>
    <el-card v-if="!!knowledgeItem" class="box-card" header="编辑问答">
      <knowledge-item-form
        :initValues="initValues"
        @cancel="$emit('cancel')"
        @submit="handleSubmit"
      ></knowledge-item-form>
    </el-card>
  </div>
</template>

<script>
import KnowledgeItemForm from './index';

export default {
  components: { KnowledgeItemForm },
  props: {
    id: String,
  },
  data() {
    return {
      knowledgeItem: null,
    };
  },
  computed: {
    initValues() {
      if (!this.knowledgeItem) return null;
      const {
        questionContent,
        keyWords,
        questionContentOther: rawQuestionContentOther,
        answerContent: rawAnswerContent,
      } = this.knowledgeItem;
      const questionContentOther = JSON.parse(rawQuestionContentOther || '[]');
      const answerContent = JSON.parse(rawAnswerContent || '[]');

      return {
        questionContent,
        keyWordsTemplate: keyWords ? keyWords.split('|') : [],
        questionContentOther: questionContentOther.map(value => ({ value })),
        editableTabs: answerContent.map((c, i) => ({
          title: `回答${i + 1}`,
          name: `${i + 1}`,
          answerContent: `${c.text}`,
          soundPath: c.soundPath,
          soundDuration: c.soundDuration,
          soundSize: c.soundSize,
          fileName: c.fileName,
        })),
      };
    },
  },
  methods: {
    fetchKnowledgeItem() {
      const loading = this.$loading({
        lock: true,
        text: '载入中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      const data = { id: this.id };
      $.get(this.$baseUrl + 'services/knowledge/queryKnowledgeItemDetail.json', $.param(data)).then(res => {
        loading.close();
        if (res.resultMessageEnum == '0000') {
          this.knowledgeItem = res.returnObject;
        } else {
          this.$message.error(res.errorInfoList[0].errorMessage);
          this.$emit('cancel');
        }
      });
    },
    handleSubmit(formData) {
      const { questionContent, questionContentOther, editableTabs, keyWordsTemplate } = formData;
      const params = {
        questionContent,
        id: this.id,
        questionContentOther: JSON.stringify(questionContentOther.map(v => v.value).filter(v => !!v)),
        answerContent: JSON.stringify(
          editableTabs.map(v => ({
            text: v.answerContent,
            soundPath: v.soundPath,
            soundDuration: v.soundDuration,
            soundSize: v.soundSize,
            fileName: v.fileName,
          })),
        ),
        keyWords: keyWordsTemplate.join('|'),
      };

      $.post(this.$baseUrl + 'services/knowledge/modifyKnowledgeItem.json', JSON.stringify(params)).then(res => {
        if (res.resultMessageEnum == '0000') {
          this.$emit('success');
        } else {
          this.$message.error(res.errorInfoList[0].errorMessage);
        }
      });
    },
  },
  created() {
    this.fetchKnowledgeItem();
  },
};
</script>

<style></style>
