webpackJsonp([30],{"16tZ":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={name:"baseform",data:function(){return{payVisible:!1,htmlContent:""}},created:function(){var t=this,e=this.$route.params.id;$.get(this.$baseUrl+"order/queryHtmlContent.json?cashOrderId="+e).then(function(e){"0000"==e.resultMessageEnum?$("#alipayContent").html(e.returnObject):t.$message.error(e.errorInfoList[0].errorMessage)})},methods:{}},s={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"w-container log-form"},[e("div",{attrs:{id:"alipayContent"}},[this._v("加载中...")])])])}]};var i=n("VU/8")(r,s,!1,function(t){n("2+ni")},"data-v-1d74f9f6",null);e.default=i.exports},"2+ni":function(t,e){}});