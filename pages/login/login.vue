<template>
	<view class="content">
		<view class="bg">
			<view class="title">垃圾清运登记系统</view>
			<image src="../../static/wx.png" mode="widthFix"></image>
		</view>
		<!-- 登录 -->
		<view class="loginBox" v-if="!isRegister">
			<view class="iphon-input">
				<image src="../../static/img/ipone.png" mode="widthFix"></image>
				<input type="text" v-model="registerfrom.username" placeholder="请输入用户名" />
			</view>
			<view class="password-input">
				<image src="../../static/img/yanzhengma.png" mode="widthFix"></image>
				<input type="password" v-model="registerfrom.password" placeholder="请输入密码" />
				<!-- <view class="code">获取验证码</view> -->
			</view>
			<view class="checkoutBox">
				<label>
					<checkbox :checked='rememberPsw' @tap="rememberPsw =! rememberPsw" color="#09CC86" />
					<text class="text">记住账号密码</text>
				</label>
			</view>
			<!-- 登录按钮 -->
			<view class="login" @click="login">登录</view>
			<!-- 切换注册 -->
			<view class="register" @click="isRegister=true">暂无账号，点击<text>注册</text></view>
		</view>

		<!-- 注册 -->
		<view class="loginBox" v-if="isRegister">
			<view class="iphon-input" style="margin-bottom: 20rpx;">
				<image src="../../static/img/name.png" mode="widthFix" style="width: 30rpx;height: 30rpx;"></image>
				<input type="text" v-model="registerfrom.realname" placeholder="请输入姓名" />
			</view>
			<view class="iphon-input">
				<image src="../../static/img/ipone.png" mode="widthFix"></image>
				<input type="text" v-model="registerfrom.username" placeholder="请输入用户名" />
			</view>
			<view class="password-input">
				<image src="../../static/img/yanzhengma.png" mode="widthFix"></image>
				<input type="password" v-model="registerfrom.password" placeholder="请输入密码" />
				<!-- <view class="code">获取验证码</view> -->
			</view>
			<!-- 注册按钮 -->
			<view class="login" @click="registerBtn">注册</view>
			<!-- 切换登录 -->
			<view class="register" @click="isRegister=false">已有账号，点击<text>登录</text></view>
		</view>
		<!-- 版本号 -->
		<view class="version" v-if='version'>版本信息：V {{version.versionName}}</view>
		<!-- <view class="conte">
			<view class="bg">
				<view class="title">垃圾清运登记系统</view>
			</view>
			<view class="cont">
				<image src="../../static/wx.png" mode="widthFix"></image>
				<button class="button" open-type="getUserInfo" @getuserinfo="userInfo">
					<view class="btn-cont">
						<image src="../../static/iconWx.png" mode="widthFix"></image>
						<view>微信快捷登录</view>
					</view>
				</button>
				<button class="button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">账号密码登录</button>
			</view>
		</view> -->
	</view>
</template>

<script>
	import utils from '@/common/utils.js'
	export default {
		data() {
			return {
				isRegister: false, //注册登录显示
				version: '', //版本号
				registerfrom: { //注册
					username: "",
					password: "",
					realname: ""
				},
				rememberPsw: true,
			}
		},
		mounted() {
			//页面加载完成，获取本地存储的用户名及密码
			const username = uni.getStorageSync('username');
			const password = uni.getStorageSync('password');
			// console.log("22", username, password)
			if (username && password) {
				this.registerfrom.username = username;
				this.registerfrom.password = password;
			} else {
				this.registerfrom.username = "";
				this.registerfrom.password = "";
			}

		},
		methods: {
			//注册
			registerBtn() {
				let setData = [{
						name: '请输入用户名',
						value: this.registerfrom.username
					},
					{
						name: '请输入6~18位密码',
						value: this.registerfrom.password
					}
				];
				if (!utils.isEmpty(setData)) return;
				let reg = /^[0-9a-zA-Z]+$/;
				if (!reg.test(this.registerfrom.username)) {
					uni.showModal({
						title: '提示',
						content: '用户名只能输入数字或字符',
					});
					return;
				}
				if (this.registerfrom.username.length < 4) {
					uni.showModal({
						title: '提示',
						content: '用户名不能小于4个字符',
					});
					return;
				}
				if (this.registerfrom.password.length < 6 || this.registerfrom.password.length > 18) {
					uni.showModal({
						title: '提示',
						content: '密码不能小于6位大于18位',
					});
					return;
				}
				this.$showLoading()
				this.$api.registerUser(this.registerfrom).then(res => {
					this.$showToast("注冊成功")
				}).catch(err => {
					uni.hideLoading()
					if (err.data.code == 400) {
						uni.showModal({
							title: '提示',
							content: '用户名已存在',
						});
					}
				})
			},
			//登录
			login() {
				let setData = [{
						name: '请输入用户名',
						value: this.registerfrom.username
					},
					{
						name: '请输入6~18位密码',
						value: this.registerfrom.password
					}
				];
				if (!utils.isEmpty(setData)) return;
				this.$showLoading()
				this.$api.loginUser(this.registerfrom).then(res => {
					if (res.data.code == 200) {
						if (this.rememberPsw) { //用户勾选“记住密码”
							uni.setStorageSync('username', this.registerfrom.username);
							uni.setStorageSync('password', this.registerfrom.password);
						} else { //用户没有勾选“记住密码”
							uni.removeStorageSync('username');
							uni.removeStorageSync('password');
							this.registerfrom.username = "";
							this.registerfrom.password = "";
						}
						uni.setStorageSync("token", res.data.data.token)
						uni.setStorageSync("userInfo", res.data.data.user)
					} else {
						this.$showToast(res.data.msg)
					}
					uni.reLaunch({
						url: "../home/home"
					})
				}).catch(err => {
					uni.showModal({
						title: '提示',
						content: '账号或密码错误',
						success: function(res) {
							if (res.confirm) {} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				})
			},

			// getPhoneNumber(e){
			// 	console.log(e)
			// },
			// userInfo() { 
			// 	uni.login({
			// 		success: (res2) => {
			// 			uni.getUserInfo({
			// 				provider: 'weixin',
			// 				success: (info) => { //这里请求接口
			// 					console.log(res2);
			// 					console.log(info);
			// 				},
			// 				fail: () => {
			// 					uni.showToast("微信登录授权失败");
			// 				}
			// 			})
			// 		},
			// 		fail: () => {
			// 			uni.showToast("微信登录授权失败");
			// 		}
			// 	})
			// },
		},
		watch: { // app端监听版本信息
			"$store.state.version": {
				handler(newName, oldName) {
					if (newName) {
						this.version = JSON.parse(newName)
						console.log(this.version)
					}
				},
				immediate: true
			}
		},
	}
</script>

<style lang="scss" scoped>
	.checkoutBox {
		margin-top: 20rpx;
	}
	.checkoutBox /deep/ .uni-checkbox-input {
		border: 2px solid #00B079;
		border-radius: 50%;
		width: 38rpx;
		height: 38rpx;
	}
	.checkoutBox /deep/ .uni-checkbox:not([disabled]),
	.checkoutBox /deep/ .uni-checkbox-input:hover {
		border-color: #00B079;
	}
	.checkoutBox /deep/ .text {
		height: 36rpx;
		font-size: 32rpx;
		color: #999;
		line-height: 36rpx;
	}

	.content {
		width: 100%;

		.version {
			font-size: 26rpx;
			color: #000;
			position: fixed;
			bottom: 30rpx;
			left: 50%;
			transform: translateX(-50%);
		}

		.bg {
			width: 100%;
			height: 600rpx;
			background-color: #00B079;
			line-height: 62rpx;
			padding-top: 20rpx;
			box-sizing: border-box;
			position: relative;
			text-align: center;

			&>image {
				width: 652rpx;
				height: 360rpx;
				margin-top: 30rpx;
			}

			.title {
				font-size: 48rpx;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				position: relative;
			}

			.title:after {
				content: "";
				width: 16rpx;
				height: 16rpx;
				background-color: #FFC300;
				position: absolute;
				top: 30rpx;
				right: 145rpx;
			}

			.title:before {
				content: "";
				width: 16rpx;
				height: 16rpx;
				background-color: #FFC300;
				position: absolute;
				top: 30rpx;
				left: 145rpx;
			}
		}

		.loginBox {
			width: 100%;
			height: 600rpx;
			background: #FFFFFF;
			border-radius: 48rpx 48rpx 0px 0px;
			position: absolute;
			top: 530rpx;
			padding: 50rpx 40rpx 0 40rpx;
			box-sizing: border-box;

			.register {
				text-align: center;
				font-size: 28rpx;
				color: #666666;

				text {
					color: #00B079;
				}
			}

			.login {
				width: 528rpx;
				height: 84rpx;
				background: #00B079;
				border-radius: 64rpx;
				margin: auto;
				margin-top: 50rpx;
				margin-bottom: 20rpx;
				text-align: center;
				line-height: 84rpx;
				color: #FFFFFF;
			}

			.iphon-input {
				width: 100%;
				height: 60rpx;
				margin-top: 50rpx;
				border-bottom: 1rpx solid #C5C5C5;

				&>input {
					position: relative;
					padding-left: 50rpx;
					box-sizing: border-box;
				}

				&>image {
					width: 22rpx;
					height: 32rpx;
					position: absolute;
					left: 40rpx;
					margin-top: 8rpx;
				}

			}

			.password-input {
				margin-top: 50rpx;
				position: relative;
				height: 60rpx;
				border-bottom: 1rpx solid #C5C5C5;

				&>image {
					width: 30rpx;
					height: 32rpx;
					position: absolute;
					left: 0rpx;
					margin-top: 8rpx;
				}

				&>input {
					padding-left: 50rpx;
					box-sizing: border-box;
				}

				.code {
					width: 184rpx;
					height: 64rpx;
					background: #00B079;
					border-radius: 64px;
					text-align: center;
					line-height: 64rpx;
					color: #FFFFFF;
					position: absolute;
					top: -14rpx;
					font-size: 26rpx;
					right: 0;
				}
			}
		}
	}



	// .conte {
	// 	width: 100%;
	// 	height: 100vh;
	// 	background-image: url(../../static/bg.png);

	// 	.bg {
	// 		width: 100%;
	// 		height: 300rpx;
	// 		background-color: #00B079;
	// 		line-height: 62rpx;
	// 		padding-top: 62rpx;
	// 		box-sizing: border-box;
	// 		position: relative;

	// 		.title {
	// 			font-size: 48rpx;
	// 			font-weight: 500;
	// 			color: #FFFFFF;
	// 			text-align: center;
	// 			position: relative;
	// 		}

	// 		.title:after {
	// 			content: "";
	// 			width: 16rpx;
	// 			height: 16rpx;
	// 			background-color: #FFC300;
	// 			position: absolute;
	// 			top: 30rpx;
	// 			right: 145rpx;
	// 		}

	// 		.title:before {
	// 			content: "";
	// 			width: 16rpx;
	// 			height: 16rpx;
	// 			background-color: #FFC300;
	// 			position: absolute;
	// 			top: 30rpx;
	// 			left: 145rpx;
	// 		}
	// 	}

	// 	.cont {
	// 		text-align: center;

	// 		&>image {
	// 			width: 702rpx;
	// 			height: 410rpx;
	// 		}

	// 		.button {
	// 			width: 530rpx;
	// 			height: 86rpx;
	// 			margin-top: 80rpx;
	// 			background: none;
	// 			background-image: url(../../static/btnbg.png);
	// 			background-size: cover;
	// 			border: none !important;
	// 			color: #00B079;
	// 			outline: none;
	// 			font-size: 28rpx;
	// 			line-height: 86rpx;

	// 			.btn-cont {
	// 				display: flex;
	// 				align-items: center;
	// 				justify-content: center;

	// 				view {
	// 					padding-left: 10rpx;
	// 				}

	// 				&>image {
	// 					width: 38rpx;
	// 					height: 30rpx;
	// 				}
	// 			}

	// 		}

	// 		button::after {
	// 			border: none;
	// 		}
	// 	}
	// }
	
	//微信显示
	.checkoutBox /deep/ .wx-checkbox-input {
		border: 2px solid #00B079;
		border-radius: 50%;
		width: 38rpx;
		height: 38rpx;
	}
	.checkoutBox /deep/ .wx-checkbox:not([disabled]),
	.checkoutBox /deep/ .wx-checkbox-input:hover {
		border-color: #00B079;
	}
	.checkoutBox /deep/ text {
		height: 36rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666;
		line-height: 36rpx;
	}
</style>
