<!-- S -->
<template>
  <div class="">
    <el-input v-model="input" placeholder="请输入意图语料" @keyup.enter.native="doSth"></el-input>
    <!-- <span class="corpus-box" v-for="(item, i) in corpusList" :key="i">{{ item }}</span> -->
    <el-tag class="tag" v-for="(tag, i) in corpusList" :key="tag" closable @close="handleClose(i)">
      {{ tag }}
    </el-tag>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      input: '',
      corpusList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    doSth() {
      const inputList = this.input.trim().split(/\s+/)
      console.log('inputList: ', inputList)
      // return;
      this.corpusList = this.corpusList.concat(inputList);
      console.log('this.corpusList: ', this.corpusList)
      this.input = '';
    },
    handleClose(i) {
      this.corpusList.splice(i, 1)
    }
  },
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
};
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.corpus-box {
  background-color: #f4f4f5;
  border-color: #e9e9eb;
  color: #909399;
  height: 20px;
  padding: 0 5px;
  line-height: 19px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  margin: 2px 0 2px 6px;
}
.tag{
  margin: 0 10px 10px 0;
}
</style>
