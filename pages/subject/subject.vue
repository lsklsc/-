<template>
	<view class="subject-wrap">
		<view class="subject">
			<!-- 我的企业 title -->
			<view class="subject-title">
				<view class="img">
					<image src="../../static/menu/gs.png" mode="widthFix"></image>
				</view>
				<view class="title">我的企业</view>
			</view>
			<!-- 企业列表 -->
			<view class="subject-item" v-for="(item,index) in list" :key="index" @click="subjectClick(item)">
				<view class="name">{{item.name}}</view>
				<view class="examine" :style="item.status==0?'color:#00B079':item.status==1?'':item.status==2?'color:#FF5454':''">
					<!-- {{item.status==0?'审核中':item.status==1?'':item.status==2?'审核失败':''}} -->
					{{filterStatus(item.status)}}
				</view>
				<view class="icons" :class="item.status==0?'display':'icons'">
					<image src="../../static/img/youjiantou.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view style="height: 200rpx;color: #666;text-align: center;" v-show="isShow">没有更多数据啦！</view>
		<!-- 创建新企业 -->
		<view class="establishBtn" @click="establishBtn">创建新企业</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				params: {
					page: 1,
					page_size: 10,
				},
				count: '',
				totlePage: '',
				isShow: false,
			}
		},
		onLoad() {
			this.theme_list()
		},
		methods: {
			subjectClick(item) {
				//责任主体状态 0-待审核 1-审核通过 2-审核失败 3-注销
				if (item.status == 1) {
					uni.navigateTo({
						url: "../reg/reg?item=" + encodeURIComponent(JSON.stringify(item)) //审核通过
					})
					uni.setNavigationBarTitle({//跳转改变标题
					　　title:"主题详情"
					})
				}
				if (item.status == 2) {
					uni.navigateTo({
						url: "../reg/reg?item=" + encodeURIComponent(JSON.stringify(item)) //审核失败
					})
				}
			},

			//获取主题列表
			theme_list() {
				let data = {
					page: this.params.page,
					page_size: this.params.page_size,
				}
				this.$showLoading()
				this.$api.theme_list(data).then(res => {
					this.count = res.data.data.count;
					// this.list = res.data.data.results
					this.list = this.list.concat(res.data.data.results)
					console.log(res)
				})
			},
			fenye() {
				this.totlePage = Math.ceil(this.count / this.params.page_size);
				if (this.params.page >= this.totlePage) {
					this.isShow = true
					return;
				}
				this.showTxt = '加载中...';
				this.params.page++;
				this.theme_list()
			},
			//加载更多
			onReachBottom() {
				this.fenye()
			},
			//创建新企业
			establishBtn() {
				// console.log(1)
				uni.navigateTo({
					url: "../register/register"
				})
				
			},
			filterStatus(val) {
				if (val == 0) return "待审核";
				if (val == 1) return "";
				if (val == 2) return "审核不通过";
				// if (val == 3) return "注销";
			}
		}
	}
</script>

<style lang="scss" scoped>
	.establishBtn {
		width: 90%;
		height: 80rpx;
		background: #00B079;
		border-radius: 50rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		line-height: 80rpx;
		text-align: center;
		// margin: 120rpx auto;
		position: fixed;
		bottom: 30rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.subject-wrap {
		width: 100%;
		height: 100%;
		padding: 25rpx;
		background-color: #F4F4F4;
		box-sizing: border-box;



		.subject {
			width: 100%;
			padding: 10rpx 0;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 3px;
			font-size: 34rpx;
			color: #2D2D2D;

			.subject-item {
				width: 100%;
				height: 130rpx;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #ECECEC;
				padding: 0 20rpx;
				box-sizing: border-box;

				.name {
					flex: 1;
				}

				.examine {
					flex: 1;
					text-indent: 80rpx;
				}

				.icons {
					&>image {
						width: 18rpx;
						height: 28rpx;
					}
				}
			}

			.subject-item:last-child {
				border-bottom: none;
			}
		}

		.subject-title {
			width: 100%;
			height: 80rpx;
			border-bottom: 1rpx solid #ECECEC;
			display: flex;
			box-sizing: border-box;
			align-items: center;
			padding: 0 20rpx;

			.img {
				width: 52rpx;
				height: 58rpx;

				&>image {
					width: 52rpx;
					height: 58rpx;
				}
			}

			.title {
				padding-left: 18rpx;
				font-size: 35rpx;
			}
		}

		.display {
			display: none;
		}
	}
</style>
