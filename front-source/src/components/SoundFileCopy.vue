<template>
  <div>
    <el-form-item label="">
      <el-checkbox @change="handleCheckboxChange" :value="isCopySound">同时复制音频</el-checkbox>
    </el-form-item>
    <el-form-item label="">
      <el-select
        v-if="isCopySound"
        :value="soundState.soundGroupId"
        @change="handleSelectChange"
        placeholder="请选择音频文件夹"
      >
        <el-option
          v-for="item in soundTypeList"
          :label="item.configGroupName"
          :value="item.id"
          :key="item.id"
        ></el-option>
        <!-- <div class="select_add_item">
          <div class="select-menu-input-box" v-if="createSoundForm.isShow">
            <el-input v-model="createSoundForm.typeName" placeholder="文件夹名称"></el-input>
          </div>
          <div class="select-icon-box" v-if="createSoundForm.isShow">
            <i class="el-icon-check" @click="handleConfirmAddSound"></i>
            <i class="el-icon-close" @click="createSoundForm.isShow = false"></i>
          </div>
          <div>
            <i class="el-icon-plus" @click="createSoundForm.isShow = true">
              <span>新增音频文件夹</span>
            </i>
          </div>
        </div> -->
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'soundState',
    event: 'change',
  },
  props: {
    soundState: {
      type: Object,
      default() {
        return { copySoundFlag: 0, soundGroupId: undefined };
      },
    },
  },
  data() {
    return {
      soundTypeList: [],
    };
  },
  computed: {
    isCopySound() {
      return this.soundState.copySoundFlag === 1;
    },
  },
  methods: {
    async querySoundConfigGroupList() {
      try {
        const res = await this.$apiClient.get('sound/querySoundConfigGroupList.json');
        this.soundTypeList = Object.entries(res.returnObject).map(([, v]) => v);
        //.filter(v => v.soundConfigGroupType == 2 && v.duplicateFlag == 1);
      } catch (e) {
        this.$message.error(e.errorInfoList[0].errorMessage);
      }
    },
    handleCheckboxChange(v) {
      this.$emit('change', { copySoundFlag: v ? 1 : 0, soundGroupId: this.soundState.soundGroupId });
    },
    handleSelectChange(v) {
      console.log(v);
      const { copySoundFlag } = this.soundState;
      this.$emit('change', { copySoundFlag, soundGroupId: v });
    },
  },
  created() {
    this.querySoundConfigGroupList();
  },
};
</script>

<style></style>
