webpackJsonp([7],{"+6Bu":function(e,t,a){"use strict";t.__esModule=!0,t.default=function(e,t){var a={};for(var s in e)t.indexOf(s)>=0||Object.prototype.hasOwnProperty.call(e,s)&&(a[s]=e[s]);return a}},"6lFT":function(e,t){},BEhv:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("mvHQ"),r=a.n(s),n=a("d7EF"),i=a.n(n),c=a("Dd8w"),l=a.n(c),o=a("Xxa5"),u=a.n(o),p=a("//Fk"),d=a.n(p),h=a("exGp"),m=a.n(h),f=a("GeYD"),v=a("VIBS"),b=a("o3iK"),k=a("mtWM"),g=a.n(k),x=a("PJh5"),_=a.n(x),w=a("CVRa"),S=a("v89g"),y=a("+6Bu"),C=a.n(y),T=a("fZjL"),I=a.n(T),F=a("M4fF"),L={model:{prop:"formData",event:"change"},props:{formData:Object,disabled:{type:Boolean,default:!1},multiple:{type:Boolean,default:!1}},data:function(){return{services:[],props:{multiple:this.multiple}}},computed:{options:function(){var e=Object(F.groupBy)(this.services,"serviceNameEn");return I()(e).map(function(t){var a=e[t];return{value:t,label:a[0].serviceNameCn,children:a.map(function(e){return{value:e.id,label:e.interfaceNameCn}})}})}},mounted:function(){var e=this;this.$apiClient.post("adapter/queryAdapterServiceList.json",{currentPage:0,pageSize:500,searchType:2}).then(function(t){var a=t.returnObject.recordList;e.services=a})}},N={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-form-item",{attrs:{prop:"callServiceSwitch"}},[a("el-checkbox",{attrs:{disabled:e.disabled},model:{value:e.formData.callServiceSwitch,callback:function(t){e.$set(e.formData,"callServiceSwitch",t)},expression:"formData.callServiceSwitch"}},[e._v("调用适配服务")]),e._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"light","popper-class":"speech-tip",placement:"right-start"}},[a("div",{attrs:{slot:"content"},slot:"content"},[e._v("\n        在外呼任务拨打前或者拨打后，可从开发者接口中获取定制化服务调用，"),a("br"),e._v("并根据返回值进行逻辑控制。\n      ")]),e._v(" "),a("i",{staticClass:"el-icon-question"})])],1),e._v(" "),e.formData.callServiceSwitch?a("el-form-item",{attrs:{prop:"preCallServiceIds"}},[a("label",{staticClass:"form-item-label",attrs:{slot:"label"},slot:"label"},[e._v("拨打前使用"),a("span",[e._v("（与“拨打后使用”必填1个）")])]),e._v(" "),a("el-cascader",{staticClass:"full-width",attrs:{clearable:"",disabled:e.disabled,props:e.props,options:e.options},model:{value:e.formData.preCallServiceIds,callback:function(t){e.$set(e.formData,"preCallServiceIds",t)},expression:"formData.preCallServiceIds"}})],1):e._e(),e._v(" "),e.formData.callServiceSwitch?a("el-form-item",{attrs:{prop:"lastCallServiceIds"}},[a("label",{staticClass:"form-item-label",attrs:{slot:"label"},slot:"label"},[e._v("拨打后使用")]),e._v(" "),a("el-cascader",{staticClass:"full-width",attrs:{clearable:"",disabled:e.disabled,props:e.props,options:e.options},model:{value:e.formData.lastCallServiceIds,callback:function(t){e.$set(e.formData,"lastCallServiceIds",t)},expression:"formData.lastCallServiceIds"}})],1):e._e()],1)},staticRenderFns:[]};var E=a("VU/8")(L,N,!1,function(e){a("OkOb")},"data-v-28baa263",null).exports,P={components:{AdapterFields:E},props:{task:Object},data:function(){return{formData:l()({},this.task,{preCallServiceIds:this.task.preCallServiceIds,lastCallServiceIds:this.task.lastCallServiceIds,callServiceSwitch:1===this.task.callServiceSwitch})}},methods:{handleClose:function(){this.$emit("close")},handleSubmit:function(){var e=this;return m()(u.a.mark(function t(){var a,s,r,n,i;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.formData,s=a.preCallServiceIds,r=a.lastCallServiceIds,n=a.callServiceSwitch,i=C()(a,["preCallServiceIds","lastCallServiceIds","callServiceSwitch"]),t.prev=1,t.next=4,e.$apiClient.post("task/updateTask.json",l()({},i,{callServiceSwitch:n?1:0,preCallServiceIds:s&&s.length&&n?s[s.length-1]:null,lastCallServiceIds:r&&r.length&&n?r[r.length-1]:null}));case 4:t.sent,e.$message({message:"更新成功！",type:"success"}),e.$emit("close"),e.$emit("refresh"),t.next=14;break;case 10:t.prev=10,t.t0=t.catch(1),e.$$message.error("系统错误！"),console.error(t.t0);case 14:case"end":return t.stop()}},t,e,[[1,10]])}))()}}},D={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"dialog-content"},[a("el-form",{attrs:{"label-position":"top"}},[a("adapter-fields",{model:{value:e.formData,callback:function(t){e.formData=t},expression:"formData"}})],1)],1),e._v(" "),a("div",{staticClass:"el-dialog__footer"},[a("span",{staticClass:"dialog-footer"},[a("el-button",{on:{click:e.handleClose}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("确 定")])],1)])])},staticRenderFns:[]};var M=a("VU/8")(P,D,!1,function(e){a("ciwh")},"data-v-5b6b5c5e",null).exports,j={name:"basetable",data:function(){return{progressPattern:"number",activeName:"second",tabIndex:2,height:300,cerVisible:!1,taskStatusList:[],isCer:!0,labelPosition:"left",taskTableData:[],cur_page:1,multipleSelection:[],select_cate:"",select_word:"",select_date:[],select_speech_id:"",del_list:[],fileTipText:"",downTaskItemExcelTemplateHref:"",is_search:!1,cretVisible:!1,cretDisable:!1,delVisible:!1,creatForm:{excelPathTip:"",taskName:"",speechcraftName:"",callerPhone:"",excelPath:"",filePath:"",taskLevel:"",turnManualPhone:"",nluAppId:"",nluAppKey:"",callServiceSwitch:!1,preCallServiceIds:"",lastCallServiceIds:""},creatOptions:[],phoneOptions:[],taskLevels:[],idx:-1,pagination:{show:!0,total:0,pageIndex:1,pageSize:20},options:{stripe:!0,loading:!0,highlightCurrentRow:!0,mutiSelect:!0},sortList:[{propertyName:"factStartTime",ascendingFlag:!0}],errors:{filePath:""},rules:{speechcraftName:[{required:!0,message:"请选择话术模版！",trigger:"change"}],taskName:[{required:!0,message:"任务名称不能为空！",trigger:"change"}],callerPhone:[{required:!0,message:"请选择外显号码！",trigger:"change"}]},userInfo:{authenticationFlag:""},taskId:null,hasTransfer:!1,transferNumbers:[],isEmpty:!1,adapterServiceEdit:null}},components:{vCer:v.a,AdapterForm:M,AdapterFields:E},created:function(){var e=this;return m()(u.a.mark(function t(){var a;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.checkSpeechcraftExists();case 2:if(t.sent){t.next=5;break}return e.isEmpty=!0,t.abrupt("return");case 5:return a=document.documentElement.clientHeight,e.height=a-300,f.a.$emit("contentTop",!0),t.next=10,d.a.all([e.queryTaskList(),e.queryMemberDetail(),e.querySpeechcraftList()]);case 10:case"end":return t.stop()}},t,e)}))()},computed:{isAdapterServiceEditVisible:function(){return null!==this.adapterServiceEdit}},methods:{checkSpeechcraftExists:function(){var e=this;return m()(u.a.mark(function t(){var a,s,r,n;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g.a.get(e.$baseUrl+"speechcraft/checkSpeechcraftExists.json?speechcraftType=2");case 2:if(a=t.sent,s=a.data,r=s.resultMessageEnum,n=s.returnObject,r!==w.b){t.next=8;break}return t.abrupt("return",n);case 8:return t.abrupt("return",!1);case 9:case"end":return t.stop()}},t,e)}))()},handleTabClick:function(e){var t=this;return m()(u.a.mark(function a(){var s;return u.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(t.tabIndex!=1*e.index+1){a.next=2;break}return a.abrupt("return",!1);case 2:return t.tabIndex=1*e.index+1,t.cur_page=1,s=1==t.tabIndex?[1,2,4]:2==t.tabIndex?"":3==t.tabIndex?[5]:4==t.tabIndex?[3,6,7]:"",t.taskStatusList=s,a.next=8,t.queryTaskList();case 8:case"end":return a.stop()}},a,t)}))()},handleCreat:function(){var e=this;return m()(u.a.mark(function t(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(1!=!e.userInfo.authenticationFlag){t.next=3;break}return e.cerVisible=!0,t.abrupt("return",!1);case 3:return e.cretVisible=!0,t.next=6,e.querySpeechcraftList();case 6:e.querySystemConfig(),e.queryTaskLevels(),e.queryTransferNumbers();case 9:case"end":return t.stop()}},t,e)}))()},gotoCer:function(){this.$router.push("/account")},handleCurrentChange:function(e){var t=this;return m()(u.a.mark(function a(){return u.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.cur_page=e,a.next=3,t.queryTaskList();case 3:case"end":return a.stop()}},a,t)}))()},queryMemberDetail:function(){var e=this;return m()(u.a.mark(function t(){var a,s;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g()(e.$baseUrl+"member/queryMemberDetail.json");case 2:a=t.sent,"0000"===(s=a.data).resultMessageEnum?e.userInfo=s.returnObject:e.$message.error(s.errorInfoList[0].errorMessage);case 5:case"end":return t.stop()}},t,e)}))()},queryTaskList:function(e){var t=this;return m()(u.a.mark(function a(){var s,r,n,c,o,p,d;return u.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return s=l()({currentPage:t.cur_page-1,pageSize:t.pagination.pageSize},e),t.taskStatusList&&(s.taskStatusList=t.taskStatusList),t.select_word&&(s.taskName=t.select_word),t.select_date&&t.select_date.length>0&&(r=i()(t.select_date,2),n=r[0],c=r[1],n&&(s.factStartTime=_()(n).format("YYYY-MM-DD HH:mm:ss")),c&&(s.factEndTime=_()(c).format("YYYY-MM-DD HH:mm:ss"))),t.select_speech_id&&(s.speechcraftId=t.select_speech_id),t.sortList&&t.sortList[0].propertyName&&(s.sortList=t.sortList),a.next=8,g.a.post(t.$baseUrl+"task/queryTaskList.json",s);case 8:o=a.sent,"0000"===(p=o.data).resultMessageEnum?((d=p.returnObject.recordList).length?d.forEach(function(e,t){1==e.taskStatus?(e.scale=0,e.status=""):(e.scale=e.calledPhoneNumber/e.phoneNumber*100||0,e.status=3==e.taskStatus?"exception":5==e.taskStatus?"success":"")}):d=[],t.pagination.total=p.returnObject.totalNumber,t.taskTableData=d):t.$message.error(p.errorInfoList[0].errorMessage);case 11:case"end":return a.stop()}},a,t)}))()},handleDesc:function(e,t){this.$router.push("/task/"+t.id+"?sname="+b.a.encodeUnicode(t.taskName))},handleStartTask:function(e,t){var a=this,s=(t.id,this.taskTableData[e]);$.post(this.$baseUrl+"task/startTask.json?taskId="+t.id).then(function(e){"0000"==e.resultMessageEnum?(s.taskStatus=2,s.scale=s.calledPhoneNumber/s.phoneNumber*100,s.status="",a.$message({message:"开始任务成功",type:"success"})):a.$message.error(e.errorInfoList[0].errorMessage)})},handleStopTask:function(e,t){var a=this,s=(t.id,this.taskTableData[e]);$.post(this.$baseUrl+"task/stopTask.json?taskId="+t.id).then(function(e){"0000"==e.resultMessageEnum?(s.taskStatus=3,s.status="exception",a.$message({message:"取消任务成功",type:"success"})):a.$message.error(e.errorInfoList[0].errorMessage)})},handlePauseTask:function(e,t){var a,s=this;$.post(this.$baseUrl+"task/pauseTask.json?taskId="+t.id).then((a=m()(u.a.mark(function e(t){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("0000"!==t.resultMessageEnum){e.next=6;break}return e.next=3,s.queryTaskList();case 3:s.$message({message:"任务暂停成功",type:"success"}),e.next=7;break;case 6:s.$message.error(t.errorInfoList[0].errorMessage);case 7:case"end":return e.stop()}},e,s)})),function(e){return a.apply(this,arguments)}))},handleResumeTask:function(e,t){var a,s=this;$.post(this.$baseUrl+"task/resumeTask.json?taskId="+t.id).then((a=m()(u.a.mark(function e(t){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("0000"!==t.resultMessageEnum){e.next=6;break}return e.next=3,s.queryTaskList();case 3:s.$message({message:"任务恢复成功",type:"success"}),e.next=7;break;case 6:s.$message.error(t.errorInfoList[0].errorMessage);case 7:case"end":return e.stop()}},e,s)})),function(e){return a.apply(this,arguments)}))},showDeleteDialog:function(e){this.delVisible=!0,this.taskId=e.id},handleDeleteTask:function(){var e,t=this;this.delVisible=!1,$.post(this.$baseUrl+"task/deleteTask.json?taskId="+this.taskId).then((e=m()(u.a.mark(function e(a){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("0000"!==a.resultMessageEnum){e.next=6;break}return e.next=3,t.queryTaskList();case 3:t.$message({message:"任务删除成功",type:"success"}),e.next=7;break;case 6:t.$message.error(a.errorInfoList[0].errorMessage);case 7:case"end":return e.stop()}},e,t)})),function(t){return e.apply(this,arguments)}))},switchShow:function(e,t,a){if(-1!=$("#"+e).text().indexOf("/")){console.log(t/a);var s=numeral(t/a).format("0,00%");console.log(s),$("#"+e).text(s)}else $("#"+e).text(t+"/"+a)},checkAnnexFile:function(){var e=this;this.creatForm.excelPathTip="检测中...";var t={excelTemplateType:1,filePath:this.creatForm.excelPath,id:this.creatForm.speechcraftId};$.post(this.$baseUrl+"common/checkAnnexFile.json",r()(t)).then(function(t){if(t.returnObject.correctFlag)e.creatForm.excelPathTip="";else{var a=t.returnObject.exceptionData,s=t.returnObject.exceptionMessage,r="";if(s)r=s;else for(var n in a)r+=a[n]+"<br>";e.creatForm.excelPathTip=r}e.changeFileType()})},handleFile:function(){this.creatForm.speechcraftId||this.$message.error("请选择话术库！")},changeFileType:function(){this.$nextTick(function(){$("#file").val("")})},uploadAnnexFile:function(){var e=this,t=new FormData;t.append("sourceType",102),t.append("file",$("#file")[0].files[0]),$.ajax({url:this.$baseUrl+"common/uploadAnnexFile.json",type:"POST",cache:!1,data:t,dataType:"json",headers:{"Content-Type":"multipart/form-data"},processData:!1,contentType:!1,async:!1}).done(function(t){"0000"==t.resultMessageEnum?(e.creatForm.filePath=e.$refs.upload_input.value,e.creatForm.excelPath=t.returnObject,e.checkAnnexFile()):(e.$message.error("上传失败！"),e.creatForm.excelPathTip=""),e.errors.filePath=""}).fail(function(t){e.changeFileType()})},downTaskItemExcelTemplate:function(){if(!this.downTaskItemExcelTemplateHref)return this.$message.error("请选择话术模版！"),!1;window.location.href=this.downTaskItemExcelTemplateHref},querySpeechcraftList:function(){var e=this;return m()(u.a.mark(function t(){var a,s,r;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={templateType:2,speechcraftStatusList:["5"],pageSize:100,currentPage:0,onlyPublishIndustry:!0},t.next=3,g.a.post(e.$baseUrl+"speechcraft/querySpeechcraftList.json",a);case 3:s=t.sent,"0000"===(r=s.data).resultMessageEnum?e.creatOptions=r.returnObject.recordList:e.$message.error(r.errorInfoList[0].errorMessage);case 6:case"end":return t.stop()}},t,e)}))()},changeValue:function(e){var t,a=this;t=this.creatOptions.find(function(t){return t.id===e}),this.creatForm.speechcraftId=t.id,this.creatForm.speechcraftName=t.speechcraftName,this.downTaskItemExcelTemplateHref=this.$baseUrl+"task/downTaskItemExcelTemplate.html?speechcraftId="+this.creatForm.speechcraftId,$.get(this.$baseUrl+"task/checkHasTransfer.json?speechcraftId="+this.creatForm.speechcraftId).then(function(e){"0000"===e.resultMessageEnum?e.returnObject?a.hasTransfer=!0:a.hasTransfer=!1:a.$message.error(e.errorInfoList[0].errorMessage)})},querySystemConfig:function(){var e=this;$.get(this.$baseUrl+"common/querySystemConfig.json?configGroup=8").then(function(t){"0000"===t.resultMessageEnum?e.phoneOptions=t.returnObject:e.$message.error(t.errorInfoList[0].errorMessage)})},queryTaskLevels:function(){var e=this;$.get(this.$baseUrl+"common/querySystemConfig.json?configGroup=11").then(function(t){"0000"===t.resultMessageEnum?(e.taskLevels=t.returnObject,e.creatForm.taskLevel=e.taskLevels[0].systemValue):e.$message.error(t.errorInfoList[0].errorMessage)})},queryTransferNumbers:function(){var e=this;$.get(this.$baseUrl+"common/querySystemConfig.json?configGroup=14").then(function(t){"0000"===t.resultMessageEnum?e.transferNumbers=t.returnObject:e.$message.error(t.errorInfoList[0].errorMessage)})},search:function(){var e=this;return m()(u.a.mark(function t(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.select_word){t.next=3;break}return e.$message.error("请输入关键字！"),t.abrupt("return",!1);case 3:return e.cur_page=1,t.next=6,e.queryTaskList();case 6:case"end":return t.stop()}},t,e)}))()},filter:function(){var e=this;return m()(u.a.mark(function t(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(e.select_date<=0)||e.select_speech_id){t.next=3;break}return e.$message.error("请输入筛选条件！"),t.abrupt("return",!1);case 3:return e.cur_page=1,t.next=6,e.queryTaskList();case 6:case"end":return t.stop()}},t,e)}))()},searchChange:function(e){var t=this;return m()(u.a.mark(function a(){return u.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(e){a.next=3;break}return a.next=3,t.queryTaskList();case 3:case"end":return a.stop()}},a,t)}))()},formatter:function(e,t){},formatter2:function(e,t){},handleEdit:function(e,t){this.idx=e;var a=this.taskTableData[e];this.form={name:a.name,startDate:a.date,address:a.address},this.editVisible=!0},creatHandleTask:function(e){var t=this;this.creatForm.excelPath?this.$refs[e].validate(function(a){if(!a)return!1;t.cretDisable=!0;var s,n=Object(S.find)(t.creatOptions,{id:t.creatForm.speechcraftId}),i=t.creatForm,c=i.preCallServiceIds,l=i.lastCallServiceIds,o={taskName:t.creatForm.taskName,speechcraftId:t.creatForm.speechcraftId,speechcraftName:t.creatForm.speechcraftName,callerPhone:t.creatForm.callerPhone,excelPath:t.creatForm.excelPath,taskLevel:t.creatForm.taskLevel,nluAppId:n?n.nluAppId:"",nluAppKey:n?n.nluAppKey:"",callServiceSwitch:t.creatForm.callServiceSwitch?1:0,preCallServiceIds:c&&c[c.length-1],lastCallServiceIds:l&&l[l.length-1]};$.post(t.$baseUrl+"task/addTask.json",r()(o)).then((s=m()(u.a.mark(function a(s){return u.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if("0000"!==s.resultMessageEnum){a.next=9;break}return t.cretDisable=!1,t.cretVisible=!1,t.creatForm.speechcraftId="",t.$refs[e].resetFields(),a.next=7,t.queryTaskList();case 7:a.next=10;break;case 9:t.$message.error(s.errorInfoList[0].errorMessage);case 10:case"end":return a.stop()}},a,t)})),function(e){return s.apply(this,arguments)}))}):this.errors.filePath="请上传外呼数据！"},delAll:function(){},handleSelectionChange:function(e){this.multipleSelection=e},createExportTaskItemExcelFile:function(){var e=this,t=[];if(!this.multipleSelection.length)return this.$message.error("请选择要导出报表任务！"),!1;this.multipleSelection.forEach(function(e){t.push(e.id)});var a={taskIdList:t};$.post(this.$baseUrl+"file/createExportTaskItemExcelFile.json",r()(a)).then(function(t){"0000"===t.resultMessageEnum?(e.multipleSelection=[],window.location.href=e.$baseUrl+"file/downloadFile.html?filePath="+t.returnObject.filePath):e.$message.error(t.errorInfoList[0].errorMessage)})},sortChange:function(e){var t=this;return m()(u.a.mark(function a(){var s;return u.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return s="ascending"===e.order,t.sortList=[{propertyName:e.prop,ascendingFlag:s}],a.next=4,t.queryTaskList();case 4:case"end":return a.stop()}},a,t)}))()},switchProgressPattern:function(e){"percent"===e?(console.log($("span.progress-text:visible").length),$("span.progress-text").each(function(e,t){var a=$(this).text().split("/"),s=a[0],r=a[1],n=s/r;$(this).text((100*n).toFixed(2)+"%"),$(this).attr("calledPhoneNumber",s),$(this).attr("phoneNumber",r)})):"number"==e&&$("span.progress-text").each(function(e,t){var a=$(this).attr("calledPhoneNumber"),s=$(this).attr("phoneNumber");$(this).attr("phoneNumber",s),$(this).text(a+"/"+s)})},handleASEditClose:function(){this.adapterServiceEdit=null}},destroyed:function(){f.a.$emit("contentTop",!1)}},O={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.isEmpty?a("div",{staticClass:"empty-div"},[a("div",{staticClass:"big-background-icon"}),e._v(" "),a("h3",[e._v("任务列表为空")]),e._v(" "),e._m(0)]):a("div",{staticClass:"table table-main"},[a("div",{staticClass:"content-box-top"},[a("el-input",{staticClass:"handle-input mr10",attrs:{clearable:"",placeholder:"筛选关键词"},on:{change:e.searchChange},nativeOn:{keyup:function(t){return t.type.indexOf("key")||13===t.keyCode?e.search(t):null}},model:{value:e.select_word,callback:function(t){e.select_word=t},expression:"select_word"}}),e._v(" "),a("el-button",{attrs:{type:"primary",icon:"search"},on:{click:e.search}},[e._v("搜索")]),e._v(" "),a("div",{staticClass:"content-box-top-right"},[a("el-button",{attrs:{type:"primary",icon:"iconfont icon-ico_new-task"},on:{click:e.handleCreat}},[e._v("新建任务")])],1),e._v(" "),a("div",{staticClass:"content-box-top-bottom"},[a("el-date-picker",{staticClass:"select-date",attrs:{type:"daterange",align:"left","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","prefix-icon":"el-icon-time"},model:{value:e.select_date,callback:function(t){e.select_date=t},expression:"select_date"}}),e._v(" "),a("el-select",{staticClass:"select-speech",attrs:{placeholder:"话术名称"},model:{value:e.select_speech_id,callback:function(t){e.select_speech_id=t},expression:"select_speech_id"}},e._l(e.creatOptions,function(e){return a("el-option",{key:e.id,attrs:{label:e.speechcraftName,value:e.id}})}),1),e._v(" "),a("el-button",{staticClass:"select-filter-btn",attrs:{type:"primary"},on:{click:e.filter}},[e._v("筛选")])],1)],1),e._v(" "),a("div",{staticClass:"w-cantainer task-table-cantainer"},[e.isCer?e._e():a("v-cer"),e._v(" "),a("div",{staticClass:"box-card task-card"},[a("div",{staticClass:"task-card-top-btn-box"},[a("el-switch",{staticStyle:{"margin-right":"70px"},attrs:{"active-text":"N","inactive-text":"%","active-value":"number","inactive-value":"percent"},on:{change:e.switchProgressPattern},model:{value:e.progressPattern,callback:function(t){e.progressPattern=t},expression:"progressPattern"}}),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.createExportTaskItemExcelFile}},[e._v("导出报表")])],1),e._v(" "),a("el-tabs",{on:{"tab-click":e.handleTabClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"未完成",name:"first"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"全部",name:"second"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"已完成",name:"third"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"已取消",name:"fourth"}})],1),e._v(" "),a("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:e.taskTableData,stripe:"",height:e.height,options:e.options,pagination:e.pagination},on:{"sort-change":e.sortChange,"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"taskName",label:"任务名称",width:"150",sortable:"",fixed:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"factStartTime",label:"任务开始时间",sortable:"",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{width:"180",prop:"factEndTime",sortable:"",label:"任务结束时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"speechcraftName",label:"话术名称",width:"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"connectedRate",label:"接通率",width:"70"}}),e._v(" "),a("el-table-column",{attrs:{prop:"agentCount",label:"坐席数",width:"70"}}),e._v(" "),a("el-table-column",{attrs:{prop:"taskStatus",label:"进度"},scopedSlots:e._u([{key:"default",fn:function(t){return[4==t.row.taskStatus?a("span",[e._v("审核中")]):a("div",[a("span",{staticClass:"progress-text",attrs:{id:t.row.id}},[e._v(e._s(t.row.calledPhoneNumber)+"/"+e._s(t.row.phoneNumber))]),e._v(" "),a("el-progress",{attrs:{"text-inside":!0,"stroke-width":18,status:t.row.status||"success",percentage:t.row.scale||0}})],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"180",align:"center",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.handleDesc(t.$index,t.row)}}},[e._v("详情")]),e._v(" "),4!=t.row.taskStatus?a("span",[a("el-button",{directives:[{name:"show",rawName:"v-show",value:1==t.row.taskStatus,expression:"scope.row.taskStatus == 1"}],attrs:{type:"text"},on:{click:function(a){return e.handleStartTask(t.$index,t.row)}}},[e._v("开始")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:2==t.row.taskStatus,expression:"scope.row.taskStatus == 2"}],attrs:{type:"text"},on:{click:function(a){return e.handleStopTask(t.$index,t.row)}}},[e._v("取消")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:2==t.row.taskStatus,expression:"scope.row.taskStatus == 2"}],attrs:{type:"text"},on:{click:function(a){return e.handlePauseTask(t.$index,t.row)}}},[e._v("暂停")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:8==t.row.taskStatus,expression:"scope.row.taskStatus == 8"}],attrs:{type:"text"},on:{click:function(a){return e.handleResumeTask(t.$index,t.row)}}},[e._v("继续")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:1==t.row.taskStatus,expression:"scope.row.taskStatus == 1"}],attrs:{type:"text"},on:{click:function(a){return e.showDeleteDialog(t.row)}}},[e._v("删除")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:1==t.row.taskStatus,expression:"scope.row.taskStatus == 1"}],attrs:{type:"text"},on:{click:function(a){e.adapterServiceEdit=t.row}}},[e._v("调用服务")])],1):e._e()]}}])})],1),e._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next,jumper",total:e.pagination.total,"page-size":e.pagination.pageSize},on:{"current-change":e.handleCurrentChange}})],1)],1)],1),e._v(" "),a("el-dialog",{staticClass:"creatDialog",attrs:{title:"新建任务",visible:e.cretVisible,width:"800px"},on:{"update:visible":function(t){e.cretVisible=t}}},[a("el-form",{ref:"creatForm",staticStyle:{width:"490px",margin:"0 auto"},attrs:{rules:e.rules,model:e.creatForm,"label-position":e.labelPosition,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"任务名称",prop:"taskName"}},[a("el-input",{attrs:{placeholder:"输入任务名称"},model:{value:e.creatForm.taskName,callback:function(t){e.$set(e.creatForm,"taskName",t)},expression:"creatForm.taskName"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"speechcraftName",label:"话术名称"}},[a("el-select",{staticStyle:{width:"380px"},attrs:{placeholder:"选择我的话术库"},on:{change:e.changeValue},model:{value:e.creatForm.speechcraftName,callback:function(t){e.$set(e.creatForm,"speechcraftName",t)},expression:"creatForm.speechcraftName"}},e._l(e.creatOptions,function(e){return a("el-option",{key:e.id,attrs:{label:e.speechcraftName,value:e.id}})}),1)],1),e._v(" "),e.hasTransfer?a("el-form-item",{attrs:{prop:"turnManualPhone",label:"转人工号码"}},[a("el-select",{staticStyle:{width:"380px"},attrs:{placeholder:"选择转人工号码"},model:{value:e.creatForm.turnManualPhone,callback:function(t){e.$set(e.creatForm,"turnManualPhone",t)},expression:"creatForm.turnManualPhone"}},e._l(e.transferNumbers,function(e){return a("el-option",{key:e.systemValue,attrs:{label:e.valueName,value:e.systemValue}})}),1)],1):e._e(),e._v(" "),a("el-form-item",{attrs:{prop:"callerPhone",label:"外显号码"}},[a("el-select",{staticStyle:{width:"380px"},attrs:{placeholder:"选择外显号码"},model:{value:e.creatForm.callerPhone,callback:function(t){e.$set(e.creatForm,"callerPhone",t)},expression:"creatForm.callerPhone"}},e._l(e.phoneOptions,function(e){return a("el-option",{key:e.systemValue,attrs:{label:e.systemValue,value:e.systemValue}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{prop:"taskLevel",label:"优先级"}},[a("el-select",{staticStyle:{width:"380px"},attrs:{"value-key":"valueName",placeholder:"选择任务优先级"},model:{value:e.creatForm.taskLevel,callback:function(t){e.$set(e.creatForm,"taskLevel",t)},expression:"creatForm.taskLevel"}},e._l(e.taskLevels,function(e){return a("el-option",{key:e.systemTypeCode,attrs:{label:e.valueName,value:e.systemValue}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"外呼数据",prop:"filePath",error:e.errors.filePath}},[a("el-col",{attrs:{span:17}},[a("p",[e._v("第一步：请下载excel模板填写信息")]),e._v(" "),a("p",[e._v("第二步：上传填写好的excel文件")]),e._v(" "),a("p",{staticClass:"blue"},[e._v(e._s(e.creatForm.filePath))]),e._v(" "),a("p",{staticClass:"red",domProps:{innerHTML:e._s(e.creatForm.excelPathTip)}})]),e._v(" "),a("el-col",{staticClass:"data-btn-box",attrs:{span:4}},[a("el-button",{on:{click:e.downTaskItemExcelTemplate}},[e._v("下载模版")]),e._v(" "),a("div",{attrs:{id:"task_upload_box"}},[a("el-button",{staticClass:"file-btn",nativeOn:{click:function(t){return e.handleFile(t)}}},[a("input",{directives:[{name:"show",rawName:"v-show",value:e.creatForm.speechcraftId,expression:"creatForm.speechcraftId"}],ref:"upload_input",attrs:{type:"file",id:"file"},on:{change:e.uploadAnnexFile}}),e._v(" "),e._v("\n              上传\n            ")])],1)],1)],1),e._v(" "),a("div",{staticClass:"el-form--label-top adapter-field-container"},[a("adapter-fields",{model:{value:e.creatForm,callback:function(t){e.creatForm=t},expression:"creatForm"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.cretVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",disabled:e.cretDisable},on:{click:function(t){return e.creatHandleTask("creatForm")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"提示",visible:e.cerVisible,width:"400px",center:""},on:{"update:visible":function(t){e.cerVisible=t}}},[a("div",{staticClass:"del-dialog-cnt"},[e._v("您还未进行企业认证，不能创建外呼任务！")]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.cerVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.gotoCer}},[e._v("立即认证")])],1)]),e._v(" "),a("el-dialog",{attrs:{title:"任务删除确认",visible:e.delVisible,width:"400px"},on:{"update:visible":function(t){e.delVisible=t}}},[a("div",[e._v("您确定要删除此任务吗？")]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.delVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleDeleteTask()}}},[e._v("确 定")])],1)]),e._v(" "),a("el-dialog",{attrs:{title:"服务调用",visible:e.isAdapterServiceEditVisible},on:{close:e.handleASEditClose}},[e.isAdapterServiceEditVisible?a("adapter-form",{attrs:{task:e.adapterServiceEdit},on:{close:e.handleASEditClose,refresh:e.queryTaskList}}):e._e()],1)],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("\n    请先去\n    "),t("a",{attrs:{href:"/index.html#/speech"}},[this._v("我的话术")]),this._v("创建“智能外呼方案”类型的话术模版，才能使用创建任务哦\n  ")])}]};var V=a("VU/8")(j,O,!1,function(e){a("JLEw"),a("6lFT")},"data-v-0823c57b",null);t.default=V.exports},JLEw:function(e,t){},KxLm:function(e,t){},OkOb:function(e,t){},VIBS:function(e,t,a){"use strict";var s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"cer-page"},[a("div",{directives:[{name:"show",rawName:"v-show",value:0==e.status,expression:"status==0"}],staticClass:"no-cer",class:{gray:e.disabled}},[e._m(0),e._v(" "),e.disabled?a("el-button",{attrs:{type:"info",disabled:""}},[e._v("立即认证")]):a("el-button",{attrs:{type:"primary"},on:{click:e.handleCertificate}},[e._v("立即认证")]),e._v(" "),a("span",{staticClass:"tip"},[e._v(e._s(e.tipTxt))])],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.status,expression:"status==1"}],staticClass:"steps-box"},[a("el-steps",{attrs:{active:e.num}},[a("el-step",{attrs:{title:"企业认证申请"}}),e._v(" "),a("el-step",{attrs:{title:"24h内完成审核"}}),e._v(" "),3==e.num?a("el-step",{attrs:{title:"审核完成"}}):4==e.num?a("el-step",{staticClass:"warning",attrs:{title:"认证失败"}}):e._e()],1),e._v(" "),a("a",{directives:[{name:"show",rawName:"v-show",value:4==e.num,expression:"num==4"}],staticClass:"warning-tip",on:{click:e.handleCertificate}},[e._v("重新认证")])],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.status&&3==e.num,expression:"status==1 && num==3"}],staticClass:"success-box"},[e._m(1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("span",[t("i",{staticClass:"w_ico_certificate-grey"})])},function(){var e=this.$createElement,t=this._self._c||e;return t("span",{staticClass:"success-tip"},[t("i",{staticClass:"w_ico_certificate"}),this._v("企业认证成功！可以开始创建话术任务啦！")])}]};var r=a("VU/8")({data:function(){return{id:"a",isCerSteps:!1,tipTxt:"您还未进行企业认证，不能创建外呼任务！",disabled:!1}},props:["status","num"],components:{},created:function(){},methods:{handleCertificate:function(){this.$emit("cerPop",!0)}},watch:{num:function(e){0==e&&(this.tipTxt="您还未进行企业认证，不能创建外呼任务"),1!=e&&2!=e||(this.tipTxt="24小时完成审核，请等待"),4==e&&(this.tipTxt="已驳回"),5==e&&(this.tipTxt="24小时完成审核，请等待"),1!=e&&2!=e&&3!=e&&5!=e||(this.disabled=!0)}}},s,!1,function(e){a("KxLm")},"data-v-ae45591c",null);t.a=r.exports},ciwh:function(e,t){}});