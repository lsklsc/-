import Vue from 'vue'
import App from './App'
import api from './common/api.js' //api接口
import store from './store/index.js'
// vuex
Vue.prototype.$store = store
Vue.config.productionTip = false

// 开启loading
Vue.prototype.$showLoading = (content = '加载中...') => {
	uni.showLoading({
		title: `${content}`,
		mask: true
	})
};

// 开启showToast
Vue.prototype.$showToast = (content = '') => {
	uni.showToast({
		title: `${content}`,
		icon: "none"
	})
};

// 静态图片
Vue.prototype.$img = (pic) => {
	return api.img + pic;
}
// api
Vue.prototype.$api = {
	...api
}

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
}) 
app.$mount()


