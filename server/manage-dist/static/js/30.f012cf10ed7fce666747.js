webpackJsonp([30],{J3ix:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("bOdI"),i=n.n(s),r=n("//Fk"),a=n.n(r),o=n("mvHQ"),l=n.n(o),u=i()({name:"dashboard",data:function(){return{industryActiveName:"first",industryStatusTxt:"已上线",tableLoading:!0,queryKey:"",industryTableData:[],cur_page:1,offlineVisible:!1,onlineVisible:!1,addIndustryVisible:!1,delDisabled:!0,delIndustryVisible:!1,multipleSelection:[],currentRow:{},addIndustryForm:{},addIndustryFormRules:{industryName:[{required:!0,message:"输入行业名称"}]},pagination:{show:!0,total:0,pageIndex:1,pageSize:20},notFinishNum:0}},components:{},computed:{},created:function(){this.queryIndustryList()},watch:{},methods:{onSearch:function(){this.queryIndustryList()},handleCurrentChange:function(){this.cur_page=val,this.queryIndustryList()},searchChange:function(t){t||this.queryIndustryList()},handleEditName:function(t,e){this.$set(this.industryTableData[t],"isEdit",!0),this.industryTableData[t].oldIndustryName=e.industryName},handleEditCancel:function(t,e){this.$set(this.industryTableData[t],"isEdit",!1),e.industryName!=e.oldIndustryName&&(e.industryName=e.oldIndustryName)},handleAddIndustry:function(){var t=this;this.$refs.addIndustryForm.validate(function(e){e&&t.addIndustry().then(function(){t.addIndustryVisible=!1,t.queryIndustryList()})})},handleSelectionChange:function(t){this.multipleSelection=[],this.multipleSelection=t,this.multipleSelection.length?this.delDisabled=!1:this.delDisabled=!0},sortChange:function(t){var e=!0;t.prop?(e="ascending"==t.order,this.sortList=[{propertyName:t.prop,ascendingFlag:e}]):this.sortList="",this.queryIndustryList()},handleTabClick:function(){this.cur_page=1,this.queryIndustryList()},handleOffline:function(t){var e=this;this.currentRow=t,this.offlineVisible=!0,this.countNotFinishTaskByIndustry().then(function(t){e.notFinishNum=t})},handleOfflineEnter:function(){var t=this;this.modifyIndustryStatus("1").then(function(){t.offlineVisible=!1,t.$message.success("“"+t.currentRow.industryName+"”行业下线成功！"),t.queryIndustryList()})},handleOnline:function(t,e){this.currentRow=e,this.onlineVisible=!0},handleOnlineEnter:function(){var t=this;this.modifyIndustryStatus("2").then(function(){t.onlineVisible=!1,t.$message.success("“"+t.currentRow.industryName+"”行业上线成功！"),t.queryIndustryList()})},selectable:function(t,e){return"-"==t.latestOfflineDate},queryIndustryList:function(){var t=this;this.tableLoading=!0;var e={currentPage:this.cur_page-1,pageSize:this.pagination.pageSize};e.industryStatusList="first"==this.industryActiveName?["2","3"]:["0","1"];var n=this.queryKey;n&&(e.queryKey=n),this.sortList&&(e.sortList=this.sortList),$.post(this.$baseUrl+"services/intention/queryIndustryList.json",l()(e)).then(function(e){"0000"==e.resultMessageEnum?(t.pagination.total=e.returnObject.totalNumber,t.industryTableData=e.returnObject.recordList,t.industryTableData.filter(function(t){t.latestOfflineDate||(t.latestOfflineDate="-")})):t.$message.error(e.errorInfoList[0].errorMessage),t.tableLoading=!1})},modifyIndustryStatus:function(t){var e=this,n={id:this.currentRow.id,industryStatus:t};return new a.a(function(t,s){$.post(e.$baseUrl+"services/intention/modifyIndustryStatus.json",l()(n)).then(function(n){"0000"==n.resultMessageEnum?t(n):e.$message.error(n.errorInfoList[0].errorMessage)})})},addIndustry:function(){var t=this,e={industryName:this.addIndustryForm.industryName};return new a.a(function(n,s){$.post(t.$baseUrl+"services/intention/addIndustry.json",l()(e)).then(function(e){"0000"==e.resultMessageEnum?n(e):t.$message.error(e.errorInfoList[0].errorMessage)})})},removeIndustry:function(){var t=this,e=this.multipleSelection.map(function(t){return t.id});$.post(this.$baseUrl+"services/intention/removeIndustry.json",l()(e)).then(function(e){"0000"==e.resultMessageEnum?(t.delIndustryVisible=!1,t.$message.success("删除成功！"),t.queryIndustryList()):t.$message.error(e.errorInfoList[0].errorMessage)})},modifyIndustry:function(t,e){var n=this,s={id:e.id,industryName:e.industryName};$.post(this.$baseUrl+"services/intention/modifyIndustry.json",l()(s)).then(function(t){"0000"==t.resultMessageEnum?(n.$message.success("修改成功！"),e.isEdit=!1):n.$message.error(t.errorInfoList[0].errorMessage)})},countNotFinishTaskByIndustry:function(){var t=this,e={industryId:this.currentRow.id};return new a.a(function(n,s){$.get(t.$baseUrl+"services/intention/countNotFinishTaskByIndustry.json",$.param(e)).then(function(e){"0000"==e.resultMessageEnum?n(e.returnObject):t.$message.error(e.errorInfoList[0].errorMessage)})})}}},"watch",{addIndustryVisible:function(t){t||this.$refs.addIndustryForm.resetFields()}}),d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container-admin"},[n("div",{staticClass:"admin-page"},[n("el-breadcrumb",{attrs:{separator:"/"}},[n("el-breadcrumb-item",[t._v("管理中心")]),t._v(" "),n("el-breadcrumb-item",[t._v("行业管理")]),t._v(" "),n("el-breadcrumb-item",[t._v(t._s(t.industryStatusTxt))])],1),t._v(" "),n("el-tabs",{on:{"tab-click":t.handleTabClick},model:{value:t.industryActiveName,callback:function(e){t.industryActiveName=e},expression:"industryActiveName"}},[n("el-tab-pane",{attrs:{label:"已上线",name:"first"}}),t._v(" "),n("el-tab-pane",{attrs:{label:"已下线",name:"second"}})],1)],1),t._v(" "),n("div",{staticClass:"admin-body"},[n("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[n("el-form-item",{attrs:{label:"关键词:"}},[n("el-input",{attrs:{placeholder:"企业名称"},on:{change:t.searchChange},nativeOn:{keyup:function(e){return e.type.indexOf("key")||13===e.keyCode?t.onSearch(e):null}},model:{value:t.queryKey,callback:function(e){t.queryKey=e},expression:"queryKey"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.onSearch}},[t._v("搜索")])],1)],1),t._v(" "),n("el-row",{staticClass:"industry-btn-box"},[n("div",{directives:[{name:"show",rawName:"v-show",value:"second"==t.industryActiveName,expression:"industryActiveName == 'second'"}]},[n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.addIndustryVisible=!0}}},[t._v("新增")]),t._v(" "),n("el-button",{attrs:{type:"primary",disabled:t.delDisabled},on:{click:function(e){t.delIndustryVisible=!0}}},[t._v("删除")])],1)]),t._v(" "),n("el-table",{directives:[{name:"show",rawName:"v-show",value:"first"==t.industryActiveName,expression:"industryActiveName == 'first'"},{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{"highlight-current-row":"",data:t.industryTableData},on:{"sort-change":t.sortChange,"selection-change":t.handleSelectionChange}},[n("el-table-column",{attrs:{prop:"industryName",label:"行业名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{directives:[{name:"show",rawName:"v-show",value:!e.row.isEdit,expression:"!scope.row.isEdit"}]},[t._v(t._s(e.row.industryName))]),t._v(" "),n("el-input",{directives:[{name:"show",rawName:"v-show",value:"second"==t.industryActiveName&&e.row.isEdit,expression:"industryActiveName == 'second' && scope.row.isEdit"}],model:{value:e.row.industryName,callback:function(n){t.$set(e.row,"industryName",n)},expression:"scope.row.industryName"}})]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"industryStatus",label:"行业状态",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{class:{"status-2":2==e.row.industryStatus,"status-3":3==e.row.industryStatus}},[t._v("\n            "+t._s(2==e.row.industryStatus?"使用中":3==e.row.industryStatus?"停用":"")+"\n          ")])]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"latestPublishDate",label:"上线时间",sortable:"",width:"180"}}),t._v(" "),n("el-table-column",{attrs:{prop:"creator",label:"操作人",width:"180"}}),t._v(" "),n("el-table-column",{attrs:{width:"180",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.handleOffline(e.row)}}},[t._v("下线")])]}}])})],1),t._v(" "),n("el-table",{directives:[{name:"show",rawName:"v-show",value:"second"==t.industryActiveName,expression:"industryActiveName == 'second'"},{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{"highlight-current-row":"",data:t.industryTableData},on:{"sort-change":t.sortChange,"selection-change":t.handleSelectionChange}},[n("el-table-column",{attrs:{selectable:t.selectable,type:"selection",width:"55",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"industryName",label:"行业名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{directives:[{name:"show",rawName:"v-show",value:!e.row.isEdit,expression:"!scope.row.isEdit"}]},[t._v(t._s(e.row.industryName))]),t._v(" "),n("el-input",{directives:[{name:"show",rawName:"v-show",value:"second"==t.industryActiveName&&e.row.isEdit,expression:"industryActiveName == 'second' && scope.row.isEdit"}],model:{value:e.row.industryName,callback:function(n){t.$set(e.row,"industryName",n)},expression:"scope.row.industryName"}})]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"latestOfflineDate",label:"下线时间",sortable:"",width:"180"}}),t._v(" "),n("el-table-column",{attrs:{prop:"creator",label:"操作人",width:"180"}}),t._v(" "),n("el-table-column",{attrs:{width:"180",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",{},[n("div",[e.row.isEdit?n("span",[n("el-button",{staticClass:"warning",attrs:{type:"text"},on:{click:function(n){return t.handleEditCancel(e.$index,e.row)}}},[t._v("取消")]),t._v("\n                ｜\n                "),n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.modifyIndustry(e.$index,e.row)}}},[t._v("确定")])],1):t._e(),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:!e.row.isEdit,expression:"!scope.row.isEdit"}]},[n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.handleEditName(e.$index,e.row)}}},[t._v("修改名称")]),t._v(" ｜\n                "),n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.handleOnline(e.$index,e.row)}}},[t._v("上线")])],1)])])]}}])})],1),t._v(" "),n("div",{staticClass:"pagination"},[n("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next,jumper",total:t.pagination.total,"page-size":t.pagination.pageSize},on:{"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),n("el-dialog",{attrs:{title:"下线行业",visible:t.offlineVisible,width:"400px"},on:{"update:visible":function(e){t.offlineVisible=e}}},[t.notFinishNum>0?n("div",[t._v("\n      该行业下有"+t._s(t.notFinishNum)+"个任务正在执行中，点击“确认”后，该行业将进入“停用”状态，该状态下任务将正常进行，但该行业相关话术不可再用\n    ")]):n("div",[t._v("您确定要下线“"+t._s(t.currentRow.industryName)+"”行业吗？下线后该行业将对前台用户不可见、不可操作")]),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.offlineVisible=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.handleOfflineEnter}},[t._v("确 定")])],1)]),t._v(" "),n("el-dialog",{staticClass:"addQuestion",attrs:{title:"上线行业",visible:t.onlineVisible,width:"400px"},on:{"update:visible":function(e){t.onlineVisible=e}}},[n("div",[t._v("您确定要上线“"+t._s(t.currentRow.industryName)+"”行业吗？")]),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.onlineVisible=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.handleOnlineEnter}},[t._v("确 定")])],1)]),t._v(" "),n("el-dialog",{attrs:{title:"新增行业",visible:t.addIndustryVisible,width:"600px"},on:{"update:visible":function(e){t.addIndustryVisible=e}}},[n("el-form",{ref:"addIndustryForm",attrs:{model:t.addIndustryForm,"label-width":"114px",rules:t.addIndustryFormRules}},[n("el-form-item",{attrs:{label:"行业名称：",prop:"industryName"}},[n("el-input",{attrs:{placeholder:"输入行业名称"},model:{value:t.addIndustryForm.industryName,callback:function(e){t.$set(t.addIndustryForm,"industryName",e)},expression:"addIndustryForm.industryName"}})],1)],1),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.addIndustryVisible=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.handleAddIndustry}},[t._v("确 定")])],1)],1),t._v(" "),n("el-dialog",{staticClass:"addQuestion",attrs:{title:"批量删除行业",visible:t.delIndustryVisible,width:"400px"},on:{"update:visible":function(e){t.delIndustryVisible=e}}},[n("div",[t._v("您确定要删除已选中的"+t._s(this.multipleSelection.length)+"个行业吗？")]),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.delIndustryVisible=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.removeIndustry}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};var c=n("VU/8")(u,d,!1,function(t){n("ay2O")},"data-v-17effbb1",null);e.default=c.exports},ay2O:function(t,e){}});