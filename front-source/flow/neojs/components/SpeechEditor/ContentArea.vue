<template>
  <dg-form-item label="内容">
    <el-tabs v-model="flowTypeName" class="speechTab">
      <el-tab-pane label="正常" name="main" class="speechTabPanel">
        <div v-if="_nodeType == 'start'">
          <div class="speech-content-container-no-top" :id="'_main-' + editableTabsName"></div>
        </div>
        <div v-else>
          <el-tabs
            v-model="editableTabsName"
            type="card"
            :editable="!isDisabled"
            @edit="handleTabsEdit"
          >
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
              :closable="!isDisabled"
            >
              <div
                :class="[
                  editableTabsName == maxTabName && editableTabsName < _speechRound
                    ? 'speech-content-container-no-bottom'
                    : 'speech-content-container',
                ]"
                :id="'_main-' + item.name"
              ></div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
      <el-tab-pane label="静默" name="quiet" class="speechTabPanel">
        <el-tabs
          v-model="editableTabsName"
          type="card"
          :editable="!isDisabled"
          @edit="handleTabsEdit"
        >
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            :closable="!isDisabled"
          >
            <div
              :class="[
                editableTabsName == maxTabName && editableTabsName < _speechRound
                  ? 'speech-content-container-no-bottom'
                  : 'speech-content-container',
              ]"
              :id="'_quiet-' + item.name"
            ></div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="异常" name="exception" class="speechTabPanel">
        <el-tabs
          v-model="editableTabsName"
          type="card"
          :editable="!isDisabled && !EXCSkipVisible"
          @edit="handleTabsEdit"
        >
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            :closable="!isDisabled && !EXCSkipVisible"
          >
            <div
              :class="[
                editableTabsName == maxTabName && editableTabsName < _speechRound
                  ? 'speech-content-container-no-bottom'
                  : 'speech-content-container',
              ]"
              :id="'_exception-' + item.name"
            ></div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="复述" name="retell" class="speechTabPanel">
        <el-tabs
          v-model="editableTabsName"
          type="card"
          :editable="!isDisabled"
          @edit="handleTabsEdit"
        >
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            :closable="!isDisabled"
          >
            <div
              :class="[
                editableTabsName == maxTabName && editableTabsName < _speechRound
                  ? 'speech-content-container-no-bottom'
                  : 'speech-content-container',
              ]"
              :id="'_retell-' + item.name"
            ></div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
    <div class="w-button-group">
      <input
        type="button"
        value="使用音频"
        class="sound-record-btn"
        @click="showUploadRecordDialog()"
        :disabled="isDisabled"
      />
      <input
        type="button"
        value="话术试听"
        class="sound-play-btn"
        @click="createVideoPlayTest"
        :disabled="isDisabled"
      />
    </div>
    <div style="padding: 10px 0 0; font-size: 14px;">
      注：点击查看
      <a :href="`${frontHost}/index.html#/help`" target="_blank">变量参数内容规范及模板</a>
    </div>
  </dg-form-item>
</template>

<script>
import DgFormItem from '../DgFormItem';

export default {
  components: { DgFormItem },
  props: {
    isDisabled: Boolean,
  },
  data() {
    const {
      _speechcraftContent: { main },
    } = $.utils;
    return {
      _speechRound: 5,
      flowTypeName: $.utils._flowTypeName,
      editableTabsName: $.utils._speechEditableTabsName,
      editableTabs: $.utils._speechcraftContent.main,
      maxTabName: main[main.length - 1].name,
      EXCSkipVisible: $.utils._EXCSkipVisible,
    };
  },
  methods: {
    // 初始化富文本编辑器
    initEditor() {
      this.$nextTick(function() {
        $.utils._speechcraftContent[this.flowTypeName].forEach(elem => {
          if (elem.name === this.editableTabsName) {
            let id = '_' + this.flowTypeName + '-' + this.editableTabsName;
            if (this.flowTypeName === 'exception') {
              new richEditor(id, _style, elem.content, this.isDisabled || this.EXCSkipVisible);
            } else {
              new richEditor(id, _style, elem.content, this.isDisabled);
            }
          }
        });
      });
    },
    handleToptabChange() {
      $.utils._flowTypeName = this.flowTypeName;
      const activeEditableTab = $.utils._speechcraftContent[$.utils._flowTypeName];
      this.editableTabsName = 1;
      this.editableTabs = activeEditableTab;
      this.maxTabName = activeEditableTab[activeEditableTab.length - 1].name;
      $.utils._dialogVue.editRecordTabsName = 1;
      $.utils._dialogVue.editRecordTabs = activeEditableTab;
      $.utils._dialogVue.recordData = activeEditableTab[0].recordData;
      this.initEditor();
    },
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        let editableTabsLength = this.editableTabs.length;
        let tabTitle = '';
        let tabContent = '';
        let recordData = [];
        if (editableTabsLength < _speechRound) {
          let newTabName = ++this.maxTabName;
          tabTitle = _chnNumChar[newTabName] + '轮话术';
          this.editableTabs.push({
            title: tabTitle,
            name: newTabName,
            content: tabContent,
            isLocked: false,
            recordData: [],
          });
          this.editableTabsName = newTabName;
        }
        $.utils._speechcraftContent[$.utils._flowTypeName] = this.editableTabs;
        $.utils._dialogVue.editRecordTabs = this.editableTabs;
      }
      if (action === 'remove') {
        if (targetName === 1 || targetName !== this.maxTabName) {
          return false;
        }
        let tabs = this.editableTabs;
        let activeName = this.editableTabsName;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              this.maxTabName = nextTab.name;
            }
          }
        });
        this.editableTabsName = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        $.utils._speechcraftContent[$.utils._flowTypeName] = this.editableTabs;
        $.utils._dialogVue.editRecordTabs = this.editableTabs;
      }
      this.initEditor();
    },
    showUploadRecordDialog() {
      window.open(baseHost + '/flow/sound.html', '_blank');
    },
    createVideoPlayTest() {
      //第几轮话术this.editableTabsName
      let activeEditableTab = $.utils._speechcraftContent[$.utils._flowTypeName];
      let editableTabsName = this.editableTabsName;
      let currentContent = '';
      if (activeEditableTab.length <= 0) {
        this.$message.error('数据错误！');
        return;
      }
      activeEditableTab.forEach(element => {
        if (element.name == editableTabsName) {
          currentContent = element.content;
        }
      });
      //
      if (currentContent.length <= 0) {
        this.$message.error('没有任何信息不能试听');
        return;
      }
      //解析当前的编辑器内容
      let currentContentArr = currentContent.split('<');
      let data = {};
      data.audios = [];
      data.isAudit = 0;
      let inputTextArr = [];
      var showInnerHtml = "<div style='float:left;'>";
      currentContentArr.forEach(elements => {
        let pathIndex = elements.indexOf('path=');
        let contentIndex = elements.indexOf('content=');
        let splitArr = elements.split('>');
        let _text = '';
        let _url = '';
        let item = {};
        if (pathIndex != '-1' /** && contentIndex != '-1' */) {
          let contentIndexEnd = elements.indexOf('>');
          const tmp = elements.slice(pathIndex + 6);
          _url = tmp.slice(0, tmp.indexOf('"'));
          if (contentIndex != '-1') {
            _text = elements.slice(contentIndex + 9, contentIndexEnd - 1);
            _text = _text.replace(/&nbsp;/g, '');
          }
          item.url = _url;
          item.text = _text;
          data.audios.push(item);
          showInnerHtml += _text;
        } else if (
          splitArr.length == 2 &&
          splitArr[1] != '' &&
          splitArr[1] != '&nbsp' &&
          splitArr[1].indexOf('.wav}') == -1 &&
          splitArr[1].indexOf('.mp4}') == -1 &&
          splitArr[1].indexOf('.mp3}') == -1
        ) {
          _text = splitArr[1];
          _text = _text.replace(/&nbsp;/g, '');
          let leftKH = _text.split('[');
          let rightKH = _text.split(']');
          if (leftKH.length != rightKH.length) {
            this.$message.error('变量的括号没有匹配成功,请检查括号是否一一对应');
            return;
          }
          //组装innerHtml
          leftKH.forEach(el => {
            let leftKHSplit = [];
            leftKHSplit = el.split(']');
            if (leftKHSplit.length == 2) {
              inputTextArr.push(leftKHSplit[0]);
              let inputStr =
                '[' +
                leftKHSplit[0] +
                ']' +
                '<input type="text" placeholder="输入变量值" id="' +
                leftKHSplit[0] +
                '" value="">';
              showInnerHtml += inputStr + leftKHSplit[1];
            } else {
              showInnerHtml += el;
            }
          });
          item.text = _text;
          data.audios.push(item);
        }
      });
      showInnerHtml += '</div>';
      $.utils._dialogVue.videoVisible = true;
      $.utils._dialogVue.$nextTick(() => {
        document.getElementById('testVideoHtml').innerHTML = showInnerHtml;
      });
      $.utils._dialogVue.splitAuditionArr = inputTextArr;
      $.utils._dialogVue.splitAuditionData = data;
    },
  },
  created() {
    this.flowTypeName = 'main';
    this.editableTabsName = 1;
    this.initEditor();
  },
  mounted() {
    this.$document.on('checkedChange', (_, v) => {
      const { isEXCSkip } = v;
      this.EXCSkipVisible = isEXCSkip;
      if (isEXCSkip && this.flowTypeName === 'exception') {
        $.utils._speechcraftContent[this.flowTypeName].forEach(elem => {
          if (elem.name === this.editableTabsName) {
            let id = '_' + this.flowTypeName + '-' + this.editableTabsName;
            $('#' + id + '>div').attr('contenteditable', false);
            $('#' + id + '>div').addClass(_style + '-disabled');
          }
        });
      } else {
        $.utils._speechcraftContent[this.flowTypeName].forEach(elem => {
          if (elem.name === this.editableTabsName) {
            let id = '_' + this.flowTypeName + '-' + this.editableTabsName;
            $('#' + id + '>div').attr('contenteditable', true);
            $('#' + id + '>div').removeClass(_style + '-disabled');
          }
        });
      }
    });
  },
  destroyed() {
    this.$document.off('checkedChange');
  },
  watch: {
    flowTypeName() {
      this.handleToptabChange();
    },
    editableTabsName(v) {
      $.utils._dialogVue.editRecordTabsName = v;
      $.utils._speechEditableTabsName = v;
      this.initEditor();
    },
    isDisabled(v) {
      if (isDisabled) {
        this.$nextTick(function() {
          $('a').removeAttr('href');
          $('a').removeAttr('onclick');
          $("input[type='text'],textarea").attr('disabled', 'disabled');
          $("input[type='text'],textarea").addClass('disabled');
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.w-button-group {
  display: flex;
  > input {
    flex: 1;
    border-color: #e8edf5;
    margin: 0;
  }
}
</style>
