import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const vue = new Vue();
const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		hasLogin: false,
		userInfo: {},
		version:'',
		versionName:''
	},
	mutations: {
		updateVersion(state,data){
			state.version = data
		},
		// 登录
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
		},
		// 退出
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.clearStorageSync();
		},
	},
	actions: {
		// 获取用户信息
		async loginUse({state,commit}) {
			let res = null
			try {
				if (uni.getStorageSync('token')) {
					let id = uni.getStorageSync('user_id')
					res = await vue.$api.getUserInfo(id)
					if (res.data.code === 0) {
						commit('login', res.data.data)
					}
				}
			} catch (e) {
				// vue.$showModal('用户信息获取失败')
			}
		},
		// 退出登录
		logoutAction(context) {
			return new Promise((resolve, reject) => {
				context.commit('logout')
				resolve('退出成功');
			})
		},
	}
})

export default store
