webpackJsonp([17],{Kr6x:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("GeYD"),a=["创建任务","新建话语","报表导出","管理任务","分配权限"],l={name:"baseform",data:function(){return{select_cate:"",select_word:"",settingVisible:!1,activeName:"first",roleTableData:[{num:1,name:"jiaosemingcheng",desc:"说明"}],checkAll:!1,checkedCities:["创建任务","新建话语"],cities:a,isIndeterminate:!0}},created:function(){i.a.$emit("contentTop",!0)},methods:{handleClick:function(){},search:function(){if(!this.select_word)return this.$message.error("请输入关键字！"),!1;this.cur_page=1,"recharge_record"==this.activeName?this.queryCashOrderList():this.queryConsumptionOrderList()},handleModify:function(e,t){this.$router.push("/account")},handleManagement:function(e,t){},handleStting:function(e,t){},handleCheckAllChange:function(e){this.checkedCities=e?a:[],this.isIndeterminate=!1},handleCheckedCitiesChange:function(e){var t=e.length;this.checkAll=t===this.cities.length,this.isIndeterminate=t>0&&t<this.cities.length}},destroyed:function(){i.a.$emit("contentTop",!1)}},c={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"content-box-top"},[n("el-input",{staticClass:"handle-input mr10",attrs:{clearable:"",placeholder:"筛选关键词"},model:{value:e.select_word,callback:function(t){e.select_word=t},expression:"select_word"}}),e._v(" "),n("el-button",{attrs:{type:"primary",icon:"search"},on:{click:e.search}},[e._v("搜索")]),e._v(" "),n("div",{staticClass:"content-box-top-right"},[n("el-button",{attrs:{type:"primary",icon:"el-icon-circle-plus-outline"}},[e._v("添加角色任务")])],1)],1),e._v(" "),n("div",{staticClass:"w-container"},[n("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[n("el-tab-pane",{attrs:{label:"角色权限",name:"first"}},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.roleTableData}},[n("el-table-column",{attrs:{prop:"num",label:"序号",width:"100"}}),e._v(" "),n("el-table-column",{attrs:{prop:"name",label:"角色名称"}}),e._v(" "),n("el-table-column",{attrs:{prop:"desc",label:"角色说明"}}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text"},on:{click:e.handleModify}},[e._v("修改信息")]),e._v(" "),n("el-button",{attrs:{type:"text"},on:{click:function(n){return e.handleManagement(t.$index,t.row)}}},[e._v("成员管理")]),e._v(" "),n("el-button",{attrs:{type:"text"},on:{click:function(t){e.settingVisible=!0}}},[e._v("权限设置")])]}}])})],1)],1),e._v(" "),n("el-tab-pane",{attrs:{label:"人员管理",name:"second"}})],1)],1),e._v(" "),n("el-dialog",{staticClass:"authenticationDialog",attrs:{title:"权限设置",visible:e.settingVisible,width:"600px"},on:{"update:visible":function(t){e.settingVisible=t}}},[n("div",[n("el-checkbox",{attrs:{indeterminate:e.isIndeterminate},on:{change:e.handleCheckAllChange},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v("全选")]),e._v(" "),n("div",{staticStyle:{margin:"15px 0"}}),e._v(" "),n("el-checkbox-group",{on:{change:e.handleCheckedCitiesChange},model:{value:e.checkedCities,callback:function(t){e.checkedCities=t},expression:"checkedCities"}},e._l(e.cities,function(t){return n("el-checkbox",{key:t,attrs:{label:t}},[e._v(e._s(t))])}),1)],1),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.settingVisible=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleStting(e.scope.$index,e.scope.row)}}},[e._v("确 定")])],1)])],1)},staticRenderFns:[]};var s=n("VU/8")(l,c,!1,function(e){n("k7Jh")},"data-v-ae1e2056",null);t.default=s.exports},k7Jh:function(e,t){}});