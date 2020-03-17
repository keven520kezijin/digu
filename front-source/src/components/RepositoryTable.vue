<template>
  <div>
    <div class="table-head">
      <el-input clearable v-model="queryKey" placeholder="筛选关键词"></el-input>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>
    <el-table stripe :data="records" row-key="id" ref="table" v-loading="loading">
      <el-table-column width="55">
        <template v-if="rowSelection" slot-scope="scope">
          <el-checkbox
            :disabled="stableSet.has(scope.row.id)"
            :value="selectionSet.has(scope.row.id) || stableSet.has(scope.row.id)"
            @change="handleSelectionChange(scope.row, $event)"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="groupName" label="知识库模版名称"></el-table-column>
      <el-table-column prop="industryName" label="行业领域" width="250"></el-table-column>
      <el-table-column prop="editTime" label="更新时间" width="200"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <slot name="acion-column" v-bind:row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        @current-change="handlePageChange"
        :current-page="pager.current"
        :page-size="pager.size"
        layout="total, prev, pager, next, jumper"
        :total="pager.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { isUndefined } from 'lodash';

export default {
  props: {
    selection: Array,
    rowSelection: Boolean,
    stableSet: {
      type: Set,
      default: function() {
        return new Set([]);
      },
    },
  },
  data() {
    return {
      records: [],
      queryKey: '',
      loading: false,
      pager: {
        current: 1,
        total: 0,
        size: 10,
      },
    };
  },
  computed: {
    selectionSet() {
      return new Set(this.selection.map(s => s.id));
    },
  },
  methods: {
    handleSelectionChange(v, e) {
      if (e) {
        this.$emit('selection-change', this.selection.concat(v));
      } else {
        this.$emit(
          'selection-change',
          this.selection.filter(s => s.id !== v.id),
        );
      }
    },
    handlePageChange(v) {
      this.pager.current = v;
    },
    handleSearch() {
      this.queryRespository();
    },
    async queryRespository() {
      this.loading = true;
      const { pager } = this;
      try {
        const res = await this.$apiClient.post('knowledge/queryKnowledgeGroupListOfPage.json', {
          searchType: '0',
          templateType: 1,
          queryKey: this.queryKey ? this.queryKey : undefined,
          pageSize: pager.size,
          currentPage: pager.current - 1,
        });

        const { totalNumber, recordList } = res.returnObject || {};
        if (!isUndefined(totalNumber)) this.pager.total = totalNumber;
        if (!isUndefined(recordList)) this.records = recordList;
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.queryRespository();
  },
  watch: {
    'pager.current': function() {
      this.queryRespository();
    },
  },
};
</script>
<style lang="less" scoped>
.table-head {
  display: flex;
  margin-bottom: 15px;
  > .el-input {
    width: 300px;
    margin-right: 8px;
  }
}

.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
