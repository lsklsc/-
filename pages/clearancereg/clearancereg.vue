<template>
	<view class="register">
		<view class="list-wrap">
			<!-- 垃圾类型 -->
			<view class="regList">
				<view class="title">垃圾类型</view>
				<view class="picker">
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="type_name">
						<view class="reg-input">{{typeName || '请选择垃圾类型'}}</view>
					</picker>
				</view>
				<view class="img">
					<image src="../../static/img/youjiantou.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 垃圾重量 -->
			<view class="regList">
				<view class="title">垃圾重量</view>
				<view class="picker">
					<input type="text" v-model="registerData.weight" placeholder="请输入垃圾重量" />
				</view>
				<view style="font-size: 28rpx; color: #00B079;">kg</view>
			</view>
			<!-- 清运单位名称 -->
			<view class="regList">
				<view class="title">清运单位名称</view>
				<view class="picker">
					<input type="text" v-model="registerData.removal_unit" placeholder="请输入清运单位名称" />
				</view>
			</view>
			<!-- 清运单号 -->
			<view class="regList">
				<view class="title">清运单号(如有)</view>
				<view class="picker">
					<input type="text" v-model="registerData.removal_stream" placeholder="请输入清运单号" />
				</view>
			</view>
			<view class="submit" @click="submitBtn">上传登记</view>
		</view>
	</view>
</template>

<script>
	import utils from '@/common/utils.js'
	export default {
		data() {
			return {
				array: [],
				index: 0,
				typeName: "",
				org_id: '', //接收责任主题id
				registerData: {
					type_id: '',
					weight: '',
					removal_unit: '',
					removal_stream: '',
				},
			}
		},
		onLoad(option) {
			this.org_id = JSON.parse(decodeURIComponent(option.org_id));
			console.log(this.item, 123456)
		},
		mounted() {
			this.rubbish_type()
		},
		methods: {
			//垃圾类型选择change事件
			bindPickerChange: function(e) {
				this.index = e.detail.value
				this.typeName = this.array[this.index].type_name
				this.registerData.type_id = this.array[this.index].type_id
			},
			//上传登记提交
			submitBtn() {
				let setData = [{
						name: '请选择垃圾类型',
						value: this.registerData.type_id
					},
					{
						name: '请选择垃圾类型',
						value: this.typeName
					},
					{
						name: '请输入垃圾重量',
						value: this.registerData.weight
					},
					{
						name: '请输入清运单位名称',
						value: this.registerData.removal_unit
					},
				];
				if (!utils.isEmpty(setData)) return;
				this.$showLoading()
				this.$api.upRegister(this.org_id, this.registerData).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: "登记成功",
							icon: "none"
						})
					}
					setTimeout(() => {
						uni.navigateBack(1)
					}, 1000)
				}).catch(err => {
					// console.log(err)
					uni.showModal({
						title: '提示',
						content: '垃圾重量' + err.data.errors.weight[0],
						success: function(res) {
							if (res.confirm) {
								
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				})
			},
			//获取垃圾类型
			rubbish_type() {
				this.$showLoading()
				this.$api.rubbish_type().then(res => {
					if (res.data.code == 200) {
						this.array = res.data.data
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.list-wrap {
		width: 100%;
		padding: 15rpx 20rpx;
		box-sizing: border-box;

		.mask-wrap {
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 99;
			background: rgba(0, 0, 0, 0.6);
			display: flex;
			justify-content: center;
			align-items: center;

			.content {
				width: 580rpx;
				height: 586rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				text-align: center;
				padding-top: 90rpx;
				box-sizing: border-box;

				&>image {
					width: 114rpx;
					height: 156rpx;
				}

				.text {
					font-size: 36rpx;
					color: #333333;
					font-weight: 500;
				}

				.wellBtn {
					width: 394rpx;
					height: 78rpx;
					background: #00B079;
					border-radius: 48rpx;
					margin: 60rpx auto;
					text-align: center;
					line-height: 78rpx;
					color: #FFFFFF;
				}
			}
		}

		.License {
			font-size: 32rpx;
			color: #333333;
			font-weight: 400;
			margin-top: 30rpx;
		}

		.submit {
			width: 678rpx;
			height: 78rpx;
			background: #00B079;
			margin: 100rpx auto;
			text-align: center;
			line-height: 78rpx;
			color: #FFFFFF;
			font-size: 28rpx;
			border-radius: 24px;
		}

		.regList {
			width: 100%;
			display: flex;
			height: 100rpx;
			border-bottom: 1rpx solid #F0F0F0;
			align-items: center;
			font-size: 28rpx;

			.title {
				color: #2D2D2D;
			}

			.picker {
				flex: 2;
				color: #9A9A9A;
				padding-left: 20rpx;
				box-sizing: border-box;
			}

			.img {
				&>image {
					width: 12rpx;
					height: 20rpx;
					float: right;
				}
			}

		}
	}
</style>
