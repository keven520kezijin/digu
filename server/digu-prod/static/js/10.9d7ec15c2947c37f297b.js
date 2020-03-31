webpackJsonp([10,18],{"6HuP":function(e,t){},"9WvF":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("d7EF"),s=a.n(n),r=a("Xxa5"),i=a.n(r),c=a("exGp"),l=a.n(c),o=a("GeYD"),u=a("mtWM"),h=a.n(u),d=a("CVRa"),p=a("PJh5"),f=a.n(p),g={components:{DialogueDesc:a("k7zp").default},data:function(){return{openDesc:!1,dialogueDesc:null,searchDialogueName:"",pagination:{total:0,pageIndex:1,pageSize:20},dialogueDataList:[],multipleSelection:[],isEmpty:!1,select_date:[],select_channel_name:"",channelList:[]}},created:function(){var e=this;return l()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.checkSpeechcraftExists();case 2:if(t.sent){t.next=5;break}return e.isEmpty=!0,t.abrupt("return");case 5:o.a.$emit("contentTop",!0),e.fetchList();case 7:case"end":return t.stop()}},t,e)}))()},methods:{checkSpeechcraftExists:function(){var e=this;return l()(i.a.mark(function t(){var a,n,s,r;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,h.a.get(e.$baseUrl+"speechcraft/checkSpeechcraftExists.json?speechcraftType=1");case 2:if(a=t.sent,n=a.data,s=n.resultMessageEnum,r=n.returnObject,s!==d.b){t.next=8;break}return t.abrupt("return",r);case 8:return t.abrupt("return",!1);case 9:case"end":return t.stop()}},t,e)}))()},defaultValue:function(e,t,a,n){return a||"-"},formatTime:function(e,t,a,n){return a?f.a.unix(Math.floor(a/1e3)).format("YYYY-MM-DD HH:mm:ss"):"-"},search:function(){var e=this;return l()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.searchDialogueName){t.next=4;break}e.$message.error("请输输入筛选条件"),t.next=6;break;case 4:return t.next=6,e.fetchList();case 6:case"end":return t.stop()}},t,e)}))()},filter:function(){var e=this;return l()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(e.select_date<=0)||e.select_channel_name||e.searchDialogueName){t.next=3;break}return e.$message.error("请输入筛选条件！"),t.abrupt("return",!1);case 3:return e.pagination.pageIndex=1,t.next=6,e.fetchList();case 6:case"end":return t.stop()}},t,e)}))()},searchInputChange:function(e){var t=this;return l()(i.a.mark(function a(){return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(e){a.next=3;break}return a.next=3,t.fetchList();case 3:case"end":return a.stop()}},a,t)}))()},fetchList:function(){var e=this;return l()(i.a.mark(function t(){var a,n,r,c,l,o;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={currentPage:e.pagination.pageIndex-1,pageSize:e.pagination.pageSize},e.searchDialogueName&&(a.searchKey=e.searchDialogueName),e.select_date&&e.select_date.length>0&&(n=s()(e.select_date,2),r=n[0],c=n[1],r&&(a.dialogStartTime=f()(r).format("YYYY-MM-DD HH:mm:ss")),c&&(a.dialogEndTime=f()(c).set("hours",23).set("minutes",59).set("seconds",59).format("YYYY-MM-DD HH:mm:ss"))),e.select_channel_name&&(a.channelName=e.select_channel_name),t.next=6,h.a.post(e.$baseUrl+"dialog/queryDialogList.json",a);case 6:if(l=t.sent,(o=l.data).resultMessageEnum!==d.a){t.next=11;break}return e.$message.error("系统异常"),t.abrupt("return");case 11:e.dialogueDataList=o.returnObject.recordList,e.pagination.total=o.returnObject.totalNumber,e.dialogueDataList.forEach(function(t){t.channelName&&e.channelList.indexOf(t.channelName)<0&&e.channelList.push(t.channelName)});case 14:case"end":return t.stop()}},t,e)}))()},handleSelectionChange:function(e){this.multipleSelection=e},exportFile:function(){var e=this;return l()(i.a.mark(function t(){var a,n,s,r,c,l;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a=[],!e.multipleSelection.length){t.next=5;break}e.multipleSelection.forEach(function(e){a.push(e.id)}),t.next=7;break;case 5:return e.$message.error("请选择要导出报表任务！"),t.abrupt("return",!1);case 7:return t.next=9,h.a.post(e.$baseUrl+"dialog/exportDialogExcelFile.json",a);case 9:n=t.sent,s=n.data,r=s.resultMessageEnum,c=s.returnObject,l=s.errorInfoList,r===d.b?(e.multipleSelection=[],window.location.href=e.$baseUrl+"file/downloadFile.html?filePath="+c.filePath):e.$message.error(l[0].errorMessage);case 12:case"end":return t.stop()}},t,e)}))()},jumpDesc:function(e,t){this.dialogueDesc=t,o.a.$emit("contentTop",!1),this.openDesc=!0},returnBackToList:function(){this.dialogueDesc=null,o.a.$emit("contentTop",!0),this.openDesc=!1},changePage:function(e){var t=this;return l()(i.a.mark(function a(){return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.pagination.pageIndex=e,a.next=3,t.fetchList();case 3:case"end":return a.stop()}},a,t)}))()}},destroyed:function(){o.a.$emit("contentTop",!1)}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.isEmpty?a("div",{staticClass:"empty-div"},[a("div",{staticClass:"big-background-icon"}),e._v(" "),a("h3",[e._v("会话列表为空")]),e._v(" "),e._m(0)]):a("div",[e.openDesc?a("DialogueDesc",{attrs:{dialogueDesc:e.dialogueDesc},on:{"return-back":e.returnBackToList}}):a("div",{staticClass:"table table-main"},[a("div",{staticClass:"content-box-top"},[a("el-input",{staticClass:"search-input",attrs:{placeholder:"筛选关键词",clearable:""},on:{change:e.searchInputChange},nativeOn:{keyup:function(t){return t.type.indexOf("key")||13===t.keyCode?e.search(t):null}},model:{value:e.searchDialogueName,callback:function(t){e.searchDialogueName=t},expression:"searchDialogueName"}}),e._v(" "),a("div",{staticClass:"content-box-top-bottom"},[a("el-date-picker",{staticClass:"select-date",attrs:{type:"daterange",align:"left","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","prefix-icon":"el-icon-time"},model:{value:e.select_date,callback:function(t){e.select_date=t},expression:"select_date"}}),e._v(" "),a("el-select",{staticClass:"select-channel",attrs:{placeholder:"接入渠道"},model:{value:e.select_channel_name,callback:function(t){e.select_channel_name=t},expression:"select_channel_name"}},e._l(e.channelList,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})}),1),e._v(" "),a("el-button",{staticClass:"select-filter-btn",attrs:{type:"primary"},on:{click:e.filter}},[e._v("筛选")])],1)],1),e._v(" "),a("div",{staticClass:"table-out-header"},[a("h2",[e._v("会话列表")]),e._v(" "),a("el-button",{staticClass:"export-btn",attrs:{type:"primary"},on:{click:function(t){return e.exportFile()}}},[e._v("导出报表")])],1),e._v(" "),a("el-table",{staticClass:"table",attrs:{data:e.dialogueDataList,stripe:""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"deviceId",label:"设备ID",width:"200",sortable:"",formatter:e.defaultValue,fixed:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"dialogStartTime",label:"会话开始时间",formatter:e.formatTime,sortable:"",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"dialogEndTime",label:"会话结束时间",formatter:e.formatTime,sortable:"",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"speechcraftName",formatter:e.defaultValue,label:"话术名称",sortable:"",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"channelName",formatter:e.defaultValue,label:"接入渠道",sortable:"",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.jumpDesc(t.$index,t.row)}}},[e._v("详情")])]}}])})],1),e._v(" "),a("el-pagination",{staticClass:"pagination",attrs:{background:"",layout:"total, prev, pager, next,jumper",total:e.pagination.total,"page-size":e.pagination.pageSize},on:{"current-change":e.changePage}})],1)],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("请先去"),t("a",{attrs:{href:"/index.html#/speech"}},[this._v("我的话术")]),this._v("创建“智能设备方案”类型的话术模版，才能使用创建任务哦")])}]};var v=a("VU/8")(g,m,!1,function(e){a("6HuP")},"data-v-4a79f2a8",null);t.default=v.exports},HysK:function(e,t){},k7zp:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});a("GeYD");var n={props:["dialogueDesc"],components:{Audio:a("YKko").a},data:function(){return{recognitionContent:[],playAudioSource:"",viewPlaying:!1,channelStatus:"",channel:{dual:{source:""},seat:{enable:!0,source:""},client:{enable:!0,source:""}},showPlayer:!0}},methods:{channelSwitch:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return this.viewPlaying=!1,e&&(this.channel[e].enable=!this.channel[e].enable),this.showPlayer=!0,this.channel.seat.enable&&this.channel.client.enable?(this.playAudioSource=this.channel.dual.source,void(this.channelStatus="双声道开启")):this.channel.seat.enable?(this.playAudioSource=this.channel.seat.source,void(this.channelStatus="仅打开坐席声道")):this.channel.client.enable?(this.playAudioSource=this.channel.client.source,void(this.channelStatus="仅打开客户声道")):(this.showPlayer=!1,this.playAudioSource=null,void(this.channelStatus="暂无开启声道"))}},created:function(){this.channel.dual.source=this.dialogueDesc.allSoundPath,this.channel.seat.source=this.dialogueDesc.agentSoundPath,this.channel.client.source=this.dialogueDesc.userSoundPath,this.recognitionContent=JSON.parse(this.dialogueDesc.recognitionContent),this.channelSwitch()}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("p",{staticClass:"bread-crumbs"},[a("el-link",{staticClass:"return-back",attrs:{underline:!1,type:"primary"},on:{click:function(t){return e.$emit("return-back")}}},[e._v("任务列表")]),e._v(" "),a("em",[e._v("/")]),e._v(" "),a("span",[e._v("任务详情")])],1),e._v(" "),a("div",{staticClass:"recording-outer"},[a("section",[a("h3",[e._v("识别详情")]),e._v(" "),a("div",{staticClass:"dialogue-recording recording-box"},[a("header",[e._v("对话录音")]),e._v(" "),a("div",{staticClass:"recording-box-main dialogue-recording-bfc"},[a("div",{staticClass:"recording-left"},[a("p",[a("span",[e._v("当前状态：")]),e._v(" "),a("span",{staticClass:"play-status"},[e._v(e._s(e.channelStatus))])]),e._v(" "),a("div",[a("a",{staticClass:"btn seat-btn",attrs:{disabled:!e.channel.seat.enable},on:{click:function(t){return e.channelSwitch("seat")}}},[e._v("坐席通道")]),e._v(" "),a("a",{staticClass:"btn client-btn",attrs:{disabled:!e.channel.client.enable},on:{click:function(t){return e.channelSwitch("client")}}},[e._v("客户通道")])])]),e._v(" "),a("div",{staticClass:"recording-right"},[a("Audio",{staticClass:"audio",attrs:{file:e.playAudioSource}})],1)])]),e._v(" "),a("div",{staticClass:"dialogue-list recording-box"},[a("header",[e._v("对话录音")]),e._v(" "),a("div",{staticClass:"recording-box-main"},[a("ul",{staticClass:"dialogue-list-data"},[e._l(e.recognitionContent,function(t){return["Agent"===t.role?a("li",{staticClass:"seat-dialogue"},[a("i",{staticClass:"icon icon-robot"}),e._v(" "),a("span",{staticClass:"tip"},[e._v(e._s(t.text))])]):"User"===t.role?a("li",{staticClass:"client-dialogue"},[a("i",{staticClass:"icon icon-user"}),e._v(" "),a("span",{staticClass:"tip"},[e._v(e._s(t.text))])]):e._e()]})],2)])])])])])},staticRenderFns:[]};var r=a("VU/8")(n,s,!1,function(e){a("HysK")},"data-v-abe686d2",null);t.default=r.exports}});