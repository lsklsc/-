(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/reg/reg"],{1954:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("a34a"));a(n("3ece"));function a(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n,i,a,o,r){try{var c=e[o](r),s=c.value}catch(d){return void n(d)}c.done?t(s):Promise.resolve(s).then(i,a)}function r(e){return function(){var t=this,n=arguments;return new Promise((function(i,a){var r=e.apply(t,n);function c(e){o(r,i,a,c,s,"next",e)}function s(e){o(r,i,a,c,s,"throw",e)}c(void 0)}))}}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=function(){n.e("components/robby-image-upload/robby-image-upload").then(function(){return resolve(n("7d8f"))}.bind(null,n)).catch(n.oe)},h={components:{robbyImageUpload:m},data:function(){return{image:"",multiIndex:0,item:{},array:[],areaData:[],streetData:[],commData:[],typeName:[],orgData:[],enter:"",enterArr:[],entIndex:0,parent_id:null,chidrenentIndex:0,chidrenenterArr:[],isShow:!1,enableDel:!1,enableAdd:!1,enableDrag:!1,limitNumber:1,imageData:[],fileKeyName:"files",serverUrl:this.$api.uploadurl,formData:{files:""},params:{page:1,page_size:1e3},cityIndex:0,areaIndex:0,streetIndex:0,commIndex:0}},onLoad:function(e){try{var t=JSON.parse(decodeURIComponent(e.item));this.item=s({},t)}catch(n){console.log(n,123)}},mounted:function(){this.themeCode("",1),this.typeNames(),this.theme_one()},methods:{bindPickerChange:function(e){console.log(e),this.cityIndex=e.detail.value,this.item.city_name=this.array[this.cityIndex].name,this.themeCode(this.array[this.cityIndex].coding,2)},bindPickerCoding:function(e){this.areaIndex!=e.detail.value&&(this.item.street_name="",this.item.street_coding="",this.item.comm_name="",this.item.comm_coding="",this.streetIndex=0,this.commIndex=0),this.areaIndex=e.detail.value,this.item.area_name=this.areaData[this.areaIndex].name,this.item.area_coding=this.areaData[this.areaIndex].coding,this.themeCode(this.areaData[this.areaIndex].coding,3)},bindPickerStreet:function(e){this.streetIndex!=e.detail.value&&(this.item.comm_name="",this.item.comm_coding="",this.commIndex=0),this.streetIndex=e.detail.value,this.item.street_name=this.streetData[this.streetIndex].name,this.item.street_coding=this.streetData[this.streetIndex].coding,this.themeCode(this.streetData[this.streetIndex].coding,4)},bindPickerComm:function(e){this.commIndex=e.detail.value,this.item.comm_name=this.commData[this.commIndex].name,this.item.comm_coding=this.commData[this.commIndex].coding,this.themeCode(this.commData[this.commIndex].coding,5)},enterChange:function(e){var t=this;return r(i.default.mark((function n(){var a;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.entIndex!=e.detail.value&&(t.chidrenentIndex="",t.item.org_sub_type_name="",t.item.org_sub_type_id=""),t.entIndex=e.detail.value,t.item.org_type_name=t.enterArr[t.entIndex].name,t.item.parent_id=t.enterArr[t.entIndex].org_type_id,t.item.org_type_id=t.enterArr[t.entIndex].org_type_id,a={grade:2,parent_id:t.item.parent_id},n.next=8,t.$api.typeName(a).then((function(e){console.log(e,"责任主体子类型"),t.chidrenenterArr=e.data.data}));case 8:case"end":return n.stop()}}),n)})))()},chidrenenterChange:function(e){this.chidrenentIndex=e.detail.value,this.item.org_sub_type_name=this.chidrenenterArr[this.chidrenentIndex].name,this.item.org_sub_type_id=this.chidrenenterArr[this.chidrenentIndex].org_type_id},anewSubmit:function(){var t=this;this.$showLoading();var n=s(s({},this.item),{},{name:this.item.name});this.$api.theme_put(this.item.id,n).then((function(n){console.log(n),200==n.data.code?(t.$showToast("提交成功"),setTimeout((function(){e.reLaunch({url:"/pages/home/home"})}),1e3)):e.showToast({title:"提示",icon:"none"})})).catch((function(t){e.showToast({title:t.data.msg,icon:"none"})}))},theme_one:function(){var e=this;this.$showLoading();var t=this.item.id;this.$api.theme_one(t).then((function(t){200==t.data.code&&(e.image=t.data.data.license,console.log(e.image),e.item=s({},t.data.data),e.themeCode(e.item.city_coding,2),e.themeCode(e.item.area_coding,3),e.themeCode(e.item.street_coding,4))}))},themeCode:function(e,t){var n=this,i={grade:t,coding_like:e};this.$api.themeCode(i).then((function(e){1==t&&(n.array=e.data.data),2==t&&(n.areaData=e.data.data),3==t&&(n.streetData=e.data.data),4==t&&(n.commData=e.data.data),5==t&&(n.orgData=e.data.data)}))},typeNames:function(){var e=this,t={grade:1};this.$api.typeName(t).then((function(t){e.enterArr=t.data.data}))},cancellationBtn:function(){var t=this;e.showModal({title:"您是否确认注销？",content:"注销之后责任主体下所有数据都将清空，不可找回",success:function(n){if(n.confirm){t.$showLoading();var i=t.item.id;t.$api.theme_del(i).then((function(n){200==n.data.code&&(e.showToast({title:"注销成功",icon:"none"}),t.theme_list(),setTimeout((function(){e.reLaunch({url:"/pages/home/home"})}),1e3))}))}}})},theme_list:function(){var e={page:this.params.page,page_size:this.params.page_size};this.$api.theme_list(e).then((function(e){}))},cancelBtn:function(){var t=this;e.showModal({content:"您是否确认取消？",success:function(n){if(n.confirm){t.$showLoading();var i=t.item.id;t.$api.theme_del(i).then((function(n){200==n.data.code&&(t.theme_list(),e.reLaunch({url:"/pages/home/home"}))}))}}})},modifyUp:function(){},wellBtn:function(){this.isShow=!1,e.reLaunch({url:"../home/home"})},addImage:function(e){this.imageData=e.allImages,this.item.license=e.allImages[0],console.log(this.imageData)},deleteImage:function(e){}}};t.default=h}).call(this,n("543d")["default"])},"277b":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return i}));var i={robbyImageUpload:function(){return n.e("components/robby-image-upload/robby-image-upload").then(n.bind(null,"7d8f"))}},a=function(){var e=this,t=e.$createElement;e._self._c},o=[]},"38a9":function(e,t,n){"use strict";n.r(t);var i=n("277b"),a=n("d12b");for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("e892");var r,c=n("f0c5"),s=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"ba911664",null,!1,i["a"],r);t["default"]=s.exports},"46b0":function(e,t,n){},"5bf5":function(e,t,n){"use strict";(function(e){n("74f4");i(n("66fd"));var t=i(n("38a9"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},d12b:function(e,t,n){"use strict";n.r(t);var i=n("1954"),a=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=a.a},e892:function(e,t,n){"use strict";var i=n("46b0"),a=n.n(i);a.a}},[["5bf5","common/runtime","common/vendor"]]]);