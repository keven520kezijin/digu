<template>
  <div>
    <el-card class="box-card" header="添加问答">
      <knowledge-item-form
        :initValues="$options.initValues"
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
    groupId: String,
  },
  initValues: {
    questionContent: '',
    questionContentOther: [
      {
        value: '',
      },
    ],
    editableTabs: [
      {
        title: '新问答',
        name: '1',
        answerContent: '',
      },
    ],
    keyWordsTemplate: [],
  },
  methods: {
    handleSubmit(formData) {
      const { questionContent, questionContentOther, editableTabs, keyWordsTemplate } = formData;
      const params = {
        questionContent,
        groupId: this.groupId,
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
      $.post(this.$baseUrl + 'services/knowledge/addKnowledgeItem.json', JSON.stringify(params)).then(res => {
        if (res.resultMessageEnum == '0000') {
          this.$emit('success');
        } else {
          this.$message.error(res.errorInfoList[0].errorMessage);
        }
      });
    },
  },
};
</script>

<style></style>
