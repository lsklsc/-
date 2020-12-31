import http from './request/interface'

let baseurl = null;
if (process.env.NODE_ENV === 'development') { //开发环境
	// baseurl = 'https://org.ztbory.com'; //正式  立超
	baseurl = 'https://dev-org.ztbory.com'; //测试  立超
	// baseurl = 'http://172.16.1.3:8399'; //本地  立超
} else { //生产环境
	// baseurl = 'https://org.ztbory.com'; //正式  立超
	baseurl = 'https://dev-org.ztbory.com'; //测试  立超
	// baseurl = 'http://172.16.1.3:8399'; //本地  立超
}

http.config.baseUrl = baseurl;
const token = uni.getStorageSync('token');
//下面这些API方法不需要验证token
let filterApi = [
	'/v1/register',
	'/v1/login/',
	'/v1/upload/'
]
//设置请求前拦截器
http.interceptor.request = (config) => {
	// 过滤掉不需要验证的token的路由api
	let url = config.url;
	let exist = filterApi.every(n => {
		let value = url.indexOf(n);
		if (value < 0) {
			return true
		}
		return false;
	})
	config.header = {
		'Authorization': 'Token ' + uni.getStorageSync('token')
	}
	if (!exist) {
		//添加通用参数
		config.header = {
			"Content-Type": "application/json",
		}
	}
}
//设置请求结束后拦截器
http.interceptor.response = (response) => {
	// console.log(response)
	uni.hideLoading();
	//判断返回状态 执行相应操作
	return response;
}

const api = {
	// 基础url
	baseurl,
	// 图片上传接口
	uploadurl: baseurl + '/v1/upload/',
	//账户注册
	registerUser(data) {
		return http.post('/v1/register/', data);
	},
	//账户登录
	loginUser(data) {
		return http.post('/v1/login/', data);
	},
	//查询责任主体类型
	typeName(data) {
		return http.get('/v1/org_type/', data);
	},
	//查询行政编码
	themeCode(data) {
		return http.get('/v1/region/', data);
	},
	//责任主体创建
	themeSet(data) {
		return http.post('/v1/organization/', data);
	},
	//查询垃圾类型
	rubbish_type(data) {
		return http.get('/v1/rubbish_type/', data);
	},
	//获取主题列表
	theme_list(data) {
		return http.get('/v1/organization/', data);
	},
	//责任主体下拉框
	theme_down(data) {
		return http.get('/v1/organization/selection/', data);
	},
	//责任主体获取单条信息
	theme_one(id,data) {
		return http.get('/v1/organization/' + id + '/', data);
	},
	//责任主体清运登记
	upRegister: (id, data) => {
		return http.post('/v1/organization/' + id + '/record/', data);
	},
	//责任主体注销单条信息
	theme_del: (id, data) => {
		return http.delete('/v1/organization/' + id + '/', data);
	},
	//责任主体清运记录
	query_log: (id, data) => {
		return http.get('/v1/organization/' + id + '/record/', data);
	},
	//修改主题
	theme_put: (id, data) => {
		return http.put('/v1/organization/' + id + '/', data);
	},
	//版本更新
	version(data) {
		return http.get('/v1/version/', data);
	},
}

export default api
