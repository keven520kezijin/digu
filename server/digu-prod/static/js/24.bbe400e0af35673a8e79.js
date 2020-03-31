webpackJsonp([24],{UsXu:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("mvHQ"),o=s.n(r),a=s("VI/i"),i=s.n(a),l={data:function(){return{codeValid:!1,passwordType:"password",passwordClass:"",checked:!1,img_code_src:"",banners:[{src:"common-static/img/img1-blue.png"},{src:"common-static/img/img2-blue.png"},{src:"common-static/img/img3-blue.png"}],ruleForm:{username:"",password:"",img_code:""},rules:{username:[{required:!0,message:"手机号不能为空！",trigger:"blur"},{validator:function(e,t,s){0==/^1[345678]\d{9}$/.test(t)?s(new Error("请输入11位手机号！")):s()},trigger:"blur"}],password:[{required:!0,message:"密码不能为空！",trigger:"change"}]},errors:{username:"",errorMsg:!1}}},mounted:function(){var e=localStorage.getItem("ms_pass"),t=localStorage.getItem("loginName");t&&(this.ruleForm.username=t),localStorage.getItem("checked")&&e&&(this.checked=!0,this.submitAjax()),this.autoSize(),window.onresize=this.autoSize},methods:{autoSize:function(){var e=document.documentElement.clientHeight,t=e<600?"600":e,s=780*t/1024;$(".login-wrap,.login-left,.login-right").css("height",t),$(".login-left").css("width",s),$(".login-right").css("marginLeft",s)},setCookie:function(e,t,s){var r=new Date;r.setTime(r.getTime()+864e5*s),window.document.cookie="userName="+e+";path=/;expires="+r.toGMTString(),window.document.cookie="userPwd="+t+";path=/;expires="+r.toGMTString()},getCookie:function(){if(document.cookie.length>0)for(var e=document.cookie.split("; "),t=0;t<e.length;t++){var s=e[t].split("=");"userName"==s[0]?this.ruleForm.username=s[1]:"userPwd"==s[0]&&(this.ruleForm.password=s[1])}},clearCookie:function(){this.setCookie("","",-1)},handleChange:function(){localStorage.removeItem("ms_pass")},showPassword:function(e){var t=localStorage.getItem("ms_pass");if(!this.checked&&t)return!1;"text"===this.passwordType?(this.passwordType="password",this.passwordClass=""):(this.passwordType="text",this.passwordClass="active")},submitForm:function(e){var t=this;this.$nextTick(function(){t.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.submitAjax()})})},submitAjax:function(){var e=this,t=i.a.createHash("md5");t.update(this.ruleForm.password);var s=t.digest("hex"),r=localStorage.getItem("ms_pass");r&&(s=r);var a={loginName:this.ruleForm.username,password:s};if(this.codeValid){if(!this.ruleForm.img_code)return this.$message.error("请输入图片验证码！"),!1;a.pictureCode=this.ruleForm.img_code}$.post(this.$baseUrl+"member/loginByAccountName.json",o()(a)).then(function(t){"0000"==t.resultMessageEnum?(e.checked?(localStorage.setItem("checked",!0),localStorage.setItem("ms_pass",s)):(localStorage.removeItem("ms_pass"),localStorage.removeItem("checked")),e.$store.dispatch("setUserInfoData",t.returnObject),localStorage.setItem("ms_username",t.returnObject.loginPromptName),localStorage.setItem("loginName",t.returnObject.loginName),e.queryMemberDetail()):"000118"==t.resultMessageEnum?e.errors.errorMsg=!0:"000110"==t.resultMessageEnum?e.codeValid=!0:(localStorage.removeItem("ms_pass"),e.$message.error(t.errorInfoList[0].errorMessage))})},queryMemberDetail:function(){var e=this,t=this.$baseUrl+"common/showPictureFile.html?pictureFileName=",s="",r="";$.get(this.$baseUrl+"member/queryMemberDetail.json").then(function(a){if("0000"==a.resultMessageEnum){var i=a.returnObject;s=i.contactName||i.enterpriseName||i.accountName,r=t+i.avatarPath,localStorage.setItem("USER_ROLE",i.role),localStorage.setItem("USER_INFO",o()(i))}else e.$message.error(a.errorInfoList[0].errorMessage);localStorage.setItem("GLOBAL_NAME",s),localStorage.setItem("GLOBAL_HEAD",r),e.$router.push("/")}).fail(function(t){localStorage.setItem("GLOBAL_NAME",s),localStorage.setItem("GLOBAL_HEAD",r),e.$router.push("/")})},getPictureCodeFile:function(){this.img_code_src=this.$baseUrl+"common/getPictureCodeFile.html?pictureCheckType=102"}}},n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login-wrap log-form"},[s("div",{staticClass:"login-left"},[[s("el-carousel",{attrs:{height:"100%"}},e._l(e.banners,function(e,t){return s("el-carousel-item",{key:t},[s("img",{staticClass:"banner",attrs:{src:e.src,alt:""}})])}),1),e._v(" "),e._m(0)]],2),e._v(" "),s("div",{staticClass:"login-right"},[s("div",{staticClass:"login-right-body"},[s("h3",{staticClass:"login-top-text"},[e._v("Log in")]),e._v(" "),e._m(1),e._v(" "),s("el-form",{ref:"ruleForm",staticClass:"ms-content",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"0px"}},[e.errors.errorMsg?s("div",{staticClass:"login_error el-form-item__error"},[e._v("该手机号尚未注册，"),s("a",{attrs:{href:"#/registered"}},[e._v("点击注册")]),e._v("。")]):e._e(),e._v(" "),s("el-form-item",{attrs:{prop:"username"}},[s("el-input",{attrs:{placeholder:"手机号"},model:{value:e.ruleForm.username,callback:function(t){e.$set(e.ruleForm,"username",t)},expression:"ruleForm.username"}},[s("i",{staticClass:"iconfont icon-ico_account",attrs:{slot:"prefix"},slot:"prefix"})])],1),e._v(" "),s("el-form-item",{attrs:{prop:"password"}},[s("el-input",{attrs:{placeholder:"密码",type:e.passwordType},on:{change:e.handleChange},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitForm("ruleForm")}},model:{value:e.ruleForm.password,callback:function(t){e.$set(e.ruleForm,"password",t)},expression:"ruleForm.password"}},[s("i",{staticClass:"w_ico_password",attrs:{slot:"prefix"},slot:"prefix"}),e._v(" "),s("i",{staticClass:"el-input__icon iconfont icon-ico_invisible",class:e.passwordClass,attrs:{slot:"suffix"},on:{click:function(t){return e.showPassword("password")}},slot:"suffix"})])],1),e._v(" "),s("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.codeValid,expression:"codeValid"}],attrs:{prop:"img_code"}},[s("el-input",{attrs:{placeholder:"图形密码"},model:{value:e.ruleForm.img_code,callback:function(t){e.$set(e.ruleForm,"img_code",t)},expression:"ruleForm.img_code"}},[s("i",{staticClass:"w_ico_security_checked",attrs:{slot:"prefix"},slot:"prefix"}),e._v(" "),s("i",{staticClass:"w_img_code",attrs:{slot:"suffix"},on:{click:function(t){return e.changeImgCode()}},slot:"suffix"},[s("img",{attrs:{src:e.img_code_src,alt:""}})])])],1),e._v(" "),s("div",{staticClass:"login-footer"},[s("el-checkbox",{model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[e._v("记住密码")]),e._v(" "),s("a",{staticClass:"forget_password",attrs:{href:"#/forgetpassword"}},[e._v("忘记密码？")])],1),e._v(" "),s("div",{staticClass:"login-btn"},[s("el-form-item",[s("div",{staticClass:"login-btn-left"},[s("a",{attrs:{href:"#/registered"}},[e._v("注册新帐号")])]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("登录")])],1)],1)],1)],1),e._v(" "),s("div",{staticClass:"reserved"},[e._v("\n            © 2018 Unisound.com. All rights reserved \n        ")])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"logo-text"},[t("span",{staticClass:"a"},[this._v("Welcome !")]),this._v(" "),t("span",{staticClass:"b"},[t("img",{attrs:{alt:""}})])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"login-top-logo"},[t("img",{attrs:{alt:""}})])}]};var c=s("VU/8")(l,n,!1,function(e){s("mlqr")},"data-v-48c55647",null);t.default=c.exports},mlqr:function(e,t){}});