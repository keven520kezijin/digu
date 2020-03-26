webpackJsonp([29],{lKj4:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("mvHQ"),a=n.n(i),s=(n("DHmE"),{name:"dashboard",data:function(){return{keyword:"",type:"3",fileName:"",industryId:"",multipleSelection:[],disabled:!0,intentTyData:[],sortList:[],cur_page:1,validIndustryListData:[],activeIndex:0,addForm:{intentionName:"",industryType:""},addFormRules:{intentionName:[{required:!0,message:"意图名称不能为空！"}],industryType:[{required:!0,message:"请选择行业领域！"}]},selectOpt:[],pagination:{show:!0,total:0,pageIndex:1,pageSize:20}}},computed:{},created:function(){this.$route.params.id&&(this.id=this.$route.params.id),this.queryIntentionSpeechcraftManageList(),this.queryValidIndustryList()},watch:{},methods:{handleBack:function(){this.$router.push("/speech?type=3")},onSearch:function(){this.activeIndex=0,this.industryId="",this.queryIntentionSpeechcraftManageList()},searchChange:function(t){t||this.queryIntentionSpeechcraftManageList()},handleSwitchItem:function(t,e){this.activeIndex=e,this.industryId=t.id,"all"==this.industryId&&(this.industryId=""),this.queryIntentionSpeechcraftManageList()},sortChange:function(t){var e=!0;e="ascending"==t.order,this.sortList=[{propertyName:t.prop,ascendingFlag:e}],this.queryIntentionSpeechcraftManageList()},handleView:function(t,e){this.$router.push("/speech/yh/"+t.id)},handleSelectionChange:function(t){this.multipleSelection=[],this.multipleSelection=t,this.multipleSelection.length?this.disabled=!1:this.disabled=!0},handleCurrentChange:function(t){this.cur_page=t,this.queryIntentionSpeechcraftManageList()},handleEdit:function(t,e){this.$router.push("/speech/hy/"+t.id)},queryIntentionSpeechcraftManageList:function(){var t=this,e={intentionType:this.type,memberId:this.id,currentPage:this.cur_page-1,pageSize:this.pagination.pageSize};this.industryId&&(e.industryId=this.industryId);var n=this.keyword;n&&(e.keyword=n),this.sortList.length&&(e.sortList=this.sortList),this.intentionStatus&&(e.intentionStatus=this.intentionStatus),$.post(this.$baseUrl+"services/intention/queryIntentionSpeechcraftManageList.json",a()(e)).then(function(e){"0000"==e.resultMessageEnum?(t.pagination.total=e.returnObject.totalNumber,t.intentTyData=e.returnObject.recordList):t.$message.error(e.errorInfoList[0].errorMessage)})},createExportIntentionExcelFile:function(){var t=this,e=this.multipleSelection.map(function(t){return t.id}),n={intentionType:this.type,intentionIdList:e};$.post(this.$baseUrl+"services/intention/createExportIntentionExcelFile.json",a()(n)).then(function(e){"0000"==e.resultMessageEnum?t.downloadFile(e.returnObject.filePath):t.$message.error(e.errorInfoList[0].errorMessage)})},downloadFile:function(t){var e=t;window.location.href=this.$baseUrl+"services/file/downloadFile.html?filePath="+e},queryValidIndustryList:function(){var t=this;$.get(this.$baseUrl+"services/intention/queryValidIndustryList.json").then(function(e){if("0000"==e.resultMessageEnum){var n=JSON.parse(a()(e.returnObject));t.selectOpt=e.returnObject,n.unshift({id:"all",industryName:"全部"}),t.validIndustryListData=n}})}},destroyed:function(){}}),r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container-admin"},[n("div",{staticClass:"admin-page"},[n("el-breadcrumb",{attrs:{separator:"/"}},[n("el-breadcrumb-item",[t._v("管理中心")]),t._v(" "),n("el-breadcrumb-item",[t._v("话术管理")]),t._v(" "),n("el-breadcrumb-item",[t._v("意图库管理")]),t._v(" "),n("el-breadcrumb-item",[t._v("用户意图")]),t._v(" "),n("el-breadcrumb-item",[t._v("查看用户意图")])],1),t._v(" "),n("el-button",{staticClass:"back-btn",on:{click:t.handleBack}},[t._v("返回")])],1),t._v(" "),n("div",{staticClass:"admin-body"},[n("div",{staticClass:"speech-tab-pane"},[n("div",[n("el-row",[n("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[n("el-form-item",{attrs:{label:"关键词:"}},[n("el-input",{attrs:{placeholder:"ID/意图名称"},on:{change:t.searchChange},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.onSearch}},[t._v("搜索")])],1)],1)],1),t._v(" "),n("el-row",{staticStyle:{"padding-bottom":"20px"}},[n("el-button",{attrs:{type:"primary",disabled:t.disabled},on:{click:t.createExportIntentionExcelFile}},[t._v("导出")])],1),t._v(" "),n("el-row",[n("el-col",{staticClass:"validIndustryList",attrs:{span:4}},[n("span",{staticClass:"title"},[t._v("行业领域")]),t._v(" "),n("ul",{staticClass:"validIndustryList-ul"},t._l(t.validIndustryListData,function(e,i){return n("li",{key:e.id,staticClass:"validIndustryList-li",class:{active:t.activeIndex==i},on:{click:function(n){return t.handleSwitchItem(e,i)}}},[t._v("\n                "+t._s(e.industryName)+"\n              ")])}),0)]),t._v(" "),n("el-col",{attrs:{span:20}},[n("el-table",{staticStyle:{width:"100%","border-left":"1px solid #ebeef5"},attrs:{data:t.intentTyData},on:{"sort-change":t.sortChange,"selection-change":t.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"id",width:"240",label:"ID"}}),t._v(" "),n("el-table-column",{attrs:{prop:"intentionName",label:"意图名称"}}),t._v(" "),n("el-table-column",{attrs:{sortable:"",prop:"createTime",width:"180",label:"更新时间"}}),t._v(" "),n("el-table-column",{attrs:{width:"100",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{staticClass:"operation-box"},[n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.handleView(e.row,e.$index)}}},[t._v("查看")])],1)]}}])})],1)],1)],1),t._v(" "),n("div",{staticClass:"pagination"},[n("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next,jumper",total:t.pagination.total,"page-size":t.pagination.pageSize},on:{"current-change":t.handleCurrentChange}})],1)],1)])])])},staticRenderFns:[]};var o=n("VU/8")(s,r,!1,function(t){n("sNEq")},"data-v-1f68b565",null);e.default=o.exports},sNEq:function(t,e){}});