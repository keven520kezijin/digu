<template>
  <div class="config-card">
    <div class="config-card-row">
      <div class="question-title">主问题</div>
      <div class="question-content">{{ knowledge.questionContent }}</div>
      <!-- <div class="right-edit-box">
        <span class="w_icon_pen" @click="editSigleKnowledgeData(knowledge)"></span>
        <span class="w_icon_trash" @click="handleDelItems(knowledge.id)"></span>
      </div>-->
    </div>
    <div class="config-card-row">
      <div class="question-title">相似问题</div>
      <div class="question-contents">
        <div
          class="question-content question-similer"
          v-for="(similer, index) in knowledge.questionContentOther.filter(o => o.value)"
          :key="index"
        >
          <el-tag>{{ similer.value }}</el-tag>
        </div>
      </div>
    </div>
    <div class="config-card-row">
      <div class="question-title" style="padding-top: 10px">回答内容</div>
      <div class="question-content">
        <el-tabs value="name1">
          <el-tab-pane
            :label="index | formatLabel"
            :name="index | formatName"
            v-for="(content, index) in knowledge.answerContent"
            :key="index"
          >
            <div class="answer-content">
              <i v-show="content.soundPath" class="iconfont icon-icon_play" @click="handleVideo(content)"></i>
              <div class="answer-content-text">{{ content.text }}</div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="config-card-row">
      <div class="question-title">关键词</div>
      <div class="question-keywords" v-for="keyWord in knowledge.keyWords" :key="keyWord">
        <el-tag type="info">{{ keyWord }}</el-tag>
      </div>
    </div>
    <!-- <div class="config-card-footer">
      <span class="primary-tag">{{knowledge.publishStatus ? "已发布" : "未发布"}}</span>
      <span class="primary-tag">更新时间{{knowledge.editTime}}</span>
      <span class="primary-tag">操作人: {{knowledge.editor}}</span>
    </div>-->
  </div>
</template>
<script>
export default {
  props: {
    knowledge: Object,
  },
  filters: {
    formatLabel(index) {
      return '回答' + (index + 1);
    },
    formatName(index) {
      return 'name' + (index + 1);
    },
  },
  methods: {
    handleVideo(item) {
      this.$emit('openVideo', item);
    },
  },
};
</script>
<style scoped lang="less">
.sound-content {
  position: fixed;
  z-index: 5000;
  background-color: #fff;
  left: 0;
  width: 100%;
  top: 0;
  bottom: 0;
}
.btnUpload {
  // display: inline-block;
  position: relative;
  overflow: hidden;
  input {
    width: 52px;
    position: absolute;
    left: 0;
    opacity: 0;
  }
}

.canel-box {
  a {
    cursor: pointer;
  }
}

.right-edit-box {
  span {
    cursor: pointer;
  }
}

.icon-icon_play {
  cursor: pointer;
  color: #1890ff;
}

.config-card {
  position: relative;
  background: #fff;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #eceef1;
  border-radius: 4px;
  .config-card-row {
    display: flex;
    margin-bottom: 10px;
    .question-title {
      margin-left: 20px;
      width: 90px;
      color: #999;
    }
    .question-contents {
      display: flex;
      flex: 1;
      overflow-x: auto;
    }
    .question-content {
      flex-grow: 1;
      .answer-content {
        background: #f6f6f6;
        padding: 20px 10px 40px;
      }
      .answer-content {
        display: flex;
        .answer-content-text {
          margin-left: 10px;
        }
      }
    }
    .question-keywords {
      margin-left: 5px;
    }
    .question-similer {
      flex-grow: 0;
      margin-right: 5px;
    }
  }
  .config-card-footer {
    text-align: right;
    .primary-tag {
      color: #999;
      margin-left: 5px;
      font-size: 12px;
    }
  }
}
</style>
