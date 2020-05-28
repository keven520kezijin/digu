<template>
  <div class="container-admin">
    <div class="admin-page">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>话术管理</el-breadcrumb-item>
        <el-breadcrumb-item>话术审核</el-breadcrumb-item>
        <el-breadcrumb-item>查看 bert 模型</el-breadcrumb-item>
      </el-breadcrumb>
      <h3>{{ bertName }} bert 模型信息</h3>
      <router-link class="back" to="/speech" replace><el-button>返回</el-button></router-link>
      <br />
    </div>
    <div class="admin-body">
      <div class="back-btn-box">
        <el-button @click="refresh">刷新</el-button>
      </div>
      <br />
      <el-table :data="bertList" v-loading="loading">
        <el-table-column prop="modelName" label="bert模型名称"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">{{ scope.row.status | status }}</template>
        </el-table-column>
        <el-table-column prop="updateTime" label="审核时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              :disabled="disTrainList.indexOf(scope.row.status) != -1"
              @click="reTrain(scope.row)"
              >{{ scope.row.status == 4 ? '训练中' : '重新训练' }}</el-button
            >
            <el-button type="text" :disabled="disViewList.indexOf(scope.row.status) != -1" @click="view(scope.row)"
              >查看意图</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-button type="text" @click="fullscreen = true">>> 点击全屏查看话术</el-button>
        <img
          v-show="fullscreen"
          @click="fullscreen = false"
          class="exit-fullscreen"
          src="@/assets/exit-fullscreen.svg"
          alt="退出"
        />
      </div>
      <iframe
        ref="flow"
        :class="{ fullscreen }"
        class="flow-container"
        :src="iframeSrc"
        allowfullscreen
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
//状态(0：可用；1：不可用，2:部署失败，3：训练失败，4：训练中，5.没有该训练任务， 6.部署中，7.获取状态超时，8.提交失败，9.上传失败，10.待训练)
const statusList = ['可用', '不可用', '部署失败', '训练失败', '训练中', '没有该训练任务', '部署中', '获取状态超时', '提交失败', '上传失败', '待训练']
export default {
  data() {
    return {
      bertName: '',
      fullscreen: false,
      loading: false,
      iframeSrc: '',
      bertList: [],
      disTrainList: [0, 4, 6],
      disViewList: [3, 5, 7, 8, 9]
    }
  },
  filters: {
    status(v) {
      return statusList[v]
    }
  },
  methods: {
    ...mapMutations({
      setCerActiveName: 'speach/speachCerActiveName'
    }),
    getList() {
      this.loading = true
      // this.$route.params.appkey = 'lsr6bir4txw7vargu63qaothlbp4e7llrlgodvij'
      $.get(this.$baseUrl + 'services/bert/getBertModelList.json?appKey=' + this.$route.params.appkey).then((res) => {
        this.loading = false
        if (res.resultMessageEnum == '0000') {
          this.bertList = res.returnObject || [];
        } else {
          this.$message.error(res.errorInfoList[0].errorMessage);
        }
      });
    },
    refresh() {
      this.getList()
      this.$refs.flow.contentWindow.location.reload()
    },
    reTrain(row) {
      this.loading = true
      $.get(this.$baseUrl + 'services/bert/trainingBert.json?bertModelId=' + row.id).then(res => {
        this.loading = false
        if (res.resultMessageEnum == '0000') {
          this.getList()
        } else {
          this.$message.error(res.errorInfoList[0].errorMessage);
        }
      })
    },
    view(row) {
      this.$router.push(`/speech/bert/intent/${this.$route.params.id}/${this.$route.params.appkey}/${this.$route.params.name}/${row.modelName}`)
    },
    esc(e) {
      if (this.fullscreen) {
        this.fullscreen = false
      }
    }
  },
  mounted() {
    this.bertName = this.$route.params.name || ''
    this.getList()
    window.addEventListener('keyup', this.esc)
    this.$refs.flow.onload = () => {
      this.$refs.flow.contentWindow.addEventListener('keyup', this.esc)
    }
    this.iframeSrc = `/flow/index.html?viewType=0&m=2&speechcraftId=${this.$route.params.id}&m=1&flowType=1`;
  },
  deactivated() {
    this.setCerActiveName('second')
  },
  beforeDestroy() {
    this.setCerActiveName('second')
    window.removeEventListener('keyup', this.esc)
  }
}
</script>
<style lang="less" scoped>
.container-admin {
  .admin-page {
    position: relative;
    > h3 {
      font-size: 20px;
    }
    .back {
      position: absolute;
      right: 16px;
      top: 16px;
    }
  }
  .exit-fullscreen {
    position: fixed;
    z-index: 10000;
    right: 0;
    top: 0;
    width: 24px;
    cursor: pointer;
  }
  .flow-container {
    width: 100%;
    min-height: 610px;
    &.fullscreen {
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 9999;
    }
  }
}
</style>
