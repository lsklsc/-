(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/modifyInformation/modifyInformation"],{"2b08":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(n("3ece"));function o(e){return e&&e.__esModule?e:{default:e}}var r={data:function(){return{seen:!0,type_text:"text",type_password:"password",coedeShow:!0,timer:60,text:"获取验证码",formdata:{phone:"",my_avatar:""}}},methods:{getCode:function(){var e=this;if(""!==this.formdata.phone)if(a.default.checkPhone(this.formdata.phone)){this.coedeShow=!1;var t=setInterval((function(){e.timer--,e.timer<=0&&(e.coedeShow=!0,e.timer=3,clearInterval(t),e.text="重新获取验证码")}),1e3)}else this.$showToast("请输入合法的手机号");else this.$showToast("请输入手机号")},upfile:function(){var t=this;e.chooseImage({count:1,sizeType:["original","compressed"],success:function(n){console.log(n.tempFilePaths[0]),e.uploadFile({url:baseURL+"/api/Common/upload",filePath:n.tempFilePaths[0],name:"file",formData:{access_token:e.getStorageSync("access_token")},success:function(e){var n=JSON.parse(e.data);1==n.code&&(t.formdata.my_avatar=n.data.url)}})}})}}};t.default=r}).call(this,n("543d")["default"])},"53bb":function(e,t,n){"use strict";n.r(t);var a=n("9161"),o=n("ae97");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("903c");var c,u=n("f0c5"),i=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,"3e6b3c9a",null,!1,a["a"],c);t["default"]=i.exports},6125:function(e,t,n){"use strict";(function(e){n("74f4");a(n("66fd"));var t=a(n("53bb"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"903c":function(e,t,n){"use strict";var a=n("f74a"),o=n.n(a);o.a},9161:function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}));var o=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.seen=!e.seen})},r=[]},ae97:function(e,t,n){"use strict";n.r(t);var a=n("2b08"),o=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=o.a},f74a:function(e,t,n){}},[["6125","common/runtime","common/vendor"]]]);