<template>
  <div v-loading="loading">
    <div class="knowledge-list">
      <knowledge-item
        v-for="knowledge in knowledges"
        :knowledge="knowledge"
        :key="knowledge.id"
        @openVideo="handleVideo"
      ></knowledge-item>
    </div>
    <div v-if="isKnowledgeEmpty" class="empty-content">话术知识库未填写内容</div>
    <div class="pagination-wrapper">
      <el-pagination
        @current-change="handlePageChange"
        :current-page="pager.current"
        :page-size="pager.size"
        layout="total, prev, pager, next, jumper"
        :total="pager.total"
      ></el-pagination>
    </div>
    <el-dialog title="音频" :append-to-body="true" :visible.sync="videoVisible" width="600px">
      <w-video :source="viewSource" :playing="viewPlaying" />
    </el-dialog>
  </div>
</template>

<script>
import { isUndefined } from 'lodash';
import KnowledgeItem from './KnowledgeItem';
import wVideo from '../page/base/Video';
import bus from '../common/bus';

export default {
  components: { KnowledgeItem, wVideo },
  props: {
    groupId: String,
  },
  data() {
    return {
      knowledges: [],
      pager: {
        current: 1,
        size: 10,
        total: 0,
      },
      videoVisible: false,
      viewSource: '',
      viewPlaying: false,
      loading: false,
    };
  },
  computed: {
    isKnowledgeEmpty() {
      return !this.loading && this.knowledges.length === 0;
    },
  },
  created() {
    this.queryKnowledges();
  },
  methods: {
    handleVideo(item) {
      this.videoVisible = true;
      this.$nextTick(() => {
        this.viewSource = item.soundPath;
      });
    },
    handlePageChange(v) {
      this.pager.current = v;
    },
    async queryKnowledges() {
      try {
        this.loading = true;
        const params = {
          templateSearch: 0,
          groupId: this.groupId,
          searchType: '2',
          currentPage: this.pager.current - 1,
          pageSize: this.pager.size,
        };
        const res = await this.$apiClient.post('knowledge/queryKnowledgeItemList.json', params);

        const { totalNumber, recordList } = res.returnObject || {};
        if (!isUndefined(totalNumber)) this.pager.total = totalNumber;
        if (!isUndefined(recordList)) {
          let data = recordList;
          data.forEach((item, index) => {
            item.answerContent = JSON.parse(item.answerContent);
            item.questionContentOther = JSON.parse(item.questionContentOther).map(item => {
              return { value: item };
            });
            if (item.questionContentOther.length === 0) {
              item.questionContentOther = [
                {
                  name: '相似问题',
                  value: '',
                },
              ];
            }
            if (item.keyWords) {
              item.keyWords = item.keyWords.split('|');
            }
          });
          this.knowledges = data;
        }
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    'pager.current': function() {
      this.queryKnowledges();
    },
    videoVisible(curVal) {
      if (!curVal) {
        bus.$emit('viewPlaying', true);
      }
    },
  },
};
</script>

<style scoped>
.knowledge-list {
  max-height: 450px;
  overflow-y: scroll;
}
.back-btn {
  margin-left: 12px;
}
.empty-content {
  text-align: center;
  padding: 30px;
  font-size: 24px;
}
.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
