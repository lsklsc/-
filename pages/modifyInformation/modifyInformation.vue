<template>
	<view class="modifyInformation">
		<!-- 修改个人信息头像 -->
		<view class="avatar-wrap">
			<view class="avatar" @click="upfile">
				<image src="../../static/1.jpg" mode="widthFix"></image>
				<view class="icons">
					<image src="../../static/img/xiugai.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!-- 修改个人信息内容 -->
		<view class="list-wrap">
			<view class="list">
				<view class="name">姓名</view>
				<view class="input-val">
					<input type="text" value="" placeholder="请输入姓名" />
				</view>
			</view>
			<view class="list">
				<view class="name">手机号</view>
				<view class="input-val">
					<input type="text" v-model="formdata.phone" placeholder="请输入您的新手机号" />
				</view>
				<view class="code" @click="getCode">
					<span v-show="coedeShow">{{text}}</span>
					<span v-show="!coedeShow">{{timer}}s</span>
				</view>
			</view>
			<view class="list">
				<view class="name">验证码</view>
				<view class="input-val">
					<input :type="seen ? type_text : type_password" value="" placeholder="请输入验证码" />
				</view>
				<view @click="seen=!seen">
					<image src="../../static/img/yj.png" mode="widthFix" style="width: 40rpx;height: 20rpx;"></image>
				</view>
			</view>
		</view>
		<!-- 保存 -->
		<view class="preservation">保存</view>
	</view>
</template>

<script>
	import utils from '@/common/utils.js'
	export default {
		data() {
			return {
				seen: true,
				type_text: "text",
				type_password: "password",
				coedeShow: true, // 判断显示那个按钮
				timer: 60, // 短信验证码倒计时
				text: "获取验证码",
				formdata: {
					phone: '',
					my_avatar: ''
				}
			}
		},
		methods: {
			getCode() {
				if (this.formdata.phone === '') {
					this.$showToast("请输入手机号", )
					return
				}
				if (utils.checkPhone(this.formdata.phone)) {
					this.coedeShow = false
					const authTimer = setInterval(() => {
						this.timer--
						if (this.timer <= 0) {
							this.coedeShow = true
							this.timer = 3
							clearInterval(authTimer)
							this.text = "重新获取验证码"
						}
					}, 1000)
				} else {
					this.$showToast("请输入合法的手机号")
				}
			},
			//头像修改
			upfile() {
				let _this = this;
				uni.chooseImage({ // 从本地相册选择图片或使用相机拍照。
					count: 1, //默认选择1张图片
					sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					success: (res) => {
						console.log(res.tempFilePaths[0]); //成功则返回图片的本地文件路径列表 tempFilePaths
						uni.uploadFile({ //将本地资源上传到开发者服务器
							url: baseURL + '/api/Common/upload', //接口地址
							filePath: res.tempFilePaths[0], //图片地址
							name: 'file',
							formData: {
								access_token: uni.getStorageSync('access_token'), //加入token
							},
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data)
								if (data.code == 1) {
									this.formdata.my_avatar = data.data.url; //上传成功后返回的图片地址
								}
							}
						});
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.modifyInformation {
		.preservation {
			width: 678rpx;
			height: 78rpx;
			background: #00B079;
			border-radius: 50rpx;
			margin: 300rpx auto;
			text-align: center;
			line-height: 78rpx;
			font-size: 28rpx;
			color: #FFFFFF;
		}

		width: 100%;

		.list-wrap {
			width: 100%;
			padding: 0 25rpx;
			box-sizing: border-box;

			.list {
				width: 100%;
				height: 100rpx;
				border-bottom: 1rpx solid #F0F0F0;
				display: flex;
				align-items: center;
				font-size: 28rpx;

				.name {
					padding-left: 12rpx;
					color: #2D2D2D;
				}

				.input-val {
					flex: 1;
					padding-left: 40rpx;

					&>input {
						color: #999999;
					}
				}

				.code {
					width: 174rpx;
					height: 60rpx;
					background: #00B079;
					border-radius: 200rpx;
					text-align: center;
					line-height: 60rpx;
					color: #FFFFFF;
					font-size: 22rpx;
				}
			}
		}

		.avatar-wrap {
			width: 700rpx;
			height: 224rpx;
			margin: 0 auto;
			border-bottom: 1rpx solid #F0F0F0;
			display: flex;
			align-items: center;
			justify-content: center;

			.avatar {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				position: relative;
				border: 1rpx solid #F0F0F0;

				&>image {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
				}

				.icons {
					width: 26rpx;
					height: 28rpx;
					position: absolute;
					right: 0;
					top: 100rpx;
					z-index: 99;
					right: 10rpx;

					&>image {
						width: 26rpx;
						height: 28rpx;
					}
				}
			}

			.avatar:after {
				content: "";
				width: 46rpx;
				height: 46rpx;
				background: #00B079;
				position: absolute;
				bottom: 0;
				right: 0rpx;
				border-radius: 50%;
			}
		}
	}
</style>
