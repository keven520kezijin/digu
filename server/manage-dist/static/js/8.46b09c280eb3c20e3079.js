webpackJsonp([8],{"23ul":function(e,t){},"67T1":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("mvHQ"),a=n.n(i),s={components:{KnowledgeItemForm:n("aoLg").a},props:{id:String},data:function(){return{knowledgeItem:null}},computed:{initValues:function(){if(!this.knowledgeItem)return null;var e=this.knowledgeItem,t=e.questionContent,n=e.keyWords,i=e.questionContentOther,a=e.answerContent,s=JSON.parse(i||"[]"),o=JSON.parse(a||"[]");return{questionContent:t,keyWordsTemplate:n?n.split("|"):[],questionContentOther:s.map(function(e){return{value:e}}),editableTabs:o.map(function(e,t){return{title:"回答"+(t+1),name:""+(t+1),answerContent:""+e.text,soundPath:e.soundPath,soundDuration:e.soundDuration,soundSize:e.soundSize,fileName:e.fileName}})}}},methods:{fetchKnowledgeItem:function(){var e=this,t=this.$loading({lock:!0,text:"载入中...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),n={id:this.id};$.get(this.$baseUrl+"services/knowledge/queryKnowledgeItemDetail.json",$.param(n)).then(function(n){t.close(),"0000"==n.resultMessageEnum?e.knowledgeItem=n.returnObject:(e.$message.error(n.errorInfoList[0].errorMessage),e.$emit("cancel"))})},handleSubmit:function(e){var t=this,n=e.questionContent,i=e.questionContentOther,s=e.editableTabs,o=e.keyWordsTemplate,r={questionContent:n,id:this.id,questionContentOther:a()(i.map(function(e){return e.value}).filter(function(e){return!!e})),answerContent:a()(s.map(function(e){return{text:e.answerContent,soundPath:e.soundPath,soundDuration:e.soundDuration,soundSize:e.soundSize,fileName:e.fileName}})),keyWords:o.join("|")};$.post(this.$baseUrl+"services/knowledge/modifyKnowledgeItem.json",a()(r)).then(function(e){"0000"==e.resultMessageEnum?t.$emit("success"):t.$message.error(e.errorInfoList[0].errorMessage)})}},created:function(){this.fetchKnowledgeItem()}},o={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.knowledgeItem?n("el-card",{staticClass:"box-card",attrs:{header:"编辑问答"}},[n("knowledge-item-form",{attrs:{initValues:e.initValues},on:{cancel:function(t){return e.$emit("cancel")},submit:e.handleSubmit}})],1):e._e()],1)},staticRenderFns:[]};var r={components:{KnowledgeItemEditForm:n("VU/8")(s,o,!1,function(e){n("oOOP")},null,null).exports},methods:{handleSuccess:function(){this.$message({message:"编辑成功！",type:"success"}),this.$router.go(-1)},goGengal:function(){this.$router.go(-1)}}},l={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"custom-header"},[n("div",[n("el-breadcrumb",{attrs:{separator:"/"}},[n("el-breadcrumb-item",[e._v("管理中心")]),e._v(" "),n("el-breadcrumb-item",[e._v("知识库管理")]),e._v(" "),n("el-breadcrumb-item",[e._v("通用知识库")]),e._v(" "),n("el-breadcrumb-item",[e._v("编辑问答对")])],1)],1),e._v(" "),n("div",[n("el-button",{on:{click:e.goGengal}},[e._v("返回")])],1)]),e._v(" "),n("div",{staticClass:"content"},[n("knowledge-item-edit-form",{attrs:{id:e.$route.params.id},on:{success:e.handleSuccess,cancel:e.goGengal}})],1)])},staticRenderFns:[]};var u=n("VU/8")(r,l,!1,function(e){n("MfoW")},"data-v-47095ea7",null);t.default=u.exports},MfoW:function(e,t){},aoLg:function(e,t,n){"use strict";var i=n("mvHQ"),a=n.n(i),s=n("DHmE"),o=n("nasK"),r=n("fMZB"),l={components:{wVideo:o.a,wSound:r.a},props:{initValues:Object,readonly:{type:Boolean,default:!1}},data:function(){return{formData:JSON.parse(a()(this.initValues)),editableTabsValue:"1",visibleSound:!1,videoVisible:!1,viewSource:"",viewPlaying:!1,videoVisibleTest:!1,viewSourceTest:"",vTabCount:this.initValues.editableTabs.length,pager:{current:1,size:10}}},computed:{questionContentOtherCount:function(){return(this.formData.questionContentOther||[]).length},currentQuestionContentOther:function(){var e=this.pager,t=e.current,n=e.size;return this.formData.questionContentOther.slice((t-1)*n,t*n)}},formRules:{name:[{required:!0,message:"请输入问题名称",trigger:"blur"}],region:[{required:!0,message:"请选择问题分类",trigger:"change"}],desc:[{required:!0,message:"输入回答",trigger:"blur"}]},methods:{addQustion:function(){this.goFirstPage(),this.formData.questionContentOther.unshift({isEdit:!0,show:!0,name:""})},handleQCODel:function(e){this.formData.questionContentOther.splice(e,1)},handleTabsEdit:function(e,t){if("add"===t){var n=""+ ++this.vTabCount;this.formData.editableTabs.push({title:"新问答",name:n,content:""}),this.editableTabsValue=n}if("remove"===t){var i=this.formData.editableTabs,a=this.editableTabsValue;if(i.length<2)return;a===e&&i.forEach(function(t,n){if(t.name===e){var s=i[n+1]||i[n-1];s&&(a=s.name)}}),this.editableTabsValue=a,this.formData.editableTabs=i.filter(function(t){return t.name!==e})}},handleUseAudio:function(){this.visibleSound=!0},handleVideo:function(e){var t=this;this.videoVisible=!0,this.$nextTick(function(){t.viewSource=e.soundPath})},handleCancelPlay:function(e){this.formData.editableTabs[e].soundPath=void 0,this.formData.editableTabs[e].soundDuration=void 0,this.formData.editableTabs[e].soundSize=void 0,this.formData.editableTabs[e].answerContent="",this.formData.editableTabs[e].fileName=void 0},uploadAnnexFileOfInfo:function(e,t){var n=this;this.openFullScreenLoading("上传中...");var i=new FormData;i.append("sourceType",103),i.append("file",$(".importFile")[t].files[0]),$(".importFile").eq(t).val(""),$.ajax({url:this.$baseUrl+"services/common/uploadAnnexFileOfInfo.json",type:"POST",cache:!1,data:i,dataType:"json",headers:{"Content-Type":"multipart/form-data"},processData:!1,contentType:!1,async:!1}).done(function(e){if(n.fullScreenLoading.close(),"0000"==e.resultMessageEnum){var t=e.returnObject;n.formData.editableTabs.forEach(function(e){e.name===n.editableTabsValue&&(n.$set(e,"soundPath",t.filePath),n.$set(e,"soundDuration",t.soundDuration),n.$set(e,"soundSize",t.fileSize),n.$set(e,"fileName",t.fileName))})}else n.$message.error("上传失败！")}).fail(function(e){n.fullScreenLoading.close()})},handleVideoTest:function(){var e=this;self=this,self.viewSourceTest="";var t=this.editableTabsValue,n="";if(this.formData.editableTabs.forEach(function(e){e.name==t&&(n=e.answerContent)}),void 0!=n&&"currentContent"!=n&&""!=n){var i={audios:[],isAudit:0},a=[],s=n.split("["),o="<div>";if(s.length>1)s.forEach(function(t){if(""!=t){if(null==t.match("]$"))return void e.$message.error("试听变量格式有问题");var n=t.replace("]","");o+="<div>["+n+']<input type="text" id="'+n+'" value=""></div>',a.push(n);var s={text:n};i.audios.push(s)}});else if(1==s.length){o+="<div>"+n+"</div>";var r={text:n};i.audios.push(r)}o+="</div>",this.videoVisibleTest=!0,setTimeout(function(){document.getElementById("testVideoHtml").innerHTML=o},500,o),this.videoTestIndex=a,this.videoTestData=i}else self.$message.error("内容为空不能试听")},handleVideoTestListen:function(){var e=this;if(this.openFullScreenLoading("生成中"),self=this,this.videoTestIndex.length>0)for(var t in this.videoTestData.audios){var n=document.getElementById(this.videoTestData.audios[t].text).value;this.videoTestData.audios[t].text=n}$.post(this.$baseUrl+"services/knowledge/testListen.json",a()(this.videoTestData)).then(function(t){e.fullScreenLoading.close(),"0000"==t.resultMessageEnum?self.$nextTick(function(){self.viewSourceTest=t.returnObject.joinUrl}):self.$message.error(t.errorInfoList[0].errorMessage)})},openFullScreenLoading:function(e){this.fullScreenLoading=this.$loading({lock:!0,text:e+"...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})},goFirstPage:function(){var e=this;this.pager.current=1,this.$nextTick(function(){e.$refs.questionTable.scrollTop=0})},handleCurrentChange:function(e){this.pager.current=e},handleSizeChange:function(e){this.pager.size=e},handleCancel:function(){this.$emit("cancel")},handleSubmit:function(){var e=this;this.$refs.reposForm.validate(function(t){e.$emit("submit",e.formData)})}},created:function(){var e=this;s.a.$on("closeSound",function(t){t&&(e.visibleSound=!1)}),s.a.$on("fileName",function(t){t&&e.formData.editableTabs.forEach(function(n){n.name===e.editableTabsValue&&(n.soundPath=t.soundPath,n.soundDuration=t.soundDuration,n.soundSize=t.soundSize,n.answerContent=t.soundContent,n.fileName=t.fileName)})})},watch:{videoVisible:function(e){e||s.a.$emit("viewPlaying",!0)},initValues:function(e){this.formData=JSON.parse(a()(e))}}},u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-form",{ref:"reposForm",attrs:{model:e.formData,rules:e.$options.formRules,"label-width":"100px"}},[n("div",{staticClass:"form-head"},[n("label",[e._v("主问题：")]),e._v(" "),n("el-input",{attrs:{placeholder:"主问题",readonly:e.readonly},model:{value:e.formData.questionContent,callback:function(t){e.$set(e.formData,"questionContent",t)},expression:"formData.questionContent"}})],1),e._v(" "),n("el-row",{staticClass:"form-main"},[n("el-col",{staticClass:"left",attrs:{span:12}},[n("div",{staticClass:"w__header"},[n("span",{staticClass:"w_rell"},[e._v("\n            相似问题\n            "),e.readonly?e._e():n("i",{staticClass:"iconfont icon-ico_add",on:{click:e.addQustion}})]),e._v(" "),n("span",{staticClass:"right w_rell"},[e._v("操作")])]),e._v(" "),n("div",{ref:"questionTable",staticClass:"w__body"},e._l(e.currentQuestionContentOther,function(t,i){return n("div",{key:i,staticClass:"w__body_item",class:{row_striped:i%2==0,fixed:t.fixed}},[n("span",{staticClass:"w_rell"},[n("el-input",{attrs:{placeholder:"输入相似问题",readonly:e.readonly},model:{value:t.value,callback:function(n){e.$set(t,"value",n)},expression:"item.value"}})],1),e._v(" "),n("span",{staticClass:"right w_rell"},[e.readonly?e._e():n("i",{staticClass:"iconfont icon-ico_delete",on:{click:function(t){return e.handleQCODel(i)}}})])])}),0),e._v(" "),n("div",{staticClass:"pagination-wrapper"},[n("el-pagination",{attrs:{"current-page":e.pager.current,"page-sizes":[10,20,30,40],"page-size":e.pager.size,layout:"total, sizes, prev, pager, next, jumper",total:e.questionContentOtherCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)]),e._v(" "),n("el-col",{attrs:{span:12}},[n("div",{staticClass:"repository-edit-tab"},[n("el-tabs",{attrs:{editable:!e.readonly},on:{edit:e.handleTabsEdit},model:{value:e.editableTabsValue,callback:function(t){e.editableTabsValue=t},expression:"editableTabsValue"}},e._l(e.formData.editableTabs,function(t,i){return n("el-tab-pane",{key:i,attrs:{label:t.title,name:t.name}},[n("div",{staticClass:"answer-content"},[n("div",{staticClass:"rep-edit-top"},[e.readonly?e._e():n("i",[e._v("\n                    您可以\n                    "),n("span",{staticClass:"link",on:{click:e.handleUseAudio}},[e._v("使用音频")]),e._v("（使用后将自动填充对应文本）或\n                    "),n("span",{staticClass:"link"},[e._v("\n                      上传音频\n                      "),n("input",{staticClass:"importFile",attrs:{type:"file",multiple:"multiple"},on:{change:function(n){return e.uploadAnnexFileOfInfo(t,i)}}})])]),e._v(" "),n("div",{staticClass:"canel-box"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.soundPath,expression:"item.soundPath"}]},[n("i",{staticClass:"iconfont icon-icon_play",on:{click:function(n){return e.handleVideo(t)}}}),e._v(" "),t.fileName?n("span",[e._v(e._s(t.fileName))]):e._e(),e._v(" "),e.readonly?e._e():n("a",{attrs:{href:"javascript:void(0)"},on:{click:function(t){return e.handleCancelPlay(i)}}},[e._v("取消")])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.soundPath,expression:"!item.soundPath"}]},[n("i",{staticClass:"iconfont icon-icon_play",on:{click:e.handleVideoTest}})])])]),e._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.answerContent,expression:"item.answerContent"}],staticClass:"w_textarea",attrs:{readonly:e.readonly},domProps:{value:t.answerContent},on:{input:function(n){n.target.composing||e.$set(t,"answerContent",n.target.value)}}})])])}),1)],1)])],1),e._v(" "),n("el-form-item",{attrs:{label:"关键词模版：",prop:"keyWordsTemplate"}},[n("el-select",{staticClass:"full-width",attrs:{multiple:"","allow-create":"",filterable:"","default-first-option":"",placeholder:"请输入正则表达式或关键词模版，按'enter'隔开","popper-class":"dropdown-hidden"},model:{value:e.formData.keyWordsTemplate,callback:function(t){e.$set(e.formData,"keyWordsTemplate",t)},expression:"formData.keyWordsTemplate"}},[n("div",{attrs:{slot:"empty"},slot:"empty"})])],1),e._v(" "),e.readonly?e._e():n("div",{staticClass:"form-footer"},[n("el-button",{on:{click:e.handleCancel}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("保 存")])],1)],1),e._v(" "),n("el-dialog",{attrs:{title:"音频",visible:e.videoVisible,width:"600px"},on:{"update:visible":function(t){e.videoVisible=t}}},[n("w-video",{attrs:{source:e.viewSource,playing:e.viewPlaying}})],1),e._v(" "),n("el-dialog",{attrs:{title:"知识库音频试听",visible:e.videoVisibleTest,width:"600px"},on:{"update:visible":function(t){e.videoVisibleTest=t}}},[n("div",{staticStyle:{width:"500px","margin-left":"20px"}},[n("span",[e._v("请填写变量参数试听文本")]),e._v(" "),n("div",{staticStyle:{padding:"5px","min-height":"200px",border:"1px solid silver"},attrs:{id:"testVideoHtml"}})]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.viewSourceTest,expression:"!viewSourceTest"}],staticClass:"canel-box"},[n("i",{staticClass:"iconfont icon-icon_play",on:{click:e.handleVideoTestListen}},[e._v("点击试听")])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.viewSourceTest,expression:"viewSourceTest"}],staticClass:"canel-box"},[n("w-video",{attrs:{source:e.viewSourceTest,playing:e.viewPlaying}})],1)]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.visibleSound,expression:"visibleSound"}],staticClass:"sound-content"},[n("w-sound",{attrs:{from:"repositoryEdit"}})],1)],1)},staticRenderFns:[]};var d=n("VU/8")(l,u,!1,function(e){n("23ul"),n("e6Wm")},"data-v-3e9288d9",null);t.a=d.exports},e6Wm:function(e,t){},oOOP:function(e,t){}});