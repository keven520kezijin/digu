<template>
  <div class>
    <div class="admin-page">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>话术管理</el-breadcrumb-item>
        <el-breadcrumb-item>意图库管理</el-breadcrumb-item>
        <el-breadcrumb-item>行业意图88919</el-breadcrumb-item>
        <el-breadcrumb-item>{{ id ? '编辑意图' : '新增意图' }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class="back-btn" @click="handleBack">返回</el-button>
    </div>
    <div class="intent-add-body">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>{{ id ? '编辑意图' : '新增意图' }}</span>
        </div>
        <div>
          <el-form ref="addForm" :model="addForm" :rules="addFormRules" label-width="140px">
            <el-form-item label="意图名称：" prop="intentionName">
              <el-input v-model="addForm.intentionName" placeholder="输入意图名称" class="add-input"></el-input>
            </el-form-item>
            <el-form-item label="行业领域" prop="industry" class="industry">
              <el-select v-model="addForm.industryType" placeholder="请选择行业领域">
                <el-option
                  v-for="item in industries"
                  :key="item.id"
                  :label="item.industryName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="downloadIntentionSentenceFile">下载模版</el-button>
              <el-button type="primary" :loading="uploading">
                <input type="file" id="importInput" @change="getIntentionSentenceByFile" />
                批量上传
              </el-button>
              <span class="add-tip">注：批量新增语料请先下载txt模版，填写后上传，每条语料必须换行填写</span>
              <span class="file-name">{{ filePath }}</span>
            </el-form-item>
            <!-- <el-form-item label="意图语料：" prop="intentionSentenceList">
              <el-select
                class="full-width"
                v-model="addForm.intentionSentenceList"
                multiple
                allow-create
                filterable
                default-first-option
                placeholder="请输入语料内容，按“enter”隔开"
                popper-class="dropdown-hidden"
              >
                <div slot="empty"></div>
              </el-select>
            </el-form-item>
            <el-form-item label="关键词模版：" prop="keyWordsTemplate">
              <el-select
                class="full-width"
                v-model="addForm.keyWordsTemplate"
                multiple
                allow-create
                filterable
                default-first-option
                placeholder="请输入正则表达式或关键词模版，按“enter”隔开"
                popper-class="dropdown-hidden"
              >
                <div slot="empty"></div>
              </el-select>
            </el-form-item> -->
            
            <el-form-item label="意图语料：" prop="intentionSentenceList">
              <el-input v-model="intentionSentence" placeholder="请输入意图语料" @keyup.enter.native="doSth('intentionSentence')"></el-input>
              <el-tag class="tag" v-for="(tag, i) in addForm.intentionSentenceList" :key="tag" closable @close="handleClose('intentionSentence',i)">
                {{ tag }}
              </el-tag>
            </el-form-item>
            <el-form-item label="关键词模版：" prop="keyWordsTemplate">
              <el-input v-model="keyWordsTemplate" placeholder="请输入意图语料" @keyup.enter.native="doSth('keyWordsTemplate')"></el-input>
              <el-tag class="tag" v-for="(tag, i) in addForm.keyWordsTemplate" :key="tag" closable @close="handleClose('keyWordsTemplate',i)">
                {{ tag }}
              </el-tag>
            </el-form-item>
            <el-form-item label="兜底关键词模版：" prop="ddKeyWordsTemplate">
              <el-input v-model="regularFinal" placeholder="输入兜底关键词模版" class="add-input" @keyup.enter.native="doSth('regularFinal')"></el-input>
              <el-tag class="tag" v-for="(tag, i) in addForm.regularFinal" :key="tag" closable @close="handleClose('regularFinal', i)">
                {{ tag }}
              </el-tag>
            </el-form-item>
            <el-form-item>
              <el-checkbox
                v-model="checked"
                label="关联通用意图"
                name="type"
                @change="handleCheckboxChange"
              ></el-checkbox>
            </el-form-item>
            <el-form-item
              v-for="(list, index) in relationListData"
              :key="index"
              v-show="isAssociation"
            >
              <el-select v-model="list.id" placeholder="请选择活动区域">
                <el-option
                  v-for="item in selectOpt"
                  :key="item.id"
                  :label="item.intentionName"
                  :value="item.id"
                ></el-option>
              </el-select>
              <i class="el-icon-remove" @click="handleDelRelation(list, index)" v-show="index > 0"></i>
            </el-form-item>
            <el-form-item v-show="isAssociation">
              <i class="el-icon-circle-plus" @click="handleAddRelation"></i>
            </el-form-item>
            <el-form-item>
              <span v-if="id">
                <el-button type="primary" @click="onSave('update')">更新</el-button>
              </span>
              <span v-else>
                <el-button @click="onSave('publish')">保存并发布</el-button>
                <el-button type="primary" @click="onSave('save')">保存</el-button>
              </span>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import bus from '@/components/common/bus';
import { uniq } from 'lodash';

const DIVIDE = '|';

export default {
  name: 'intentAdd',
  data() {
    return {
      uploading: false,
      type: '2',
      filePath: '',
      id: '',
      regularFinal: '',
      intentionSentence: "", // 意图语料字符串
      keyWordsTemplate: "",
      addForm: {
        intentionName: '',
        // intentionSentence: '',
        keyWordsTemplate: [],
        intentionSentenceList: [],
        industryType: '',
        regularFinal: []  // 兜底数据
      },
      addFormRules: {
        intentionName: [{ required: true, message: '意图名称不能为空！' }],
        intentionSentenceList: [{ required: true, message: '意图语料不能为空！' }],
      },
      isAssociation: false,
      selectOpt: [],
      relationListData: [
        {
          id: '',
        },
      ],
      inputType: 'file',
      checked: false,
      industries: [],
    };
  },
  computed: {
    relationList() {
      if (!this.checked) return [];
      const relationKV = this.selectOpt.reduce((r, s) => ({ ...r, [s.id]: s }), {});
      return this.relationListData
        .filter(v => !!v.id)
        .map(r => ({
          targetIntentionSpeechcraftId: r.id,
          targetIntentionName: relationKV[r.id].intentionName,
        }));
    },
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
    }

    Promise.all([this.queryIntentionSpeechcraftManageList(), this.queryAllIndustryList()]).then(() => {
      if (!this.id) return;
      this.queryIntentionDetail().then(res => {
        this.addForm.intentionName = res.intentionName;
        this.addForm.industryType = res.industryId;
        this.addForm.intentionSentenceList = res.intentionSentence ? res.intentionSentence : [];
        this.addForm.keyWordsTemplate = res.keyWordsTemplate ? res.keyWordsTemplate : [];
        this.addForm.regularFinal = res.regularFinal

        let relationList = res.relationList;
        
        if (relationList && relationList.length) {
          this.checked = true;
          this.isAssociation = true;
          let selectData = [];
          const relationSet = new Set(relationList.map(r => r.targetIntentionSpeechcraftId));
          this.selectOpt.forEach((item, index) => {
            if (relationSet.has(item.id)) {
              selectData.push(item);
            }
          });
          this.relationListData = selectData;
        }
      });
    });
  },
  watch: {},
  methods: {
    doSth(type) {      
      // return;
      if (type === 'intentionSentence') {
        const inputList = this.intentionSentence.trim().split(/\s+/)
        console.log('inputList: ', inputList)
        this.addForm.intentionSentenceList = this.$unique(this.addForm.intentionSentenceList.concat(inputList));
        console.log('this.addForm.intentionSentenceList: ', this.addForm.intentionSentenceList)
        this.intentionSentence = '';
      }
      if (type === 'keyWordsTemplate') {
        const inputList = this.keyWordsTemplate.trim().split(/\s+/)
        // console.log('inputList: ', inputList)
        this.addForm.keyWordsTemplate = this.$unique(this.addForm.keyWordsTemplate.concat(inputList));
        // console.log('this.addForm.keyWordsTemplate: ', this.addForm.keyWordsTemplate)
        this.keyWordsTemplate = '';
      }
      if (type === 'regularFinal') {
        const inputList = this.regularFinal.trim().split(/\s+/)
        console.log('inputList: ', inputList)
        this.addForm.regularFinal = this.$unique(this.addForm.regularFinal.concat(inputList));
        // console.log('this.addForm.regularFinal: ', this.addForm.regularFinal)
        this.regularFinal = '';
      }
    },
    handleClose(type, i) {
      if(type === 'intentionSentence') {
        this.addForm.intentionSentenceList.splice(i, 1)
      }
      if(type === 'keyWordsTemplate') {
        this.addForm.keyWordsTemplate.splice(i, 1)
      }
      if(type === 'regularFinal') {
        this.addForm.regularFinal.splice(i, 1)
      }
    },
    onSave(type) {
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          if (this.id) {
            this.modifyIntentionSpeechcraft();
          } else {
            this.addIntentionSpeechcraft(type);
          }
        }
      });
    },
    handleBack() {
      this.$router.push('/speech?type=3');
    },
    handleCheckboxChange(val) {
      // if(val){
      this.isAssociation = val;
      // }
    },
    handleAddRelation() {
      this.relationListData.push({
        id: '',
      });
    },
    handleDelRelation(list, index) {
      this.relationListData.splice(index, 1);
    },
    //新增行业意图
    addIntentionSpeechcraft(type) {
      console.log(this.addForm);
      let params = {
        intentionType: this.type,
        industryType: this.addForm.industryType,
        intentionName: this.addForm.intentionName,
        intentionSentence: this.addForm.intentionSentenceList,
        regularFinal: this.addForm.regularFinal,
        keyWordsTemplate: this.addForm.keyWordsTemplate,
      };
      if (this.relationList.length) {
        params.relationList = this.relationList;
      }
      if (type == 'save') {
        params.intentionStatus = '0';
      } else if (type == 'publish') {
        params.intentionStatus = '2';
      }
      $.post(this.$baseUrl + 'services/intention/addIntentionSpeechcraft.json', JSON.stringify(params)).then(res => {
        if (res.resultMessageEnum == '0000') {
          this.$message.success('保存成功！');
          // this.handleBack();
        } else {
          this.$message.error(res.errorInfoList[0].errorMessage);
        }
      });
    },
    //修改行业意图
    modifyIntentionSpeechcraft() {
      let params = {
        id: this.id,
        industryType: this.addForm.industryType,
        intentionName: this.addForm.intentionName,
        intentionSentence: this.addForm.intentionSentenceList,
        keyWordsTemplate: this.addForm.keyWordsTemplate,
        relationList: this.relationList,
        regularFinal: this.addForm.regularFinal
      };

      $.post(this.$baseUrl + 'services/intention/modifyIntentionSpeechcraft.json', JSON.stringify(params)).then(res => {
        if (res.resultMessageEnum == '0000') {
          this.$message.success('修改成功！');
        } else {
          this.$message.error(res.errorInfoList[0].errorMessage);
        }
      });
    },
    //下载意图语料模版
    downloadIntentionSentenceFile() {
      window.location.href = this.$baseUrl + 'services/intention/downloadIntentionSentenceFile.html';
    },
    //通过文件得到意图语料（批量上传）
    getIntentionSentenceByFile() {
      this.uploading = true;
      let self = this;
      var oMyForm = new FormData();
      oMyForm.append('file', $('#importInput')[0].files[0]);
      this.filePath = $('#importInput').val();

      $('#importInput').val('');

      $.ajax({
        url: self.$baseUrl + 'services/intention/getIntentionSentenceByFile.json',
        type: 'POST',
        cache: false,
        data: oMyForm,
        dataType: 'json',
        headers: { 'Content-Type': 'multipart/form-data' },
        processData: false,
        contentType: false,
        async: false,
      }).done(function(res) {
        if (res.resultMessageEnum == '0000') {
          const { intentionSentence, keyWordsTemplate, regularFinal } = res.returnObject || {};
          const { intentionSentenceList, keyWordsTemplate: formKeyWordsTemplate, regularFinal: formRegularFinal } = self.addForm;
          if (intentionSentence) {
            self.addForm.intentionSentenceList = uniq(intentionSentenceList.concat(intentionSentence));
          }

          if (keyWordsTemplate) {
            self.addForm.keyWordsTemplate = uniq(formKeyWordsTemplate.concat(keyWordsTemplate));
          }

          if (regularFinal) {
            self.addForm.regularFinal = uniq(formRegularFinal.concat(regularFinal));
          }
        } else {
          self.$message.error(res.errorInfoList[0].errorMessage);
        }
        self.uploading = false;
      });
    },
    //查询意图详情
    queryIntentionDetail() {
      return new Promise(resolve => {
        let params = {
          intentionSpeechcraftId: this.id,
          intentionType: this.type,
        };
        $.get(this.$baseUrl + 'services/intention/queryIntentionDetail.json', $.param(params)).then(res => {
          if (res.resultMessageEnum == '0000') {
            resolve(res.returnObject);
          } else {
            this.$message.error(res.errorInfoList[0].errorMessage);
          }
        });
      });
    },
    // 得到所有有效的行业列表
    //查询通用意图列表
    queryIntentionSpeechcraftManageList() {
      let params = {
        intentionType: '1',
        currentPage: 0,
        pageSize: 100,
      };
      return new Promise(resolve => {
        $.post(
          this.$baseUrl + 'services/intention/queryIntentionSpeechcraftManageList.json',
          JSON.stringify(params),
        ).then(res => {
          if (res.resultMessageEnum == '0000') {
            this.selectOpt = res.returnObject.recordList;
          } else {
            this.$message.error(res.errorInfoList[0].errorMessage);
          }
          resolve();
        });
      });
    },

    queryAllIndustryList() {
      return new Promise((resolve, reject) => {
        $.get(this.$baseUrl + 'services/intention/queryAllIndustryList.json').then(res => {
          if (res.resultMessageEnum == '0000') {
            this.industries = res.returnObject;
            resolve();
          } else {
            this.$message.error(res.errorInfoList[0].errorMessage);
            reject();
          }
        });
      });
    },
  },
  destroyed() {},
};
</script>

<style scoped lang="less">
.tag {
    margin: 0 10px 10px 0;
}
.child-box {
    margin-top: 22px;
    margin-left: 20px;
}
.child-hr {
  position: relative;
  margin-top: 10px;
}

.child-txt{
  position: absolute;
  left: -30px;
}

.del-box {
  position: absolute;
  right: -60px;
  height: 30px;
  width: 30px;
  color: #f56c6c;
}
.admin-page {
  padding-bottom: 10px;
  position: relative;
  .back-btn {
    position: absolute;
    top: 8px;
    right: 40px;
  }
}
.intent-add-body {
  margin: 20px 20px 20px;
  .el-button {
    position: relative;
    span {
      cursor: pointer;
    }
    input {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      width: 88px;
      height: 31px;
      cursor: pointer;
    }
  }
}
.add-input {
  // width: 240px;
}
.add-textarea {
  width: 80%;

  .el-textarea__inner {
    height: 360px;
  }
}
.add-tip {
  color: #9397a1;
  margin-left: 10px;
  font-size: 12px;
}
.file-name {
  color: #409eff;
  margin-left: 10px;
}
.el-icon-circle-plus {
  color: #67c23a;
  font-size: 18px;
  cursor: pointer;
}
.el-icon-remove {
  color: #f56c6c;
  font-size: 18px;
  cursor: pointer;
}
.full-width {
  width: 100%;
}
</style>
<style>
.dropdown-hidden {
  display: none;
}
</style>
