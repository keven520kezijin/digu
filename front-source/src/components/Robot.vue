<template>
  <div class="robot-dlg">
    <div class="robot-container" v-show="showDialog">
      <div class="robot-header">
        <img class="logo" src="@/assets/robotx2.png" alt="logo" />
        <span class="title">对话测试</span>
        <div class="right">
          <span class="el-icon-tickets" @click="toggleData">
            &nbsp;
            <span>{{ showJsonData ? '查看对话详情' : '查看josn数据' }}</span>
          </span>
          <span class="el-icon-refresh-left" @click="reset">&nbsp;重置对话</span>
          <span class="el-icon-close" @click="toggle"></span>
        </div>
      </div>
      <div class="robot-body" v-show="!showJsonData">
        <div class="left" ref="msgBox">
          <div class="item">
            <div class="me">你好</div>
          </div>
          <div class="item">
            <div class="robot">不好意思啊</div>
          </div>
          <div class="item">
            <div class="me">
              不好意思啊，你可以咨询人工客服！不好意思啊，你可以咨询人工客服！不好意思啊，你可以咨询人工客服!
            </div>
          </div>
          <div class="item">
            <div class="robot">
              不好意思啊，你可以咨询人工客服！不好意思啊，你可以咨询人工客服！不好意思啊，你可以咨询人工客服!
            </div>
          </div>
          <div class="item" v-for="(m, i) in msgList" :key="i">
            <div :class="m.type">{{ m.text }}</div>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <div class="label">语义理解</div>
            <div class="body">
              <div class="label">
                分词情况&nbsp;
                <el-tooltip content="黄色文本高亮表示本轮对话的分词情况" placement="bottom">
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
              <div class="participle">
                <span>不</span>
                <span>好</span>
                <span>意</span>
                <span>思</span>
              </div>
              <div class="label">抽取实体</div>
              <div class="entity">
                <span>不好</span>
                <span>意思</span>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="label">被触发</div>
            <div class="body">
              <div class="label">闲聊对话</div>
              <div class="dlg-type">触发开放式闲聊机器人</div>
            </div>
          </div>
        </div>
      </div>
      <div class="robot-body" v-show="showJsonData">
        <pre class="code">{{ jsonData || '暂无数据' }}</pre>
      </div>
      <div class="robot-footer">
        <el-input
          type="textarea"
          @keydown.native.enter="send"
          resize="none"
          :rows="3"
          placeholder="请输入测试信息……"
          v-model="inputText"
        >
        </el-input>
      </div>
    </div>
    <div class="dlg-btn" @click="toggle">
      <div :class="{ open: showDialog }">+</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showDialog: false,
      inputText: '',
      showJsonData: false,
      msgList: [],
      jsonData: JSON.stringify({
        "CreateTime": 1592277115132582000,
        "Area": "gz",
        "SessionId": "c0519b58-3d1e-4d7d-840c-d88ce3f1762bc0519b58-3d1e-4d7d-840c-d88ce3f1762bc0519b58-3d1e-4d7d-840c-d88ce3f1762bc0519b58-3d1e-4d7d-840c-d88ce3f1762bc0519b58-3d1e-4d7d-840c-d88ce3f1762b",
        "EngineResult": {
          "EvalType": "",
          "score": 0,
          "standardScore": 0,
          "version": "full 1.0",
          "voiceSpeed": 0
        }
      }, null, 4)
    }
  },
  methods: {
    toggle() {
      this.showDialog = !this.showDialog
    },
    toggleData() {
      this.showJsonData = !this.showJsonData
    },
    reset() {
      this.showJsonData = false
      this.msgList = []
      this.jsonData = ''
    },
    pushMsg(msg, type) {
      msg = msg.trim()
      if (!msg) {
        return
      }
      this.msgList.push({
        text: msg,
        type: type || 'me'// me or robot
      })
      this.$nextTick(() => {
        this.$refs.msgBox.scrollTop = this.$refs.msgBox.scrollHeight
      })
    },
    send(e) {
      if (!e.ctrlKey) {
        e.preventDefault()
        this.pushMsg(this.inputText)
        this.inputText = ''
        return false
      }
    }
  }
}
</script>
<style lang="less">
.robot-dlg {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2000;
  .robot-container {
    position: fixed;
    width: 720px;
    height: 600px;
    right: 26px;
    bottom: 100px;
    background: white;
    box-shadow: 1px 4px 20px -2px rgba(50, 51, 54, 0.2);
    border-radius: 4px;
  }
  .robot-header {
    position: relative;
    line-height: 80px;
    height: 80px;
    padding: 0 24px;
    border-bottom: 1px solid #ebedf0;
    .logo {
      padding: 10px;
      width: 30px;
      height: 30px;
      border-radius: 50px;
      background-color: #4e8ff9;
      vertical-align: middle;
    }
    .title {
      color: #647184;
      font-size: 18px;
      font-weight: bold;
      margin-left: 8px;
    }
    .right {
      position: absolute;
      height: 80px;
      right: 24px;
      top: 0;
      color: #acb5c1;
      > span {
        line-height: 24px;
        margin-left: 12px;
        cursor: pointer;
      }
      .el-icon-close {
        color: #647184;
        font-size: 20px;
        vertical-align: middle;
      }
    }
  }
  .robot-body {
    position: relative;
    height: 438px;
    padding: 0 24px;
    box-sizing: border-box;
    font-size: 14px;
    overflow: auto;
    color: #647184;
    .code {
      padding: 14px 0;
      white-space: pre-wrap;
    }
    .el-icon-question {
      font-size: 16px;
      color: #bfc8d3;
      vertical-align: text-bottom;
    }
    .left {
      height: 438px;
      padding: 8px 20px 8px 0;
      margin-right: 300px;
      overflow: auto;
      box-sizing: border-box;
      .item {
        overflow: hidden;
        margin-bottom: 24px;
      }
      .robot {
        display: inline-block;
        padding: 6px 10px;
        max-width: 156px;
        background: #f1f4f8;
        border-radius: 10px;
      }
      .me {
        float: right;
        color: white;
        padding: 6px 10px;
        max-width: 156px;
        background: #4e8ff9;
        border-radius: 10px;
      }
    }
    .right {
      height: 438px;
      position: absolute;
      overflow: auto;
      width: 280px;
      right: 24px;
      top: 0;
      padding: 8px 0;
      box-sizing: border-box;
      .item {
        margin-bottom: 14px;
        .label {
          margin-bottom: 12px;
        }
        .body {
          box-sizing: border-box;
          padding: 12px;
          width: 280px;
          background: #f2f6fb;
          border-radius: 10px;
          .label {
            font-size: 12px;
          }
        }
      }
      .participle {
        margin-bottom: 14px;
        > span {
          display: inline-block;
          box-sizing: border-box;
          margin-right: 4px;
          min-width: 24px;
          height: 24px;
          padding: 0 5px;
          line-height: 24px;
          text-align: center;
          background-color: #ffde03;
          border-radius: 2px;
        }
      }
      .entity {
        background-color: white;
        border-radius: 10px;
        padding: 6px 10px 0;
        min-height: 36px;
        color: #536375;
        box-sizing: border-box;
        > span {
          display: inline-block;
          margin: 0 4px 6px 0;
          box-sizing: border-box;
          padding: 0 5px;
          height: 24px;
          line-height: 24px;
          border-radius: 2px;
          background-color: #f7f8fb;
        }
      }
      .dlg-type {
        padding: 8px;
        text-align: center;
        min-height: 36px;
        box-sizing: border-box;
        border-radius: 10px;
        background-color: white;
      }
    }
  }
  .robot-footer {
    padding: 0 24px;
    height: 80px;
    border-top: 1px solid #ebedf0;
  }
  .el-textarea {
    .el-textarea__inner {
      height: 80px;
      border: 0;
      padding: 5px 0;
    }
  }
  .dlg-btn {
    .open {
      transform: rotate(45deg);
    }
    position: fixed;
    right: 24px;
    bottom: 32px;
    text-align: center;
    line-height: 50px;
    color: white;
    font-size: 32px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    border-radius: 30px;
    background: linear-gradient(
      90deg,
      rgba(105, 192, 255, 1) 0%,
      rgba(99, 160, 255, 1) 58%,
      rgba(94, 131, 255, 1) 100%
    );
    box-shadow: 1px 16px 16px -8px rgba(47, 49, 54, 0.2);
  }
}
</style>