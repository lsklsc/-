(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"31e8":function(e,t,r){"use strict";var s;r.d(t,"b",(function(){return n})),r.d(t,"c",(function(){return o})),r.d(t,"a",(function(){return s}));var n=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.rememberPsw=!e.rememberPsw},e.e1=function(t){e.isRegister=!0},e.e2=function(t){e.isRegister=!1})},o=[]},4820:function(e,t,r){"use strict";r.r(t);var s=r("31e8"),n=r("6287");for(var o in n)"default"!==o&&function(e){r.d(t,e,(function(){return n[e]}))}(o);r("4a33");var a,i=r("f0c5"),u=Object(i["a"])(n["default"],s["b"],s["c"],!1,null,"0ffcd364",null,!1,s["a"],a);t["default"]=u.exports},"4a33":function(e,t,r){"use strict";var s=r("6027"),n=r.n(s);n.a},6027:function(e,t,r){},6287:function(e,t,r){"use strict";r.r(t);var s=r("c64c"),n=r.n(s);for(var o in s)"default"!==o&&function(e){r.d(t,e,(function(){return s[e]}))}(o);t["default"]=n.a},c64c:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=n(r("3ece"));function n(e){return e&&e.__esModule?e:{default:e}}var o={data:function(){return{isRegister:!1,version:"",registerfrom:{username:"",password:"",realname:""},rememberPsw:!0}},mounted:function(){var t=e.getStorageSync("username"),r=e.getStorageSync("password");t&&r?(this.registerfrom.username=t,this.registerfrom.password=r):(this.registerfrom.username="",this.registerfrom.password="")},methods:{registerBtn:function(){var t=this,r=[{name:"请输入用户名",value:this.registerfrom.username},{name:"请输入6~18位密码",value:this.registerfrom.password}];if(s.default.isEmpty(r)){var n=/^[0-9a-zA-Z]+$/;n.test(this.registerfrom.username)?this.registerfrom.username.length<4?e.showModal({title:"提示",content:"用户名不能小于4个字符"}):this.registerfrom.password.length<6||this.registerfrom.password.length>18?e.showModal({title:"提示",content:"密码不能小于6位大于18位"}):(this.$showLoading(),this.$api.registerUser(this.registerfrom).then((function(e){t.$showToast("注冊成功")})).catch((function(t){e.hideLoading(),400==t.data.code&&e.showModal({title:"提示",content:"用户名已存在"})}))):e.showModal({title:"提示",content:"用户名只能输入数字或字符"})}},login:function(){var t=this,r=[{name:"请输入用户名",value:this.registerfrom.username},{name:"请输入6~18位密码",value:this.registerfrom.password}];s.default.isEmpty(r)&&(this.$showLoading(),this.$api.loginUser(this.registerfrom).then((function(r){200==r.data.code?(t.rememberPsw?(e.setStorageSync("username",t.registerfrom.username),e.setStorageSync("password",t.registerfrom.password)):(e.removeStorageSync("username"),e.removeStorageSync("password"),t.registerfrom.username="",t.registerfrom.password=""),e.setStorageSync("token",r.data.data.token),e.setStorageSync("userInfo",r.data.data.user)):t.$showToast(r.data.msg),e.reLaunch({url:"../home/home"})})).catch((function(t){e.showModal({title:"提示",content:"账号或密码错误",success:function(e){e.confirm||e.cancel&&console.log("用户点击取消")}})})))}},watch:{"$store.state.version":{handler:function(e,t){e&&(this.version=JSON.parse(e),console.log(this.version))},immediate:!0}}};t.default=o}).call(this,r("543d")["default"])},d5dc:function(e,t,r){"use strict";(function(e){r("74f4");s(r("66fd"));var t=s(r("4820"));function s(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,r("543d")["createPage"])}},[["d5dc","common/runtime","common/vendor"]]]);