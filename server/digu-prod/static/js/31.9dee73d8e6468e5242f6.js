webpackJsonp([31],{MJsc:function(e,t){},WhMM:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("mvHQ"),o=n.n(a),i=(n("GeYD"),n("uSxg")),r=n("ufin"),s={data:function(){return{viewPlaying:!1,groupName:"",pagination:{show:!0,total:0,pageIndex:1,pageSize:10},cur_page:1,knowledgeData:[],tableHeight:500,multipleSelection:[],groupId:"",videoVisible:!1,viewSource:""}},created:function(){this.groupId=this.$route.params.id,this.queryKnowledgeItemList()},components:{wVideo:i.a,wSound:r.default},methods:{goKnoledge:function(){this.$router.push("/generalknowledge")},tableRowClassName:function(e){var t=e.row;e.rowIndex;if(t.isEdit&&1*t.isEdit>0)return"row-not-edit"},searchChange:function(){},search:function(){this.cur_page=1,this.queryKnowledgeItemList()},sortChange:function(){},handleSelectionChange:function(e){console.log("handleSelectionChange",e),this.multipleSelection=e},handleCurrentChange:function(e){this.cur_page=e,this.queryKnowledgeItemList()},queryKnowledgeItemList:function(){var e=this,t={groupId:this.groupId,searchType:2,currentPage:this.cur_page-1,pageSize:this.pagination.pageSize,needMemberId:!1};this.groupName&&(t.queryKey=this.groupName),this.sortList&&(t.sortList=this.sortList),$.post(this.$baseUrl+"knowledge/queryKnowledgeItemList.json",o()(t)).then(function(t){if("0000"==t.resultMessageEnum){var n=t.returnObject&&t.returnObject.recordList;if(n){var a=[];n.forEach(function(e,t){var n="";try{n=JSON.parse(e.answerContent)}catch(t){n=e.answerContent}"[object Array]"==Object.prototype.toString.call(n)&&n.length?n.forEach(function(t,n){var o={questionContent:0==n?e.questionContent:"",answerContent:t.text,editTime:0==n?e.editTime:"",editor:0==n?e.editor:"",editorId:e.editorId,id:e.id,soundPath:t.soundPath,soundDuration:t.soundDuration,soundSize:t.soundSize,isEdit:n};a.push(o)}):a.push(e)}),e.knowledgeData=a}e.pagination.total=t.returnObject.totalNumber}else self.$message.error(t.errorInfoList[0].errorMessage)})},handleVideoAnswer:function(){var e=this;this.videoVisible=!0,this.$nextTick(function(){e.viewSource=e.creatFAQVForm.answerContent[e.currentIndex].soundPath})},handleVideo:function(e){var t=this;this.videoVisible=!0,this.$nextTick(function(){t.viewSource=e.soundPath})},handleLook:function(e){this.$router.push("/repository/viewknoledgeitem/"+e)}},destroyed:function(){}},l={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-row",[n("el-col",{attrs:{span:24}},[n("div",{staticClass:"content-box-top"},[n("el-input",{staticClass:"handle-input mr10",attrs:{clearable:"",placeholder:"输入知识库名称"},on:{change:e.searchChange},nativeOn:{keyup:function(t){return t.type.indexOf("key")||13===t.keyCode?e.search(t):null}},model:{value:e.groupName,callback:function(t){e.groupName=t},expression:"groupName"}}),e._v(" "),n("el-button",{attrs:{type:"primary",icon:"search"},on:{click:e.search}},[e._v("搜索")])],1)]),e._v(" "),n("el-col",{attrs:{span:24}},[n("div",{staticStyle:{"padding-top":"50px","padding-bottom":"10px",color:"#fdc83c","font-size":"x-large"}},[n("span",{staticClass:"primary el-icon-arrow-left",staticStyle:{"font-size":"x-large"},attrs:{circle:""}}),e._v(" "),n("span",{staticStyle:{"font-size":"large"},on:{click:e.goKnoledge}},[e._v("返回通用知识库列表")])])]),e._v(" "),n("el-col",[n("div",{staticClass:"w-cantainer task-table-cantainer"},[n("div",{staticClass:"box-card task-card"},[n("el-tabs",[n("el-tab-pane",{attrs:{label:"",name:"first"}})],1),e._v(" "),n("el-table",{attrs:{stripe:"",data:e.knowledgeData,"row-class-name":e.tableRowClassName,height:e.tableHeight},on:{"sort-change":e.sortChange,"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{prop:"questionContent",label:"主问题"}}),e._v(" "),n("el-table-column",{attrs:{prop:"answerContent",label:"回答"}}),e._v(" "),n("el-table-column",{attrs:{width:"140",sortable:"",prop:"editTime",label:"更新时间"}}),e._v(" "),n("el-table-column",{attrs:{width:"100",prop:"editor",label:"操作人"}}),e._v(" "),n("el-table-column",{attrs:{width:"60",label:"音频"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{directives:[{name:"show",rawName:"v-show",value:t.row.soundPath,expression:"scope.row.soundPath"}],staticClass:"w_icon_play w_icon_pause",on:{click:function(n){return e.handleVideo(t.row)}}})]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"140",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return e.handleLook(t.row.id)}}},[e._v("查看")])]}}])})],1),e._v(" "),n("div",{staticClass:"pagination"},[n("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next,jumper",total:e.pagination.total,"page-size":e.pagination.pageSize},on:{"current-change":e.handleCurrentChange}})],1)],1)])]),e._v(" "),n("el-dialog",{attrs:{title:"音频",visible:e.videoVisible,width:"600px"},on:{"update:visible":function(t){e.videoVisible=t}}},[n("w-video",{attrs:{source:e.viewSource,playing:e.viewPlaying}})],1)],1)},staticRenderFns:[]};var c=n("VU/8")(s,l,!1,function(e){n("MJsc")},"data-v-1862daef",null);t.default=c.exports}});