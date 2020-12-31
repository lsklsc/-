<template>
	<view class="home">
		<!-- 切换企业 -->
		<view class="switch-wrap">
			<view class="name">欢迎{{userInfo.realname}}：</view>
			<view class="switch-body">
				<view class="switchBtn">
					<view class="picker">
						<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
							<view>{{orgObj.name || '请输入责任主体'}}</view>
						</picker>
					</view>
					<view class="img">
						<image src="../../static/img/youjiantou.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 时间 上传次数 -->
		<view class="user-name-time">
			<view class="time">
				<view class="right">
					<text>今天已上传清运信息</text>
					<text style="color: #00B079;font-size: 36rpx;">{{orgObj.today_record_count || 0}}</text>次
				</view>
			</view>
			<view class="frequency">{{timeDate}}</view>
		</view>
		<!-- 上传清运信息 -->
		<view class="content-wrap" @click="register">
			<view class="content">
				<image src="../../static/img/che.png" mode="widthFix"></image>
				<view class="txt">上传清运信息</view>
			</view>
		</view>
		<!-- menus -->
		<view class="menu">
			<view class="menu-item" @click="btnClik">
				<view class="cont">
					<image src="../../static/img/jilu.png" mode="widthFix"></image>
					<view class="text">查询清运记录</view>
				</view>
			</view>

			<view class="menu-item" v-for="(item,index) in menus" :key="index" @click="menuBtn(item)">
				<view class="cont">
					<image :src="item.src" mode="widthFix"></image>
					<view class="text">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					page: 1,
					page_size: 1000,
				},
				list: [],
				userInfo: {},
				array: [],
				index: 0,
				orgObj: {},
				timeDate: '', //当前时间
				timer: "", //定时器
				ifShow: false,
				menus: [
					// {
					// 	name: "查询清运记录",
					// 	src: "../../static/img/jilu.png",
					// 	url: "../record/record",
					// },
					{
						name: "个人信息",
						src: "../../static/img/myicon.png",
						url: "../information/information"
					}

				]
			}
		},
		onShow() {
			this.date()
			this.userInfo = uni.getStorageSync("userInfo")
			this.theme_down()
			
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.detail.value
				this.orgObj = this.array[this.index]
			},
			//责任主体下拉框
			theme_down() {
				this.$showLoading()
				this.$api.theme_down().then(res => {
					if (res.data.code == 200) {
						this.array = res.data.data
						if (res.data.data.length > 0) {
							this.orgObj = this.array[this.index]
						}
					}
				})
			},
			//垃圾清运登记
			register() {
				if (!this.orgObj.name) {
					uni.showModal({
						title: '提示',
						content: '该账号暂无责任主体，去创建责任主体',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: "/pages/register/register"
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					uni.navigateTo({
						url: '../clearancereg/clearancereg?org_id=' + encodeURIComponent(JSON.stringify(this.orgObj.id)) //传递责任主题id
					})
				}
			},
			menuBtn(item) { //menu菜单跳转
				uni.navigateTo({
					url: item.url
				})
			},
			btnClik() { //跳转查询查询运收记录
				if (!this.orgObj.name) {
					uni.showModal({
						title: '提示',
						content: '该账号暂无责任主体，去创建责任主体',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: "/pages/register/register"
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					uni.navigateTo({
						url: '../record/record?org_id=' + encodeURIComponent(JSON.stringify(this.orgObj.id)) //传递责任主题id
					})
				}
			},
			date() { //获取当前时间
				this.timer = setInterval(() => {
					var date = new Date();
					var year = date.getFullYear();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					var hour = date.getHours();
					var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes(); //过滤加0
					var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : '' + date.getSeconds(); //过滤加0
					this.timeDate = `${year}年${month}月${day}日${hour}:${minute}:${second}`;
				}, 1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		width: 100%;
		padding: 30rpx 20rpx;
		box-sizing: border-box;
		color: #666666;

		.switch-wrap {
			width: 100%;
			height: 60rpx;
			display: flex;
			align-items: center;

			.name {
				flex: 1;
				color: #333333;
				font-size: 40rpx;
				font-weight: 600;
			}

			.switch-body {
				flex: 1;

				.switchBtn {
					width: 300rpx;
					height: 60rpx;
					display: flex;
					align-items: center;
					text-align: center;
					float: right;
					background: #FFFFFF;
					border-radius: 17px;
					padding: 0 20rpx;
					box-sizing: border-box;
					border: 1rpx solid #EAEAEA;

					.picker {
						color: #333;
						font-size: 28rpx;
						flex: 1;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						z-index: 99;
					}

					.img {
						&>image {
							width: 12rpx;
							height: 20rpx;
							transform: rotate(90deg);
						}
					}
				}
			}
		}

		.menu {
			width: 100%;
			height: 108rpx;
			margin-top: 34rpx;
			display: flex;
			justify-content: space-between;

			.menu-item {
				width: 340rpx;
				height: 108rpx;
				background: linear-gradient(256deg, #18c1fe 0%, #44a4fe 100%);
				border-radius: 16rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.cont {
					display: flex;

					&>image {
						width: 50rpx;
						height: 44rpx;
					}

					.text {
						font-size: 32rpx;
						color: #FFFFFF;
						padding-left: 8rpx;
						box-sizing: border-box;
					}
				}
			}

			.item {
				background: linear-gradient(256deg, #15c3fe 0%, #44a5ff 100%);

				.cont {
					display: flex;

					&>image {
						width: 44rpx;
						height: 44rpx;
					}

					.text {
						font-size: 32rpx;
						color: #FFFFFF;
					}
				}

			}
		}

		.user-name-time {
			display: flex;
			width: 100%;
			height: 60rpx;
			margin-top: 10rpx;
			align-items: center;

			.time {
				flex: 1;
				font-size: 30rpx;
				line-height: 32rpx;
				text-align: left;

			}

			.frequency {

				flex: 1;
				font-size: 30rpx;
				margin-top: 8rpx;

				.right {
					float: right;
				}
			}
		}

		.content-wrap {
			width: 100%;
			height: 232rpx;
			background: linear-gradient(256deg, #2BC0CF 0%, #06D4CA 100%);
			border-radius: 16rpx;
			margin-top: 24rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.content {
				display: flex;

				&>image {
					width: 90rpx;
					height: 58rpx;
				}

				.txt {
					color: #FFFFFF;
					font-size: 36rpx;
					padding-left: 20rpx;
					box-sizing: border-box;
				}
			}
		}
	}

	// beforeDestroy() {
	// 	if (this.timer) {
	// 		clearInterval(this.timer); // 在Vue实例销毁前，清除定时器
	// 	} 
	// },
</style>
