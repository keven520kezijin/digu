webpackJsonp([22],{"0RKy":function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=l("mvHQ"),o=l.n(i),a=(l("GeYD"),{components:{},data:function(){return{total:null,queryPageCondition:{queryKey:null,currentPage:1,pageSize:10},tableData:[],multipleSelection:[],dialogFormVisible:!1,form:{id:"",repeatIntervalHour:0,repeatIntervalMinute:0,callLimitClosed:1,callLimitDowntime:1,callLimitRefused:1,callLimitBreakDown:1,callLimitNoAnswer:1,callLimitCallFail:1,callLimitEmpty:1,callLimitForword:1},formLabelWidth:"120px",labelPosition:"right",closedSelect:"unlimited",downtimeSelect:"unlimited",refusedSelect:"unlimited",noAnswerSelect:"unlimited",callFailSelect:"unlimited",emptySelect:"unlimited",forwordSelect:"unlimited",limitBreakDownSelect:"unlimited"}},created:function(){this.queryInvalidNumberList()},computed:{},methods:{exportNumber:function(){var e=this,t=this.multipleSelection.map(function(e){return e.id});$.post(this.$baseUrl+"task/exportInvalidNumberListFile.json",o()(t)).then(function(t){"0000"==t.resultMessageEnum?e.downloadFile(t.returnObject.filePath):e.$message.error(t.errorInfoList[0].errorMessage)})},downloadFile:function(e){var t=e;window.location.href=this.$baseUrl+"file/downloadFile.html?filePath="+t},handleSelectionChange:function(e){this.multipleSelection=e},queryInvalidNumberList:function(){var e=this;$.post(this.$baseUrl+"task/queryInvalidNumberList.json",o()(this.queryPageCondition)).then(function(t){if("0000"==t.resultMessageEnum){var l=t.returnObject;e.total=l.totalNumber,e.queryPageCondition.currentPage=l.currentPage,e.queryPageCondition.pageSize=l.pageSize,e.tableData=l.recordList}else e.$message.error(t.errorInfoList[0].errorMessage)})},handleSizeChange:function(e){console.log("每页 "+e+" 条"),this.queryPageCondition.pageSize=e,this.queryInvalidNumberList()},handleCurrentChange:function(e){console.log("当前页: "+e),this.queryPageCondition.currentPage=e,this.queryInvalidNumberList()},connectedResultFormatter:function(e,t,l,i){return 1==l?"接听":"未接听"},search:function(){this.queryInvalidNumberList()},removeNumber:function(){if(0!=this.multipleSelection.length){for(var e=this,t=[],l=0;l<this.multipleSelection.length;l++)t.push(this.multipleSelection[l].id);$.ajax({url:this.$baseUrl+"task/removeInvalidNumbers.json",type:"POST",cache:!1,data:{numbers:t},dataType:"json",headers:{"Content-Type":"application/x-www-form-urlencoded"}}).done(function(t){"0000"==t.resultMessageEnum?(e.$message.success("操作成功！"),e.queryInvalidNumberList()):e.$message.error("操作失败！")}).fail(function(t){e.$message.error("操作失败！")})}else this.$message.error("请选择要移出的号码！")},handleSetupLimit:function(){var e=this;$.get(this.$baseUrl+"task/queryTaskConfig.json").then(function(t){if("0000"==t.resultMessageEnum){if(t.returnObject){var l=t.returnObject;e.form=l,l.callLimitClosed>=0?(e.closedSelect="custom",e.form.callLimitClosed=l.callLimitClosed):e.closedSelect="unlimited",l.callLimitDowntime>=0?(e.downtimeSelect="custom",e.form.callLimitDowntime=l.callLimitDowntime):e.downtimeSelect="unlimited",l.callLimitRefused>=0?(e.refusedSelect="custom",e.form.callLimitRefused=l.callLimitRefused):e.refusedSelect="unlimited",l.callLimitNoAnswer>=0?(e.noAnswerSelect="custom",e.form.callLimitNoAnswer=l.callLimitNoAnswer):e.noAnswerSelect="unlimited",l.callLimitBreakDown>=0?(e.limitBreakDownSelect="custom",e.form.callLimitBreakDown=l.callLimitBreakDown):e.limitBreakDownSelect="unlimited",l.callLimitCallFail>=0?(e.callFailSelect="custom",e.form.callLimitCallFail=l.callLimitCallFail):e.callFailSelect="unlimited",l.callLimitEmpty>=0?(e.emptySelect="custom",e.form.callLimitEmpty=l.callLimitEmpty):e.emptySelect="unlimited",l.callLimitForword>=0?(e.forwordSelect="custom",e.form.callLimitForword=l.callLimitForword):e.forwordSelect="unlimited"}}else resolve(t.errorInfoList[0].errorMessage)}),this.dialogFormVisible=!0},submit:function(){var e=this;"unlimited"==this.closedSelect&&(this.form.callLimitClosed=-1),"unlimited"==this.downtimeSelect&&(this.form.callLimitDowntime=-1),"unlimited"==this.refusedSelect&&(this.form.callLimitRefused=-1),"unlimited"==this.noAnswerSelect&&(this.form.callLimitNoAnswer=-1),"unlimited"==this.callFailSelect&&(this.form.callLimitCallFail=-1),"unlimited"==this.emptySelect&&(this.form.callLimitEmpty=-1),"unlimited"==this.forwordSelect&&(this.form.callLimitForword=-1);var t=o()(this.form);console.log(t),$.post(this.$baseUrl+"task/saveOrUpdateTaskConfig.json",t).then(function(t){"0000"==t.resultMessageEnum?(e.form.id=t.returnObject,e.dialogFormVisible=!1,e.$message.success("保存成功")):e.$message.error(t.errorInfoList[0].errorMessage)})}},destroyed:function(){}}),n={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"table"},[l("div",{staticClass:"content-box-top"},[l("el-input",{staticClass:"handle-input mr10",attrs:{clearable:"",placeholder:"输入号码／用户名称／任务名称"},on:{change:function(e){}},model:{value:e.queryPageCondition.queryKey,callback:function(t){e.$set(e.queryPageCondition,"queryKey",t)},expression:"queryPageCondition.queryKey"}}),e._v(" "),l("el-button",{attrs:{type:"primary",icon:"search"},on:{click:e.search}},[e._v("搜索")]),e._v(" "),l("div",{staticClass:"content-box-top-right"},[l("el-button",{attrs:{type:"primary"},on:{click:e.handleSetupLimit}},[e._v("呼叫上限设置")])],1)],1),e._v(" "),l("div",{staticStyle:{position:"relative",left:"5px",top:"50px"}},[l("el-card",{staticClass:"box-card"},[l("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[l("span",[e._v("无效号码")]),e._v(" "),l("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:function(t){return e.removeNumber()}}},[e._v("移出")]),e._v(" "),l("el-button",{staticStyle:{float:"right","margin-right":"5px"},attrs:{type:"primary"},on:{click:e.exportNumber}},[e._v("导出")])],1),e._v(" "),l("div",{staticClass:"text item"},[l("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[l("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),l("el-table-column",{attrs:{prop:"phone",label:"号码",width:"120"}}),e._v(" "),l("el-table-column",{attrs:{prop:"taskName",label:"任务名称",width:"120"}}),e._v(" "),l("el-table-column",{attrs:{prop:"customerName",label:"用户姓名"}}),e._v(" "),l("el-table-column",{attrs:{prop:"callNumber",label:"拨打次数",width:"120"}}),e._v(" "),l("el-table-column",{attrs:{prop:"connectedResultType",label:"通话结果",formatter:e.connectedResultFormatter}}),e._v(" "),l("el-table-column",{attrs:{prop:"status",label:"状态",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{class:1==t.row.status?"danger":"default"},[e._v("\n                  "+e._s(1==t.row.status?"限制中":"已移出")+"\n                ")])]}}])})],1)],1),e._v(" "),l("div",{staticClass:"pagination"},[l("el-pagination",{attrs:{"current-page":e.queryPageCondition.currentPage,"page-sizes":[10,20,50,100,200],"page-size":e.queryPageCondition.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)]),e._v(" "),l("el-dialog",{attrs:{title:"呼叫上限设置",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[l("el-form",{attrs:{model:e.form,"label-position":e.labelPosition,"label-width":"120px"}},[l("el-form-item",{attrs:{label:"关机"}},[l("el-select",{model:{value:e.closedSelect,callback:function(t){e.closedSelect=t},expression:"closedSelect"}},[l("el-option",{attrs:{label:"不限",value:"unlimited"}}),e._v(" "),l("el-option",{attrs:{label:"自定义",value:"custom"}})],1),e._v(" "),"custom"==e.closedSelect?l("el-input-number",{attrs:{"controls-position":"right",min:1,max:1e3},model:{value:e.form.callLimitClosed,callback:function(t){e.$set(e.form,"callLimitClosed",t)},expression:"form.callLimitClosed"}}):e._e(),e._v("\n            次\n          ")],1),e._v(" "),l("el-form-item",{attrs:{label:"停机"}},[l("el-select",{model:{value:e.downtimeSelect,callback:function(t){e.downtimeSelect=t},expression:"downtimeSelect"}},[l("el-option",{attrs:{label:"不限",value:"unlimited"}}),e._v(" "),l("el-option",{attrs:{label:"自定义",value:"custom"}})],1),e._v(" "),"custom"==e.downtimeSelect?l("el-input-number",{attrs:{"controls-position":"right",min:1,max:1e3},model:{value:e.form.callLimitDowntime,callback:function(t){e.$set(e.form,"callLimitDowntime",t)},expression:"form.callLimitDowntime"}}):e._e(),e._v("\n            次\n          ")],1),e._v(" "),l("el-form-item",{attrs:{label:"用户忙"}},[l("el-select",{model:{value:e.refusedSelect,callback:function(t){e.refusedSelect=t},expression:"refusedSelect"}},[l("el-option",{attrs:{label:"不限",value:"unlimited"}}),e._v(" "),l("el-option",{attrs:{label:"自定义",value:"custom"}})],1),e._v(" "),"custom"==e.refusedSelect?l("el-input-number",{attrs:{"controls-position":"right",min:1,max:1e3},model:{value:e.form.callLimitRefused,callback:function(t){e.$set(e.form,"callLimitRefused",t)},expression:"form.callLimitRefused"}}):e._e(),e._v("\n            次\n          ")],1),e._v(" "),l("el-form-item",{attrs:{label:"无应答"}},[l("el-select",{model:{value:e.noAnswerSelect,callback:function(t){e.noAnswerSelect=t},expression:"noAnswerSelect"}},[l("el-option",{attrs:{label:"不限",value:"unlimited"}}),e._v(" "),l("el-option",{attrs:{label:"自定义",value:"custom"}})],1),e._v(" "),"custom"==e.noAnswerSelect?l("el-input-number",{attrs:{"controls-position":"right",min:1,max:1e3},model:{value:e.form.callLimitNoAnswer,callback:function(t){e.$set(e.form,"callLimitNoAnswer",t)},expression:"form.callLimitNoAnswer"}}):e._e(),e._v("\n            次\n          ")],1),e._v(" "),l("el-form-item",{attrs:{label:"线路故障"}},[l("el-select",{model:{value:e.limitBreakDownSelect,callback:function(t){e.limitBreakDownSelect=t},expression:"limitBreakDownSelect"}},[l("el-option",{attrs:{label:"不限",value:"unlimited"}}),e._v(" "),l("el-option",{attrs:{label:"自定义",value:"custom"}})],1),e._v(" "),"custom"==e.limitBreakDownSelect?l("el-input-number",{attrs:{"controls-position":"right",min:1,max:1e3},model:{value:e.form.callLimitBreakDown,callback:function(t){e.$set(e.form,"callLimitBreakDown",t)},expression:"form.callLimitBreakDown"}}):e._e(),e._v("\n            次\n          ")],1),e._v(" "),l("el-form-item",{attrs:{label:"空号"}},[l("el-select",{model:{value:e.emptySelect,callback:function(t){e.emptySelect=t},expression:"emptySelect"}},[l("el-option",{attrs:{label:"不限",value:"unlimited"}}),e._v(" "),l("el-option",{attrs:{label:"自定义",value:"custom"}})],1),e._v(" "),"custom"==e.emptySelect?l("el-input-number",{attrs:{"controls-position":"right",min:1,max:1e3},model:{value:e.form.callLimitEmpty,callback:function(t){e.$set(e.form,"callLimitEmpty",t)},expression:"form.callLimitEmpty"}}):e._e(),e._v("\n            次\n          ")],1),e._v(" "),l("el-form-item",{attrs:{label:"呼叫失败"}},[l("el-select",{model:{value:e.callFailSelect,callback:function(t){e.callFailSelect=t},expression:"callFailSelect"}},[l("el-option",{attrs:{label:"不限",value:"unlimited"}}),e._v(" "),l("el-option",{attrs:{label:"自定义",value:"custom"}})],1),e._v(" "),"custom"==e.callFailSelect?l("el-input-number",{attrs:{"controls-position":"right",min:1,max:1e3},model:{value:e.form.callLimitCallFail,callback:function(t){e.$set(e.form,"callLimitCallFail",t)},expression:"form.callLimitCallFail"}}):e._e(),e._v("\n            次\n          ")],1)],1),e._v(" "),l("div",[e._v("注：自定义上限值范围为1-1000次")]),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("确 定")])],1)],1)],1)])},staticRenderFns:[]};var r=l("VU/8")(a,n,!1,function(e){l("UBTZ")},"data-v-6a71a5de",null);t.default=r.exports},UBTZ:function(e,t){}});