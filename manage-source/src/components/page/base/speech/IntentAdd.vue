<template>
  <div class>
    <div class="admin-page">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>话术管理</el-breadcrumb-item>
        <el-breadcrumb-item>意图库管理</el-breadcrumb-item>
        <el-breadcrumb-item>通用意图</el-breadcrumb-item>
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
            <el-form-item>
              <el-button @click="downloadIntentionSentenceFile">下载模版</el-button>
              <el-button type="primary" :loading="uploading">
                <input
                  :value="filePath"
                  type="file"
                  id="importInput"
                  @change="getIntentionSentenceByFile"
                />
                批量上传
              </el-button>

              <span class="add-tip">注：批量新增语料请先下载txt模版，填写后上传，每条语料必须换行填写</span>
            </el-form-item>
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
              <span v-if="id">
                <el-button type="primary" @click="onSave">更新</el-button>
              </span>
              <span v-else>
                <el-button @click="handleBack">取消</el-button>
                <el-button type="primary" @click="onSave">保存</el-button>
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
import corpusInput from './corpusInput';
import { uniq } from 'lodash';

const DIVIDE = '|';

export default {
  name: 'intentAdd',
  components: {
    corpusInput
  },
  data() {
    return {
      uploading: false,
      filePath: '',
      id: '',
      regularFinal: '',
      intentionSentence: "", // 意图语料字符串
      keyWordsTemplate: "",
      addForm: {
        intentionName: '',
        //intentionSentence: '',
        keyWordsTemplate: [],
        intentionSentenceList: [],
        regularFinal: []  // 兜底数据
      },
      addFormRules: {
        intentionName: [{ required: true, message: '意图名称不能为空！' }],
        intentionSentenceList: [{ required: true, message: '意图语料不能为空！' }],
      },
    };
  },
  computed: {},
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.queryIntentionDetail().then(res => {
        this.addForm.intentionName = res.intentionName;
        this.addForm.intentionSentenceList = res.intentionSentence ? res.intentionSentence : [];
        this.addForm.keyWordsTemplate = res.keyWordsTemplate ? res.keyWordsTemplate : [];
        this.addForm.regularFinal = res.regularFinal
      });
    }
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
    onSave() {
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          if (this.id) {
            this.modifyIntentionSpeechcraft();
          } else {
            this.addIntentionSpeechcraft();
          }
        }
      });
    },
    handleBack() {
      this.$router.push('/speech?type=3');
    },
    //新增通用意图
    addIntentionSpeechcraft() {
      let params = {
        intentionType: '1',
        intentionName: this.addForm.intentionName,
        intentionSentence: this.addForm.intentionSentenceList,
        keyWordsTemplate: this.addForm.keyWordsTemplate,
        regularFinal: this.addForm.regularFinal
      };
      console.log('params: ', params)
      $.post(this.$baseUrl + 'services/intention/addIntentionSpeechcraft.json', JSON.stringify(params)).then(res => {
        if (res.resultMessageEnum == '0000') {
          this.$message.success('保存成功！');
          this.handleBack();
        } else {
          this.$message.error(res.errorInfoList[0].errorMessage);
        }
      });
    },
    //修改通用意图
    modifyIntentionSpeechcraft() {
      let params = {
        id: this.id,
        intentionName: this.addForm.intentionName,
        intentionSentence: this.addForm.intentionSentenceList,
        keyWordsTemplate: this.addForm.keyWordsTemplate,
        regularFinal: this.addForm.regularFinal
      };
      $.post(this.$baseUrl + 'services/intention/modifyIntentionSpeechcraft.json', JSON.stringify(params)).then(res => {
        if (res.resultMessageEnum == '0000') {
          this.$message.success('修改成功！');
          this.handleBack();
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
          // console.log('intentionSentence: ', intentionSentence)
          // console.log('keyWordsTemplate: ', keyWordsTemplate)
          // console.log('regularFinal: ', regularFinal)
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
          self.errorMsg = res.errorInfoList[0].errorMessage;
        }
        self.uploading = false;
      });
    },
    //查询意图详情
    queryIntentionDetail() {
      return new Promise(resolve => {
        let params = {
          intentionSpeechcraftId: this.id,
          intentionType: '1',
        };
        $.get(this.$baseUrl + 'services/intention/queryIntentionDetail.json', $.param(params)).then(res => {
          console.log('queryIntentionDetail-res: ', res)
          if (res.resultMessageEnum == '0000') {
            resolve(res.returnObject);
          } else {
            this.$message.error(res.errorInfoList[0].errorMessage);
          }
        });
      });
    },
  },
  destroyed() {},
};
</script>

<style scoped lang="less">
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
.tag{
  margin: 0 10px 10px 0;
}

.add-tip {
  color: #9397a1;
  margin-left: 10px;
  font-size: 12px;
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
