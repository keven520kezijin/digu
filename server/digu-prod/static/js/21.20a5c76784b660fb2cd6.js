webpackJsonp([21],{"J+CY":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("mvHQ"),n=i.n(a),r=i("GeYD"),s=(i("o3iK"),{name:"hot",data:function(){return{cur_page:1,pagination:{show:!0,total:0,pageIndex:1,pageSize:10},options:{stripe:!0,loading:!0,highlightCurrentRow:!0,mutiSelect:!0},sortList:[],queryKey:"",tableData:[],multipleSelection:[],downloadDisable:!0,deleteDisable:!0,deleteVisible:!1,createVisible:!1,settingVisible:!1,createForm:{dictionaryName:""},settingForm:{id:"",dictionaryName:"",speechcraftScope:[]},createRules:{dictionaryName:[{required:!0,message:"词典名称不能为空！",trigger:"change"}]},settingRules:{dictionaryName:[{required:!0,message:"词典名称不能为空！",trigger:"change"}],speechcraftScope:[{required:!0,message:"生效范围不能为空！",trigger:"change"}]},speechcraftList:[],fullScreenLoading:null}},props:{},components:{},created:function(){this.userInfo=JSON.parse(localStorage.getItem("USER_INFO"));var e=document.documentElement.clientHeight;this.height=e-240,r.a.$emit("contentTop",!0),this.handleQueryDictionaryList()},computed:{},methods:{handleQueryDictionaryList:function(e){var t=this,i=$.extend({},{currentPage:this.cur_page-1,pageSize:this.pagination.pageSize},e);this.queryKey&&(i.queryKey=this.queryKey),this.sortList&&(i.sortList=this.sortList),$.post(this.$baseUrl+"hotWord/queryDictionaryList.json",n()(i)).then(function(e){"0000"===e.resultMessageEnum?(t.tableData=e.returnObject.recordList,t.pagination.total=e.returnObject.totalNumber):t.$message.error(e.errorInfoList[0].errorMessage)})},handleCreateDictionary:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var i={dictionaryName:t.createForm.dictionaryName};$.post(t.$baseUrl+"hotWord/addDictionary.json",n()(i)).then(function(e){"0000"==e.resultMessageEnum?(t.createVisible=!1,t.handleQueryDictionaryList(),t.$message.success("新增词典成功！")):t.$message.error(e.errorInfoList[0].errorMessage)})})},handleSelectionChange:function(e){this.multipleSelection=e,this.downloadDisable=!(this.multipleSelection.length>0),this.deleteDisable=!(this.multipleSelection.length>0)},handleDownload:function(){var e=this,t=[];this.multipleSelection.length&&this.multipleSelection.forEach(function(e){t.push(e.id)});var i={dictionaryIds:t};$.post(this.$baseUrl+"file/createExportHotWordTextFile.json",n()(i)).then(function(t){"0000"==t.resultMessageEnum?window.location.href=e.$baseUrl+"file/downloadCompressFile.html?filePath="+t.returnObject.filePath:e.$message.error(t.errorInfoList[0].errorMessage)})},handleDelete:function(){var e=this,t=[];this.multipleSelection.length>0&&(t=this.multipleSelection.map(function(e){return e.id})),this.openFullScreenLoading("词典删除中"),$.post(this.$baseUrl+"hotWord/removeDictionary.json",n()(t)).then(function(t){"0000"==t.resultMessageEnum?(e.deleteVisible=!1,e.handleQueryDictionaryList(),e.$message.success("删除词典成功！")):e.$message.error(t.errorInfoList[0].errorMessage),e.fullScreenLoading.close()})},handlePublish:function(e,t){var i=this,a={id:t.id,dictionaryName:t.dictionaryName};this.openFullScreenLoading("词典生效中"),$.post(this.$baseUrl+"hotWord/publishDictionary.json",n()(a)).then(function(e){"0000"==e.resultMessageEnum?(i.handleQueryDictionaryList(),i.$message.success("发布成功，词典生效时间请等待2分钟左右！")):i.$message.error(e.errorInfoList[0].errorMessage),i.fullScreenLoading.close()})},handleUpdate:function(e,t){var i=this,a={id:t.id};this.openFullScreenLoading("词典生效中"),$.post(this.$baseUrl+"hotWord/updateDictionary.json",n()(a)).then(function(e){"0000"==e.resultMessageEnum?(i.handleQueryDictionaryList(),i.$message.success("更新成功，词典生效时间请等待2分钟左右！")):i.$message.error(e.errorInfoList[0].errorMessage),i.fullScreenLoading.close()})},handleCurrentChange:function(e){this.cur_page=e,this.handleQueryDictionaryList()},handleSizeChange:function(e){this.pagination.pageSize=e,this.handleQueryDictionaryList()},search:function(){if(!this.queryKey)return this.$message.error("请输入关键字！"),!1;this.cur_page=1,this.handleQueryDictionaryList()},searchChange:function(e){e||this.handleQueryDictionaryList()},handleEdit:function(e,t){this.$router.push("/hotword/"+t.id+"?name="+t.dictionaryName)},handleSetting:function(e,t){this.querySpeechcraftList(),this.settingForm.id=t.id,this.settingForm.dictionaryName=t.dictionaryName,this.settingForm.speechcraftScope=t.speechcraftScope?t.speechcraftScope.split(","):[],this.settingVisible=!0},handleConfirmSetting:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var i={id:t.settingForm.id,dictionaryName:t.settingForm.dictionaryName,speechcraftScope:t.settingForm.speechcraftScope?t.settingForm.speechcraftScope.join(","):""};$.post(t.$baseUrl+"hotWord/modifyDictionary.json",n()(i)).then(function(e){"0000"==e.resultMessageEnum?(t.settingVisible=!1,t.handleQueryDictionaryList(),t.$message.success("设置成功！")):t.$message.error(e.errorInfoList[0].errorMessage)})})},sortChange:function(e){var t=!0;t="ascending"==e.order,this.sortList=[{propertyName:e.prop,ascendingFlag:t}],this.handleQueryDictionaryList()},querySpeechcraftList:function(){var e=this;$.get(this.$baseUrl+"hotWord/querySpeechcraftList.json?templateType=2").then(function(t){"0000"==t.resultMessageEnum?e.speechcraftList=t.returnObject:e.$message.error(t.errorInfoList[0].errorMessage)})},openFullScreenLoading:function(e){this.fullScreenLoading=this.$loading({lock:!0,text:e+"...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})}},destroyed:function(){r.a.$emit("contentTop",!1)},watch:{viewVisible:function(e){e||r.a.$emit("viewPlaying",!0)}}}),o={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table"},[i("div",{staticClass:"content-box-top"},[i("el-input",{staticClass:"handle-input mr10",attrs:{clearable:"",placeholder:"输入词典名称"},on:{change:e.searchChange},model:{value:e.queryKey,callback:function(t){e.queryKey=t},expression:"queryKey"}}),e._v(" "),i("el-button",{attrs:{type:"primary",icon:"search"},on:{click:e.search}},[e._v("搜索")]),e._v(" "),i("div",{staticClass:"content-box-top-right"},[i("el-button",{attrs:{type:"primary",icon:"iconfont icon-ico_new-task"},on:{click:function(t){e.createVisible=!0}}},[e._v("新建")])],1)],1),e._v(" "),i("el-card",{staticClass:"box-card repository-card"},[i("div",{attrs:{slot:"header"},slot:"header"},[i("div",{staticStyle:{display:"inline"}},[i("span",[e._v("热词词典列表")])]),e._v(" "),i("div",{staticStyle:{display:"inline",float:"right"}},[i("el-button",{attrs:{disabled:e.downloadDisable,type:"primary"},on:{click:e.handleDownload}},[e._v("下载")]),e._v(" "),i("el-button",{attrs:{disabled:e.deleteDisable,type:"primary"},on:{click:function(t){e.deleteVisible=!0}}},[e._v("删除")])],1)]),e._v(" "),i("div",{staticClass:"repository-box"},[i("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:e.tableData,stripe:"",height:e.height,options:e.options,pagination:e.pagination},on:{"sort-change":e.sortChange,"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"50",align:"center"}}),e._v(" "),i("el-table-column",{attrs:{prop:"dictionaryName",label:"词典名称"}}),e._v(" "),i("el-table-column",{attrs:{prop:"editTime",label:"更新时间",sortable:"",width:"200"}}),e._v(" "),i("el-table-column",{attrs:{prop:"editor",label:"操作人",sortable:"",width:"150"}}),e._v(" "),i("el-table-column",{attrs:{label:"操作",width:"150",align:"center",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"text"},on:{click:function(i){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),i("el-button",{attrs:{type:"text"},on:{click:function(i){return e.handleSetting(t.$index,t.row)}}},[e._v("设置")]),e._v(" "),1===t.row.dictionaryStatus||2===t.row.dictionaryStatus?i("span",[i("el-button",{attrs:{disabled:2===t.row.dictionaryStatus,type:"text"},on:{click:function(i){return e.handlePublish(t.$index,t.row)}}},[e._v("发布")])],1):i("span",[i("el-button",{attrs:{disabled:4===t.row.dictionaryStatus,type:"text"},on:{click:function(i){return e.handleUpdate(t.$index,t.row)}}},[e._v("更新")])],1)]}}])})],1),e._v(" "),i("div",{staticClass:"pagination"},[i("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper",total:e.pagination.total,"page-size":e.pagination.pageSize,"page-sizes":[10,50,100,200]},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)]),e._v(" "),i("el-dialog",{staticClass:"creatDialog",attrs:{title:"新增热词词典",visible:e.createVisible,width:"460px"},on:{"update:visible":function(t){e.createVisible=t}}},[i("div",{staticClass:"addIntent-box"},[i("el-form",{ref:"createForm",attrs:{inline:!0,rules:e.createRules,model:e.createForm,"label-width":"100px"}},[i("el-form-item",{attrs:{prop:"dictionaryName",label:"词典名称"}},[i("el-input",{attrs:{clearable:"",placeholder:"请输入热词词典名称"},model:{value:e.createForm.dictionaryName,callback:function(t){e.$set(e.createForm,"dictionaryName",t)},expression:"createForm.dictionaryName"}})],1)],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.createVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleCreateDictionary("createForm")}}},[e._v("确 定")])],1)]),e._v(" "),i("el-dialog",{staticClass:"creatDialog",attrs:{visible:e.deleteVisible,width:"460px"},on:{"update:visible":function(t){e.deleteVisible=t}}},[i("span",{attrs:{slot:"title"},slot:"title"},[i("i",{staticClass:"el-icon-question"}),e._v("删除热词词典\n        ")]),e._v("\n        您确定要删除已选热词词典？如果删除该词典，该词典下所有词条更新均被删除。\n        "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.deleteVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.handleDelete}},[e._v("确 定")])],1)]),e._v(" "),i("el-dialog",{staticClass:"creatDialog",attrs:{title:"设置热词词典",visible:e.settingVisible,width:"460px"},on:{"update:visible":function(t){e.settingVisible=t}}},[i("div",{staticClass:"addIntent-box"},[i("el-form",{ref:"settingForm",attrs:{inline:!0,rules:e.settingRules,model:e.settingForm,"label-width":"100px"}},[i("el-form-item",{attrs:{prop:"dictionaryName",label:"词典名称"}},[i("el-input",{attrs:{clearable:"",placeholder:"请输入词典名称"},model:{value:e.settingForm.dictionaryName,callback:function(t){e.$set(e.settingForm,"dictionaryName",t)},expression:"settingForm.dictionaryName"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"speechcraftScope",label:"生效范围"}},[i("el-select",{attrs:{clearable:"",multiple:"","collapse-tags":"",placeholder:"请选择词典的生效话术范围"},model:{value:e.settingForm.speechcraftScope,callback:function(t){e.$set(e.settingForm,"speechcraftScope",t)},expression:"settingForm.speechcraftScope"}},e._l(e.speechcraftList,function(e){return i("el-option",{key:e.id,attrs:{label:e.speechcraftName,value:e.id}})}),1)],1)],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.settingVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleConfirmSetting("settingForm")}}},[e._v("确 定")])],1)])],1)},staticRenderFns:[]};var l=i("VU/8")(s,o,!1,function(e){i("efEB")},"data-v-7054faa4",null);t.default=l.exports},efEB:function(e,t){}});