<template>
  <div class="intent-container container-admin">
    <div class="admin-page">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>话术管理</el-breadcrumb-item>
        <el-breadcrumb-item>话术审核</el-breadcrumb-item>
        <el-breadcrumb-item>查看 bert 模型</el-breadcrumb-item>
        <el-breadcrumb-item>查看意图</el-breadcrumb-item>
      </el-breadcrumb>
      <h3>{{ $route.params.name }}意图</h3>
      <router-link class="back" :to="backUrl" replace><el-button>返回</el-button></router-link>
      <br />
    </div>
    <div class="admin-body">
      <div class="back-btn-box">
        <div class="search">
          <span>关键词：</span>
          <el-input placeholder="意图名称" v-model="intentName" @keyup.enter="search"></el-input>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">重置</el-button>
        </div>
        <br />
        <div class="flex-bt">
          <el-button @click="getList">刷新</el-button>
          <el-button @click="deploy">一键部署</el-button>
        </div>
      </div>
      <br />
      <el-table :data="list" v-loading="loading">
        <el-table-column prop="intentName" label="意图名称"> </el-table-column>
        <el-table-column prop="rrate" label="召回率"> </el-table-column>
        <el-table-column label="适用阀值">
          <template slot-scope="scope">
            <el-input-number
              controls-position="right"
              :step="0.01"
              :min="0"
              :max="1"
              v-model="scope.row.thresholdR"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="是否通过">
          <template slot-scope="scope">
            <span :class="{ danger: !(scope.row.rrate >= scope.row.thresholdR) }">{{
              scope.row.rrate >= scope.row.thresholdR ? '通过' : '不通过'
            }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="sizeChange"
        @current-change="currentPageChange"
        layout="prev, pager, next, sizes, jumper, total"
        :total="pagination.total"
        :page-size="pagination.pageSize"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      intentName: '',
      backUrl: '/speach',
      list: [],
      loading: false,
      pagination: {
        show: true,
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    search() {
      this.pagination.currentPage = 1
      this.getList()
    },
    clear() {
      this.intentName = ''
      this.pagination.currentPage = 1
      this.pagination.pageSize = 10
      this.getList()
    },
    sizeChange(ps){
      this.pagination.currentPage = 1
      this.pagination.pageSize = ps
      this.getList()
    },
    currentPageChange(pn) {
      this.pagination.currentPage = pn
      this.getList()
    },
    
    getList() {
      this.loading = true
      $.get(`${this.$baseUrl}services/bert/getIntentListByBertModel.json?page=${this.pagination.currentPage - 1}&pageSize=${this.pagination.pageSize}&modelName=${this.$route.params.model}&intentName=${this.intentName}`).then((res) => {
        this.loading = false
        if (res.resultMessageEnum == '0000') {
          this.list = res.returnObject.dataList || [];
          this.pagination.currentPage = res.returnObject.page + 1
          this.pagination.total = res.returnObject.totalCount;
        } else {
          this.$message.error(res.errorInfoList[0].errorMessage);
        }
      });
    },
    deploy() {
      if (this.list.length) {
        const params = {}
        this.list.forEach(d => {
          params[d.templateCode] = d.thresholdR
        })
        $.post(`${this.$baseUrl}services/bert/deploy.json`, JSON.stringify({
          modelName: this.$route.params.model,
          threshold: params
        })).then((res) => {
          if (res.resultMessageEnum == '0000') {
            this.$message.success('部署成功')
            this.getList()
          } else {
            this.$message.error(res.errorInfoList[0].errorMessage);
          }
        });
      }
    }
  },
  mounted() {
    this.backUrl = `/speech/bert/${this.$route.params.id}/${this.$route.params.appkey}/${this.$route.params.name}`
    this.getList()
  }
}
</script>
<style lang="less">
.intent-container {
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
  .admin-body {
    .search {
      .el-input {
        display: inline-block;
        width: 250px;
        margin-right: 10px;
      }
    }
  }
  .flex-bt {
    display: flex;
    justify-content: space-between;
  }
  .el-pagination.is-background  {
    margin-top: 12px;
    text-align: right;
    .el-pager .number, button {
      border: 1px solid #f4f4f4;
      background-color: white;
    }
    .el-pagination__jump {
      margin-left: 0;
    }
    .el-pagination__total {
      margin-left: 16px;
    }
  }
  .danger {
    color: #f5222d;
  }
}
</style>