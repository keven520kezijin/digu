webpackJsonp([2],{"+h3a":function(e,t){},HbjN:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("//Fk"),a=n.n(i),o=n("mvHQ"),r=n.n(o),s=(n("DHmE"),n("M4fF")),d={name:"intentAdd",data:function(){return{uploading:!1,filePath:"",id:"",addForm:{intentionName:"",keyWordsTemplate:[],intentionSentenceList:[]},addFormRules:{intentionName:[{required:!0,message:"意图名称不能为空！"}],intentionSentenceList:[{required:!0,message:"意图语料不能为空！"}]}}},computed:{},created:function(){var e=this;this.$route.params.id&&(this.id=this.$route.params.id,this.queryIntentionDetail().then(function(t){e.addForm.intentionName=t.intentionName,e.addForm.intentionSentenceList=t.intentionSentence?t.intentionSentence.split("|"):[],e.addForm.keyWordsTemplate=t.keyWordsTemplate?t.keyWordsTemplate.split("&"):[]}))},watch:{},methods:{onSave:function(){var e=this;this.$refs.addForm.validate(function(t){t&&(e.id?e.modifyIntentionSpeechcraft():e.addIntentionSpeechcraft())})},handleBack:function(){this.$router.push("/speech?type=3")},addIntentionSpeechcraft:function(){var e=this,t={intentionType:"1",intentionName:this.addForm.intentionName,intentionSentence:this.addForm.intentionSentenceList.join("|"),keyWordsTemplate:this.addForm.keyWordsTemplate.join("&")};$.post(this.$baseUrl+"services/intention/addIntentionSpeechcraft.json",r()(t)).then(function(t){"0000"==t.resultMessageEnum?(e.$message.success("保存成功！"),e.handleBack()):e.$message.error(t.errorInfoList[0].errorMessage)})},modifyIntentionSpeechcraft:function(){var e=this,t={id:this.id,intentionName:this.addForm.intentionName,intentionSentence:this.addForm.intentionSentenceList.join("|"),keyWordsTemplate:this.addForm.keyWordsTemplate.join("&")};$.post(this.$baseUrl+"services/intention/modifyIntentionSpeechcraft.json",r()(t)).then(function(t){"0000"==t.resultMessageEnum?(e.$message.success("修改成功！"),e.handleBack()):e.$message.error(t.errorInfoList[0].errorMessage)})},downloadIntentionSentenceFile:function(){window.location.href=this.$baseUrl+"services/intention/downloadIntentionSentenceFile.html"},getIntentionSentenceByFile:function(){this.uploading=!0;var e=this,t=new FormData;t.append("file",$("#importInput")[0].files[0]),$("#importInput").val(""),$.ajax({url:e.$baseUrl+"services/intention/getIntentionSentenceByFile.json",type:"POST",cache:!1,data:t,dataType:"json",headers:{"Content-Type":"multipart/form-data"},processData:!1,contentType:!1,async:!1}).done(function(t){if("0000"==t.resultMessageEnum){var n=t.returnObject||{},i=n.intentionSentence,a=n.keywords,o=e.addForm,r=o.intentionSentenceList,d=o.keyWordsTemplate;i&&(e.addForm.intentionSentenceList=Object(s.uniq)(r.concat(i.split("|")))),a&&(e.addForm.keyWordsTemplate=Object(s.uniq)(d.concat(a.split("|"))))}else e.errorMsg=t.errorInfoList[0].errorMessage;e.uploading=!1})},queryIntentionDetail:function(){var e=this;return new a.a(function(t){var n={intentionSpeechcraftId:e.id,intentionType:"1"};$.get(e.$baseUrl+"services/intention/queryIntentionDetail.json",$.param(n)).then(function(n){console.log("queryIntentionDetail-res: ",n),"0000"==n.resultMessageEnum?t(n.returnObject):e.$message.error(n.errorInfoList[0].errorMessage)})})}},destroyed:function(){}},l={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{},[n("div",{staticClass:"admin-page"},[n("el-breadcrumb",{attrs:{separator:"/"}},[n("el-breadcrumb-item",[e._v("管理中心")]),e._v(" "),n("el-breadcrumb-item",[e._v("话术管理")]),e._v(" "),n("el-breadcrumb-item",[e._v("意图库管理")]),e._v(" "),n("el-breadcrumb-item",[e._v("通用意图")]),e._v(" "),n("el-breadcrumb-item",[e._v(e._s(e.id?"编辑意图":"新增意图"))])],1),e._v(" "),n("el-button",{staticClass:"back-btn",on:{click:e.handleBack}},[e._v("返回")])],1),e._v(" "),n("div",{staticClass:"intent-add-body"},[n("el-card",{staticClass:"box-card",attrs:{shadow:"never"}},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v(e._s(e.id?"编辑意图":"新增意图"))])]),e._v(" "),n("div",[n("el-form",{ref:"addForm",attrs:{model:e.addForm,rules:e.addFormRules,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"意图名称：",prop:"intentionName"}},[n("el-input",{staticClass:"add-input",attrs:{placeholder:"输入意图名称"},model:{value:e.addForm.intentionName,callback:function(t){e.$set(e.addForm,"intentionName",t)},expression:"addForm.intentionName"}})],1),e._v(" "),n("el-form-item",[n("el-button",{on:{click:e.downloadIntentionSentenceFile}},[e._v("下载模版")]),e._v(" "),n("el-button",{attrs:{type:"primary",loading:e.uploading}},[n("input",{attrs:{type:"file",id:"importInput"},domProps:{value:e.filePath},on:{change:e.getIntentionSentenceByFile}}),e._v("\n              批量上传\n            ")]),e._v(" "),n("span",{staticClass:"add-tip"},[e._v("注：批量新增语料请先下载txt模版，填写后上传，每条语料必须换行填写")])],1),e._v(" "),n("el-form-item",{attrs:{label:"意图语料：",prop:"intentionSentenceList"}},[n("el-select",{staticClass:"full-width",attrs:{multiple:"","allow-create":"",filterable:"","default-first-option":"",placeholder:"请输入语料内容，按”enter“隔开","popper-class":"dropdown-hidden"},model:{value:e.addForm.intentionSentenceList,callback:function(t){e.$set(e.addForm,"intentionSentenceList",t)},expression:"addForm.intentionSentenceList"}},[n("div",{attrs:{slot:"empty"},slot:"empty"})])],1),e._v(" "),n("el-form-item",{attrs:{label:"关键词模版：",prop:"keyWordsTemplate"}},[n("el-select",{staticClass:"full-width",attrs:{multiple:"","allow-create":"",filterable:"","default-first-option":"",placeholder:"请输入正则表达式或关键词模版，按“enter”隔开","popper-class":"dropdown-hidden"},model:{value:e.addForm.keyWordsTemplate,callback:function(t){e.$set(e.addForm,"keyWordsTemplate",t)},expression:"addForm.keyWordsTemplate"}},[n("div",{attrs:{slot:"empty"},slot:"empty"})])],1),e._v(" "),n("el-form-item",[e.id?n("span",[n("el-button",{attrs:{type:"primary"},on:{click:e.onSave}},[e._v("更新")])],1):n("span",[n("el-button",{on:{click:e.handleBack}},[e._v("取消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.onSave}},[e._v("保存")])],1)])],1)],1)])],1)])},staticRenderFns:[]};var c=n("VU/8")(d,l,!1,function(e){n("+h3a"),n("u795")},"data-v-f5e5f682",null);t.default=c.exports},u795:function(e,t){}});