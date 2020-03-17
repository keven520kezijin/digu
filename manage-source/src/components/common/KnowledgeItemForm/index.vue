<template>
  <div>
    <el-form :model="formData" :rules="$options.formRules" ref="reposForm" label-width="100px">
      <div class="form-head">
        <label>主问题：</label>
        <el-input v-model="formData.questionContent" placeholder="主问题" :readonly="readonly"></el-input>
      </div>
      <el-row class="form-main">
        <el-col :span="12" class="left">
          <div class="w__header">
            <span class="w_rell">
              相似问题
              <i v-if="!readonly" class="iconfont icon-ico_add" @click="addQustion"></i>
            </span>
            <span class="right w_rell">操作</span>
          </div>
          <div ref="questionTable" class="w__body">
            <div
              class="w__body_item"
              :class="{ row_striped: index % 2 == 0, fixed: item.fixed }"
              v-for="(item, index) in currentQuestionContentOther"
              :key="index"
            >
              <span class="w_rell">
                <el-input v-model="item.value" placeholder="输入相似问题" :readonly="readonly"></el-input>
              </span>
              <span class="right w_rell">
                <i v-if="!readonly" class="iconfont icon-ico_delete" @click="handleQCODel(index)"></i>
              </span>
            </div>
          </div>
          <div class="pagination-wrapper">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pager.current"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pager.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="questionContentOtherCount"
            >
            </el-pagination>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="repository-edit-tab">
            <el-tabs v-model="editableTabsValue" :editable="!readonly" @edit="handleTabsEdit">
              <el-tab-pane
                :key="index"
                v-for="(item, index) in formData.editableTabs"
                :label="item.title"
                :name="item.name"
              >
                <div class="answer-content">
                  <div class="rep-edit-top">
                    <i v-if="!readonly">
                      您可以
                      <span class="link" @click="handleUseAudio">使用音频</span>（使用后将自动填充对应文本）或
                      <span class="link">
                        上传音频
                        <input
                          type="file"
                          multiple="multiple"
                          class="importFile"
                          @change="uploadAnnexFileOfInfo(item, index)"
                        />
                      </span>
                    </i>
                    <div class="canel-box">
                      <div v-show="item.soundPath">
                        <i class="iconfont icon-icon_play" @click="handleVideo(item)"></i>
                        <span v-if="!!item.fileName">{{ item.fileName }}</span>
                        <a @click="handleCancelPlay(index)" v-if="!readonly" href="javascript:void(0)">取消</a>
                      </div>
                      <div v-show="!item.soundPath">
                        <i class="iconfont icon-icon_play" @click="handleVideoTest"></i>
                      </div>
                    </div>
                  </div>
                  <textarea :readonly="readonly" v-model="item.answerContent" class="w_textarea"></textarea>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
      <el-form-item label="关键词模版：" prop="keyWordsTemplate">
        <el-select
          class="full-width"
          v-model="formData.keyWordsTemplate"
          multiple
          allow-create
          filterable
          default-first-option
          placeholder="请输入正则表达式或关键词模版，按'enter'隔开"
          popper-class="dropdown-hidden"
        >
          <div slot="empty"></div>
        </el-select>
      </el-form-item>
      <div class="form-footer" v-if="!readonly">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">保 存</el-button>
      </div>
    </el-form>
    <!-- 试听 -->
    <el-dialog title="音频" :visible.sync="videoVisible" width="600px">
      <w-video :source="viewSource" :playing="viewPlaying" />
    </el-dialog>

    <el-dialog title="知识库音频试听" :visible.sync="videoVisibleTest" width="600px">
      <div style="width:500px;margin-left: 20px;">
        <span>请填写变量参数试听文本</span>
        <div id="testVideoHtml" style="padding:5px;min-height: 200px;border: 1px solid silver"></div>
      </div>
      <div class="canel-box" v-show="!viewSourceTest">
        <i class="iconfont icon-icon_play" @click="handleVideoTestListen">点击试听</i>
      </div>
      <div class="canel-box" v-show="viewSourceTest">
        <w-video :source="viewSourceTest" :playing="viewPlaying" />
      </div>
    </el-dialog>

    <div class="sound-content" v-show="visibleSound">
      <w-sound from="repositoryEdit" />
    </div>
  </div>
</template>

<script>
import bus from '../bus';
import wVideo from '../../page/base/Video';
import wSound from '../../page/Sound';

export default {
  components: {
    wVideo,
    wSound,
  },
  props: {
    initValues: Object,
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: JSON.parse(JSON.stringify(this.initValues)),
      editableTabsValue: '1',
      visibleSound: false,
      videoVisible: false,
      viewSource: '',
      viewPlaying: false,
      videoVisibleTest: false,
      viewSourceTest: '',
      vTabCount: this.initValues.editableTabs.length,
      pager: {
        current: 1,
        size: 10,
      },
    };
  },
  computed: {
    questionContentOtherCount() {
      return (this.formData.questionContentOther || []).length;
    },
    currentQuestionContentOther() {
      const { current: c, size: s } = this.pager;
      return this.formData.questionContentOther.slice((c - 1) * s, c * s);
    },
  },
  formRules: {
    name: [{ required: true, message: '请输入问题名称', trigger: 'blur' }],
    region: [{ required: true, message: '请选择问题分类', trigger: 'change' }],
    desc: [{ required: true, message: '输入回答', trigger: 'blur' }],
  },
  methods: {
    addQustion() {
      const item = {
        isEdit: true,
        show: true,
        name: '',
      };
      this.goFirstPage();
      this.formData.questionContentOther.unshift(item);
    },
    handleQCODel(index) {
      this.formData.questionContentOther.splice(index, 1);
    },
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        const newTabName = `${++this.vTabCount}`;
        this.formData.editableTabs.push({
          title: `新问答`,
          name: newTabName,
          content: '',
        });
        this.editableTabsValue = newTabName;
      }
      if (action === 'remove') {
        const tabs = this.formData.editableTabs;
        let activeName = this.editableTabsValue;
        if (tabs.length < 2) {
          return;
        }
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

        this.editableTabsValue = activeName;
        this.formData.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    },
    handleUseAudio() {
      this.visibleSound = true;
    },
    handleVideo(item) {
      this.videoVisible = true;
      this.$nextTick(() => {
        this.viewSource = item.soundPath;
      });
    },
    handleCancelPlay(index) {
      this.formData.editableTabs[index].soundPath = undefined;
      this.formData.editableTabs[index].soundDuration = undefined;
      this.formData.editableTabs[index].soundSize = undefined;
      this.formData.editableTabs[index].answerContent = '';
      this.formData.editableTabs[index].fileName = undefined;
    },

    uploadAnnexFileOfInfo(item, index) {
      this.openFullScreenLoading('上传中...');
      let self = this;

      var oMyForm = new FormData();
      oMyForm.append('sourceType', 103);
      oMyForm.append('file', $('.importFile')[index].files[0]);

      $('.importFile')
        .eq(index)
        .val('');

      $.ajax({
        url: this.$baseUrl + 'services/common/uploadAnnexFileOfInfo.json',
        type: 'POST',
        cache: false,
        data: oMyForm,
        dataType: 'json',
        headers: { 'Content-Type': 'multipart/form-data' },
        processData: false,
        contentType: false,
        async: false,
      })
        .done(res => {
          this.fullScreenLoading.close();
          if (res.resultMessageEnum == '0000') {
            let data = res.returnObject;
            this.formData.editableTabs.forEach(tab => {
              if (tab.name === this.editableTabsValue) {
                this.$set(tab, 'soundPath', data.filePath);
                this.$set(tab, 'soundDuration', data.soundDuration);
                this.$set(tab, 'soundSize', data.fileSize);
                this.$set(tab, 'fileName', data.fileName);
              }
            });
          } else {
            this.$message.error('上传失败！');
          }
        })
        .fail(res => {
          this.fullScreenLoading.close();
        });
    },
    handleVideoTest() {
      self = this;
      self.viewSourceTest = '';
      let activeName = this.editableTabsValue;
      let currentContent = '';
      this.formData.editableTabs.forEach(element => {
        if (element.name == activeName) {
          currentContent = element.answerContent;
        }
      });
      if (currentContent == undefined || currentContent == 'currentContent' || currentContent == '') {
        self.$message.error('内容为空不能试听');
        return;
      }
      let data = {};
      data.audios = [];
      data.isAudit = 0;
      let nodeIndexArr = [];
      let splitArr = currentContent.split('[');
      var innerHtml = '<div>';
      if (splitArr.length > 1) {
        splitArr.forEach(eleme => {
          if (eleme != '') {
            if (eleme.match(']$') == null) {
              this.$message.error('试听变量格式有问题');
              return;
            } else {
              let nodeText = eleme.replace(']', '');
              let itemNodeHtml = '<div>[' + nodeText + ']' + '<input type="text" id="' + nodeText + '" value=""></div>';
              innerHtml += itemNodeHtml;
              nodeIndexArr.push(nodeText);
              let item = {
                text: nodeText,
              };
              data.audios.push(item);
            }
          }
        });
      } else if (splitArr.length == 1) {
        innerHtml += '<div>' + currentContent + '</div>';
        let item = {
          text: currentContent,
        };
        data.audios.push(item);
      }
      innerHtml += '</div>';
      this.videoVisibleTest = true;
      setTimeout(
        function() {
          document.getElementById('testVideoHtml').innerHTML = innerHtml;
        },
        500,
        innerHtml,
      );
      this.videoTestIndex = nodeIndexArr;
      this.videoTestData = data;
    },
    handleVideoTestListen() {
      this.openFullScreenLoading('生成中');
      self = this;
      if (this.videoTestIndex.length > 0) {
        for (var i in this.videoTestData.audios) {
          let elValue = document.getElementById(this.videoTestData.audios[i].text).value;
          this.videoTestData.audios[i].text = elValue;
        }
      }
      $.post(this.$baseUrl + 'services/knowledge/testListen.json', JSON.stringify(this.videoTestData)).then(res => {
        this.fullScreenLoading.close();
        if (res.resultMessageEnum == '0000') {
          self.$nextTick(() => {
            self.viewSourceTest = res.returnObject.joinUrl;
          });
        } else {
          self.$message.error(res.errorInfoList[0].errorMessage);
        }
      });
    },
    openFullScreenLoading(text) {
      this.fullScreenLoading = this.$loading({
        lock: true,
        text: text + '...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
    },
    goFirstPage() {
      this.pager.current = 1;
      this.$nextTick(() => {
        this.$refs.questionTable.scrollTop = 0;
      });
    },
    handleCurrentChange(v) {
      this.pager.current = v;
    },
    handleSizeChange(v) {
      this.pager.size = v;
    },
    handleCancel() {
      this.$emit('cancel');
    },
    handleSubmit() {
      this.$refs['reposForm'].validate(valid => {
        this.$emit('submit', this.formData);
      });
    },
  },
  created() {
    bus.$on('closeSound', msg => {
      if (msg) {
        this.visibleSound = false;
      }
    });
    bus.$on('fileName', data => {
      if (data) {
        this.formData.editableTabs.forEach(tab => {
          if (tab.name === this.editableTabsValue) {
            tab.soundPath = data.soundPath;
            tab.soundDuration = data.soundDuration;
            tab.soundSize = data.soundSize;
            tab.answerContent = data.soundContent;
            tab.fileName = data.fileName;
          }
        });
      }
    });
  },
  watch: {
    videoVisible(curVal) {
      if (!curVal) {
        bus.$emit('viewPlaying', true);
      }
    },
    initValues(v) {
      this.formData = JSON.parse(JSON.stringify(v));
    },
  },
};
</script>

<style scoped lang="less">
.form-head {
  display: flex;
  align-items: center;
  padding: 12px 0;
  margin-bottom: 12px;
  > label {
    width: 100px;
  }
  > div {
    width: 500px;
  }
}
.form-main {
  border-bottom: 1px solid #eceef5;
  margin-bottom: 18px;
}
.answer-content {
  padding: 0 20px;
}
.form-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.iconfont {
  font-size: 14px;
}
.handle-input {
  width: 240px;
  display: inline-block;
}
.el-card__header {
  .link {
    cursor: pointer;
    color: #4e8ff9;
  }
}
.questionBox {
  height: 32px;
  line-height: 32px;
  .iconfont {
    font-size: 12px;
    margin-left: 10px;
    cursor: pointer;
  }
}
.edit-box {
  i {
    font-weight: bold;
    cursor: pointer;
  }
  .el-icon-check {
    color: #67c23a;
  }
  .el-icon-close {
    color: #f56c6c;
  }
}
.w__header {
  width: 100%;
  display: table;
  border-bottom: 1px solid #ebeef5;
  span.w_rell {
    display: table-cell;
    padding: 8px 0 8px 30px;
    line-height: 23px;
    font-size: 14px;
    .iconfont {
      color: #4e8ff9;
      cursor: pointer;
      margin-left: 5px;
    }
  }
  .right {
    width: 95px;
    padding-left: 15px;
  }
  .el-icon-circle-plus {
    color: #4e8ff9;
    margin-left: 10px;
    cursor: pointer;
  }
}
.w__body {
  height: 480px;
  overflow-y: auto;
  position: relative;
}
.w__body_item {
  width: 100%;
  display: table;

  &.row_striped {
    background-color: #fafafa;
  }
  &.fixed {
    background-color: #fff;
    position: absolute;
    top: 352px;
    width: 100%;
    left: 0;
  }
  span {
    display: table-cell;
    padding: 8px 0 8px 30px;
    line-height: 32px;
  }
  .right {
    width: 100px;
    padding-left: 10px;
    i {
      margin-left: 5px;
      font-weight: bold;
      cursor: pointer;
      &.el-icon-close {
        color: #f04a61;
      }
      &.el-icon-check {
        color: #0fd9ac;
      }
    }
  }
}
.w_textarea {
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  padding: 10px;
  margin: 12px 0 52px;
  border: 1px solid #dee2e6;
  font-size: 14px;
  color: #303133;
  outline: none;
  border-radius: 10px;
  // border-bottom:1px solid #ebeef5;
}
.link {
  // display: inline-block;
  color: #4e8ff9;
  text-decoration: underline;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  a {
    color: #4e8ff9;
  }
}
.goto-header {
  margin-bottom: 15px;
}
.importFile {
  position: absolute;
  width: 58px;
  left: 0;
  top: 0;
  right: 0;
  opacity: 0;
}
.canel-box {
  height: 22px;
  padding: 10px 0 0;
  line-height: 22px;
  .icon-icon_play {
    color: #4e8ff9;
    font-size: 20px;
    float: left;
    margin-right: 10px;
    cursor: pointer;
  }
}
.sound-content {
  position: fixed;
  z-index: 15;
  background-color: #fff;
  left: 0;
  width: 100%;
  top: 0;
  bottom: 0;
}
.full-width {
  width: 100%;
}
.left {
  border-right: 1px solid #ebeef5;
}
.pagination-wrapper {
  padding: 12px;
}
</style>
<style lang="less">
.form-main {
  .el-tabs__header {
    background: #fafafa;
    padding: 0 20px;
  }
}
.dropdown-hidden {
  display: none;
}
.repository-edit-tab {
  .el-tabs__new-tab {
    background: #5c91f2;
    &:hover {
      color: white;
      background: #84acf5;
    }
    > i {
      font-weight: 900;
      font-size: 16px;
    }
  }
}
</style>
