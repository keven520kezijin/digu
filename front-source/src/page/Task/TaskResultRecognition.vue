<template>
  <div>
    <p class="bread-crumbs">
      <el-link class="return-back" :underline="false" type="primary" href="#/task">任务列表</el-link>
      <em>/</em>
      <el-link
        class="return-back"
        :underline="false"
        type="primary"
        :href="`#/task/${taskId}?sname=${this.$route.query.sname}`"
        >{{ taskName }}</el-link
      >
      <em>/</em>
      <span>识别详情</span>
    </p>
    <el-card header="客户信息" class="box-card">
      <dl>
        <dt>姓名：</dt>
        <dd>{{ itemDetail.customerName }}</dd>
      </dl>
      <dl>
        <dt>号码：</dt>
        <dd>{{ itemDetail.phone }}</dd>
      </dl>
    </el-card>
    <el-card header="对话录音" class="box-card">
      <w-video :source="viewSource" :playing="viewPlaying" />
    </el-card>
    <el-card header="通话情况" class="box-card">
      <dl>
        <dt>通话时间：</dt>
        <dd>{{ itemDetail.callTime }}</dd>
      </dl>
      <dl>
        <dt>通话时长：</dt>
        <dd>{{ itemDetail.connectedDuration }}秒</dd>
      </dl>
      <dl>
        <dt>对话轮数：</dt>
        <dd>{{ itemDetail.interactTimes }}轮</dd>
      </dl>
      <dl>
        <dt>知识库触发量：</dt>
        <dd>{{ itemDetail.krcCount }}个</dd>
      </dl>
      <dl>
        <dt>不理解次数：</dt>
        <dd>{{ itemDetail.intentUncertainCount }}次</dd>
      </dl>
      <dl>
        <dt>挂断情况：</dt>
        <dd>{{ itemDetail.hangUpSituation === 1 ? '用户' : '机器人' }}</dd>
      </dl>
      <dl>
        <dt>挂断节点：</dt>
        <dd>{{ itemDetail.hangUpNode }}</dd>
      </dl>
    </el-card>
    <el-card header="识别内容" class="box-card">
      <div class="recording-box-main dialogue-list">
        <ul class="dialogue-list-data">
          <template v-for="(item, index) in viewTableData">
            <li v-if="item.role === 'Agent' && !!item.text" class="seat-dialogue" :key="index">
              <i class="icon icon-robot"></i>
              <span class="tip">{{ item.text }}</span>
            </li>
            <li v-else-if="item.role === 'User' && !!item.text" class="client-dialogue" :key="index">
              <i class="icon icon-user"></i>
              <span class="tip">{{ item.text }}</span>
            </li>
          </template>
        </ul>
      </div>
    </el-card>

    <el-card header="备注" :body-style="{ padding: '0px' }">
      <el-table :data="taskCheckResult" empty-text="暂无质检结果" stripe style="width: 100%;padding-top: 20px">
        <el-table-column prop="checkerName" label="质检人" width="180"> </el-table-column>
        <el-table-column prop="result" label="质检结果"> </el-table-column>
      </el-table>
      <el-form
        ref="checkForm"
        :inline="true"
        :rules="checkRules"
        :model="checkForm"
        label-width="80px"
        style="padding-top: 20px;"
      >
        <el-form-item prop="checkResult" label="备注：">
          <el-input
            type="textarea"
            v-model="checkForm.checkResult"
            placeholder="请输入备注内容"
            maxlength="200"
            rows="2"
            style="width: 500px"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="button" @click="submitCheckResult">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import bus from '../../common/bus';
import wVideo from '../base/Video';
import common from '../../common/common';

export default {
  components: {
    wVideo,
  },
  data() {
    return {
      userInfo: null,
      taskId: null,
      viewPlaying: false,
      taskItemResultRecognition: [],
      taskCheckResult: [],
      viewTableData: [],
      transferFlag: null,
      viewSource: '',
      checkForm: {
        checkResult: '',
        taskItemId: '',
      },
      itemDetail: {},
    };
  },
  computed: {
    checkRules() {
      return {
        checkResult: [{ required: true, message: '备注内容不能为空！', trigger: 'change' }],
      };
    },
    taskName() {
      if (!this.$route.query.sname) return '错误';
      return common.decodeUnicode(this.$route.query.sname);
    },
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('USER_INFO'));
  },
  mounted() {
    this.queryTaskResultRecognition();
    this.fetchTaskItemDetail();
  },
  methods: {
    queryTaskResultRecognition() {
      const id = this.$route.params.id;
      this.taskItemResultRecognition = [];
      this.taskCheckResult = [];
      this.checkForm.taskItemId = id;
      let data = {
        taskItemId: id,
      };
      $.get(this.$baseUrl + 'task/queryTaskResultRecognition.json', $.param(data)).then(res => {
        if (res.resultMessageEnum == '0000') {
          if (res.returnObject) {
            this.taskItemResultRecognition = res.returnObject;
            this.transferFlag = res.returnObject.transferFlag;
            // this.soundPath = res.returnObject.soundPath;
            setTimeout(() => {
              this.viewSource = res.returnObject.soundPath;
            }, 200);

            if (res.returnObject.recognitionContent) {
              this.viewTableData = JSON.parse(res.returnObject.recognitionContent);
            }
            if (res.returnObject.taskCheckResult) {
              this.taskCheckResult = res.returnObject.taskCheckResult;
            }
            this.taskId = res.returnObject.taskId;
          }
        } else {
          this.$message.error(res.errorInfoList[0].errorMessage);
        }
      });
    },

    async fetchTaskItemDetail() {
      try {
        const res = await this.$apiClient.get('task/queryTaskItemDetail.json', {
          params: { taskItemId: this.$route.params.id },
        });
        this.itemDetail = res.returnObject;
      } catch (e) {
        this.$message.error(e.errorInfoList[0].errorMessage);
      }
    },

    submitCheckResult() {
      this.$refs.checkForm.validate(valid => {
        if (valid) {
          let data = {
            isChecker: this.userInfo.role.indexOf(1) === -1 && this.userInfo.role.indexOf(2) === -1 ? true : false,
            checkCheckerId: this.userInfo.id,
            taskItemId: this.checkForm.taskItemId,
            checkResult: this.checkForm.checkResult,
            taskId: this.taskId,
          };
          $.post(this.$baseUrl + 'task/submitCheckResult.json', JSON.stringify(data)).then(res => {
            if (res.resultMessageEnum == '0000') {
              this.viewVisible = false;
              this.$message.success('提交成功！');
              this.queryTaskResultRecognition();
            } else {
              this.$message.error(res.errorInfoList[0].errorMessage);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
  watch: {},
};
</script>
<style scoped lang="less">
@font-color: #647184;
@border-style: 1px solid rgba(222, 226, 230, 1);

.box-card {
  margin-bottom: 12px;
  dl {
    display: flex;
    color: #7a8393;
    margin: 8px 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.bread-crumbs {
  font-size: 14px;
  .return-back {
    vertical-align: baseline;
    line-height: 64px;
  }
  em {
    margin: 0 3px;
  }

  span {
    color: @font-color;
  }
}

.dialogue-list {
  .dialogue-list-data {
    li {
      list-style: none;
      line-height: 36px;
      margin-top: 16px;
      span {
        vertical-align: top;
        margin-left: 8px;
        max-width: 500px;
        word-break: break-all;
        color: #647184;
      }
      padding: 0;
    }
  }

  .icon {
    width: 32px;
    height: 32px;
    display: inline-block;
    border-radius: 4px;
    background-repeat: no-repeat;
    background-position: 5px;
  }

  .icon-user {
    background-image: url('/common-static/img/icons/icon_user.png');
    background-color: #4e8ff9;
  }

  .icon-robot {
    background-image: url('/common-static/img/icons/icon_robot.png');
    background-color: #f8af2b;
  }

  .tip {
    line-height: 16px;
    position: relative;
    background: gray;
    display: inline-block;
    border-radius: 4px;
    padding: 8px 6px;
    &::before {
      position: absolute;
      left: -20px;
      top: 8px;
      content: '';
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 12px solid transparent;
      border-right: 12px solid gray;
    }
  }

  .seat-dialogue {
    .tip {
      background: #fef7e9;
      &::before {
        border-right: 12px solid #fef7e9;
      }
    }
  }

  .client-dialogue {
    .tip {
      background: #edf3fe;
      &::before {
        border-right: 12px solid #edf3fe;
      }
    }
  }
}
</style>
