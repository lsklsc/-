<template>
	<view class="record">
		<!-- 筛选 -->
		<view class="timeBtn">
			<view class="leftBtn">
				<view class="cont">
					<view class="txt">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view>{{date ? date : "登记时间"}}</view>
						</picker>
					</view>
					<view class="img">
						<image src="../../static/img/youjiantou.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view class="leftBtn">
				<view class="cont">
					<view class="txt">
						<picker @change="bindPickerChange" :value="index" :range="array" range-key="type_name">
							<view>{{typeName || '请选择垃圾类型'}}</view>
						</picker>
					</view>
					<view class="img">
						<image src="../../static/img/youjiantou.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view class="query">
				<view class="queryBtn" @click="queryBtn">查询</view>
			</view>
		</view>

		<!-- 列表 -->
		<view class="list">
			<!-- 标题 -->
			<view class="title-wrap">
				<view class="time">时间</view>
				<view class="type">垃圾类型</view>
				<view class="weight">重量</view>
			</view>
		</view>
		<view class="list" v-if="list.length">
			<!-- 标题 -->
			<view class="title-wrap" v-for="(i,index) in list" :key="index">
				<view class="time">{{i.create_time}}</view>
				<view class="type">{{i.type_name}}</view>
				<view class="weight">{{i.weight}}kg</view>
			</view>
		</view>
		<view style="text-align: center;line-height: 200rpx;color: #888;" v-else>暂无数据</view>
		
	</view>
</template>

<script>
	import utils from '@/common/utils.js'
	import rangeDatePick from '@/components/pyh-rdtpicker/pyh-rdtpicker.vue';
	export default {
		components: {rangeDatePick},
		data() {
			return {
				date: '',
				array: [],
				index: 0,
				typeName: "",
				type_id:'',
				org_id:'',
				list:[],
				params: {
					page: 1,
					page_size: 10,
				},
				count: '',
				totlePage: '',
				isShow: false,
			}
		},
		mounted() {
			this.rubbish_type()
			this.queryBtn()
		},
		onLoad(option) {
			this.org_id = JSON.parse(decodeURIComponent(option.org_id));
			console.log(option)
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.detail.value
				this.typeName = this.array[this.index].type_name
				this.type_id = this.array[this.index].type_id//垃圾类型id
				// console.log(this.array[this.index])
			},

			bindDateChange: function(e) {
				console.log(e)
				this.date = e.target.value
			},
			//查询按钮 责任主体清运记录
			queryBtn(){
				this.$showLoading()
				let data = {
					type_id: this.type_id,
					start_date: this.date,
					end_date: this.date,
				}
				this.$api.query_log(this.org_id,data).then(res => {
					console.log(res)
					// this.count = res.data.data.count;
					// this.list = res.data.data.results
					// this.list = this.list.concat(res.data.data.results)
					this.list = res.data.data.results
				}).catch(err => {
					uni.showToast({
						title: '请选择主题',
						icon:"none"
					})
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
				this.queryBtn()
			},
			//加载更多
			onReachBottom() {
				this.fenye()
			},
			//获取垃圾类型
			rubbish_type(){
				this.$showLoading()
				this.$api.rubbish_type().then(res => {
					if(res.data.code == 200){
						this.array = res.data.data
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.record {
		width: 100%;

		.list {
			padding: 0 30rpx;
			box-sizing: border-box;

			.title-wrap {
				width: 100%;
				height: 90rpx;
				display: flex;
				align-items: center;
				background-color: #F0F0F0;
				padding: 0 30rpx;
				margin: 20rpx 0;
				box-sizing: border-box;
				color: #333333;
				font-size: 28rpx;

				.time {
					flex: 2;
				}

				.type {
					flex: 1;
				}

				.weight {
					flex: 1;
					text-align: right;
				}
			}

			.item {
				width: 100%;
				height: 100rpx;
				border-bottom: 1rpx solid #F0F0F0;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #333333;
				font-weight: 600;

				.time {
					flex: 2;
					color: #2D2D2D;
					font-weight: normal;
				}

				.name {
					flex: 1;
				}

				.weight {
					flex: 1;
					text-align: right;
				}
			}
		}

		.timeBtn {
			width: 100%;
			height: 80rpx;
			background-color: #FFFFFF;
			box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.07);
			display: flex;
			.query{
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				.queryBtn{
					width: 180rpx;
					height: 60rpx;
					background-color: #00B079;
					text-align: center;
					display: flex;
					align-items: center;
					border-radius: 60rpx;
					text-align: center;
					color: #FFFFFF;
					justify-content: center;
				}
			}
			
			.leftBtn {
				display: flex;
				flex: 1;
				height: 80rpx;
				justify-content: center;
				line-height: 80rpx;

				.cont {
					display: flex;

					.txt {
						color: #888;
						font-weight: 400;
						font-size: 28rpx;
					}

					.img {
						box-sizing: border-box;
						padding-left: 10rpx;

						&>image {
							width: 20rpx;
							height: 18rpx;
							transform: rotate(90deg);
						}
					}
				}
			}
		}
	}
</style>
