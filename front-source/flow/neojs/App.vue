<template>
  <div>
    <el-drawer :visible.sync="knowledgeFormVisible" title="知识库设置" custom-class="scroll-drawer">
      <knowledge-form
        :key="knowledgeFormVisible ? '1' : '0'"
        :visible="knowledgeFormVisible"
        :isDisabled="disabled"
        @cancel="knowledgeFormVisible = false"
      ></knowledge-form>
    </el-drawer>
    <el-drawer :visible.sync="intentionEditorVisible" custom-class="scroll-drawer">
      <div slot="title" class="drawer-title"><i class="el-icon-user-solid"></i>意图编辑器</div>
      <intention-editor
        :isDisabled="disabled"
        :key="intentionEditorVisible ? '1' : '0'"
        :visible="intentionEditorVisible"
        @cancel="intentionEditorVisible = false"
      ></intention-editor>
    </el-drawer>
    <el-drawer :visible.sync="speechEditorVisible" custom-class="scroll-drawer">
      <div slot="title" class="drawer-title speech-drawer-title">话术编辑器</div>
      <speech-editor
        :isDisabled="disabled"
        :key="speechEditorVisible ? `${count}` : '0'"
        :visible="speechEditorVisible"
        @cancel="speechEditorVisible = false"
      ></speech-editor>
    </el-drawer>
  </div>
</template>

<script>
import KnowledgeForm from './components/KnowledgeForm';
import IntentionEditor from './components/IntentIonEditor';
import SpeechEditor from './components/SpeechEditor';
import TopbarTool from './components/TopbarTool';

export default {
  components: { KnowledgeForm, IntentionEditor, SpeechEditor, TopbarTool },
  data() {
    return {
      knowledgeFormVisible: false,
      intentionEditorVisible: false,
      speechEditorVisible: false,
      count: 1,
      disabled: true,
      payload: ''
    };
  },
  methods: {
    async handleOpenDrawer() {
      switch (this.payload) {
        case 'knowledgeForm':
          this.knowledgeFormVisible = true;
          break;
        case 'intentionEditor':
          this.intentionEditorVisible = true;
          break;
        case 'speechEditor':
          this.count++;
          this.speechEditorVisible = true;
          break;
        default:
          console.log(`Unexpected type:${this.payload}`);
      }
    },
    // 记录打开的按钮
    async openDrawerBindType(_, payload) {
      if (payload.type) {
        this.payload = payload.type
      }
    }
  },
  mounted() {
    this.$document.on('openDrawer', this.openDrawerBindType.bind(this));
    this.$document.on('dblclick', this.handleOpenDrawer.bind(this));
    const viewType = $.utils.getUrlParam('viewType');
    this.disabled = viewType == null || viewType == '' || viewType == '0';
  },
  watch: {
    intentionEditorVisible(v) {
      if (!v) this.$document.trigger('clearSelection');
    },
    speechEditorVisible(v) {
        // console.log(v)
      if (!v) this.$document.trigger('clearSelection');
    },
  },
};
</script>

<style lang="less">
.scroll-drawer {
  .el-drawer__body {
    overflow-y: auto;
  }
}
.drawer-title {
  i {
    margin-right: 6px;
  }
}
</style>
<style lang="less">
.v-modal {
  background: rgba(0, 0, 0, 0.35);
}
</style>
