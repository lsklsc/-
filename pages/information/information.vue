<template>
	<view class="information">
		<!-- 个人信息 -->
		<view class="content-wrap">
			<view class="content">
				<view class="user-info">
					<view class="user-img">
						<image src="../../static/avatar.png" mode="widthFix"></image>
					</view>
					<view class="user-phone">
						<view class="user-phone-name">
							<view class="username">{{userInfo.realname}}</view>
							<view class="phone">{{userInfo.username}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- menus -->
		<view class="menu-wrap">
			<view class="menu">
				<view class="menu-item" v-for="(item,index) in menus" :key="index" @click="menuBtn(item)">
					<view class="user-img"><image :src="item.src" mode="widthFix"></image></view>
					<view class="text">{{item.name}}</view>
					<view class="icons"><image src="../../static/menu/jiantou.png" mode="widthFix"></image></view>
				</view>
			</view>
		</view>
		<view class="logiout" @click="logiout">退出</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				menus: [
					// {
					// 	name: "修改个人信息",
					// 	src: "../../static/menu/user.png",
					// 	url: "../modifyInformation/modifyInformation"
					// },
					{
						name: "责任主体信息",
						src: "../../static/menu/gs.png",
						url: "../subject/subject"
					}
				]
			}
		},
		mounted() {
			this.userInfo = uni.getStorageSync("userInfo")
		},
		methods: {
			logiout(){
				uni.showModal({
				    title: '提示',
				    content: '确认退出',
				    success: function (res) {
				        if (res.confirm) {
							uni.reLaunch({
								url:"../login/login"
							})
				            // uni.clearStorageSync('userInfo')
							uni.setStorageSync('token', '');
				        }
				    }
				});
			},
			menuBtn(item){//
				uni.navigateTo({
					url:item.url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.logiout{
		width: 600rpx;
		height: 80rpx;
		margin: 60rpx auto;
		background: #00B079;
		border-radius: 24px;
		text-align: center;
		line-height: 80rpx;
		color: #FFFFFF;
	}
	.menu-wrap{
		width: 100%;
		margin-top: 34rpx;
		padding: 0 34rpx;
		box-sizing: border-box;
		.menu-item{
			width: 100%;
			height: 100rpx;
			border-bottom: 1rpx solid #F0F0F0;
			display: flex;
			align-items: center;
			color: #333333;
			font-size: 28rpx;
			font-weight: 400;
			.user-img{
				&>image{
					width: 60rpx;
					height: 64rpx;
				}
			}
			.text{
				text-indent: 50rpx;
			}
			.icons{
				flex: 1;
				&>image{
					float: right;
					width: 38rpx;
					height: 34rpx;
				}
			}
		}
	}
	
	
	
	.content-wrap {
		width: 100%;
		height: 268rpx;
		background-color: #00B079;

		.content {
			width: 100%;
			height: 100%;
			padding: 0 50rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;

			.user-info {
				width: 100%;
				height: 150rpx;
				display: flex;

				.user-img {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;

					&>image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.user-phone {
					padding-left: 36rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					color: #FFFFFF;

					.user-phone-name {
						font-size: 28rpx;

						.username {
							font-size: 40rpx;
						}
					}
				}
			}
		}
	}
</style>
