<template>
	<view>
		<view class="list-wrap">
			<!-- 审核未通过显示 -->
			<view class="failed" v-if="item.status == 2">{{item.reason}}</view>

			<!-- 城市选择 -->
			<view class="regList">
				<view class="title">所在城市</view>
				<view class="picker">
					<picker @change="bindPickerChange" :value="cityIndex" :range="array" range-key="name">
						<view class="reg-input">{{item.city_name || '请选择所在的城市'}}</view>
					</picker>
				</view>
				<view class="img">
					<image src="../../static/img/youjiantou.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 所在区域 -->
			<view class="regList">
				<view class="title">所在区域</view>
				<view class="picker">
					<picker @change="bindPickerCoding" :value="areaIndex" :range="areaData" range-key="name">
						<view class="reg-input">{{item.area_name || '请选择所在的区域'}}</view>
					</picker>
				</view>
				<view class="img">
					<image src="../../static/img/youjiantou.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 所在街道 -->
			<view class="regList">
				<view class="title">所在街道</view>
				<view class="picker">
					<picker @change="bindPickerStreet" :value="streetIndex" :range="streetData" range-key="name">
						<view class="reg-input">{{item.street_name || '请选择所在的街道'}}</view>
					</picker>
				</view>
				<view class="img">
					<image src="../../static/img/youjiantou.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 所在社区 -->
			<view class="regList">
				<view class="title">所在社区</view>
				<view class="picker">
					<picker @change="bindPickerComm" :value="commIndex" :range="commData" range-key="name">
						<view class="reg-input">{{item.comm_name || '请选择所在的社区'}}</view>
					</picker>
				</view>
				<view class="img">
					<image src="../../static/img/youjiantou.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 企业名称 -->
			<view class="regList">
				<view class="title">企业名称</view>
				<view class="picker">
					<input type="text" v-model="item.name" placeholder="请填写企业名称" />
				</view>
			</view>
			<!-- 企业类型 -->
			<view class="regList">
				<view class="title">企业类型</view>
				<view class="picker">
					<picker @change="enterChange" :value="entIndex" :range="enterArr" range-key="name">
						<view>{{item.org_type_name || '请选择父企业'}}</view>
					</picker>
				</view>
				<view class="picker">
					<picker @change="chidrenenterChange" :value="chidrenentIndex" :range="chidrenenterArr" range-key="name">
						<view>{{item.org_sub_type_name || '请选择子企业'}}</view>
					</picker>
				</view>
				<view class="img">
					<image src="../../static/img/youjiantou.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 营业执照 -->
			<view class="title">营业执照</view>
			<view class="License" style="display: flex;">
				<image :src="image" @click="previewImg(image)" v-if="imageData.length == 0" mode="widthFix"></image>
				<robby-image-upload v-if="item.status === 2" v-model="imageData" @delete="deleteImage" @add="addImage" :limit="limitNumber"
				 :server-url="serverUrl" :file-key-name="fileKeyName" :form-data="formData">
				</robby-image-upload>
			</view>

			<!-- 修改 审核已经通过的企业显示修改与注销 1审核通过 -->
			<!-- <view class="submit" v-if="item.status === 1" @click="modifyUp">修改</view> -->
			<!-- 注销企业 -->
			<view class="cancellationBtn submit" v-if="item.status === 1" @click="cancellationBtn">注销</view>

			<!-- 提交按钮 审核未通过的企业显示提交与取消创建   注册显示提交 2是审核失败 -->
			<view class="submit" v-if="!item.status === 2" @click="submitBtn">提交</view>
			<view class="submit" v-if="item.status === 2" @click="anewSubmit">重新提交</view>
			<!-- 取消创建 -->
			<view class="cancellationBtn submit" v-if="item.status === 2" @click="cancelBtn">注销</view>

			<!-- mask遮罩 -->
			<view class="mask-wrap" v-if="isShow">
				<view class="content">
					<image src="../../static/img/bianxie.png" mode="widthFix"></image>
					<view class="text">审核中</view>
					<view style="color: #666666;font-size: 28rpx;">您提交的信息正在审核中</view>
					<view class="wellBtn" @click="wellBtn">好的</view>
				</view>
			</view>

		</view>
	</view>
</template>
<script>
	import robbyImageUpload from "../../components/robby-image-upload/robby-image-upload.vue"
	import utils from '@/common/utils.js'
	export default {
		components: {
			robbyImageUpload
		},
		data() {
			return {
				image: "",
				multiIndex: 0,
				item: {},
				array: [], //城市列表
				areaData: [], //所在区列表,
				streetData: [], //所在街道列表
				commData: [], //所在社区列表
				typeName: [], //企业类型
				orgData: [], //小区列表F
				enter: '', //企业名称
				enterArr: [], //企业列表
				entIndex: 0, //企业索引
				parent_id: null, //父级企业id
				chidrenentIndex: 0, //子级企业索引
				chidrenenterArr: [], //子级企业数据
				isShow: false, //mask遮罩显示隐藏
				// 图片上传
				enableDel: false,
				enableAdd: false,
				enableDrag: false,
				limitNumber: 1,
				imageData: [],
				fileKeyName: 'files',
				serverUrl: this.$api.uploadurl,
				formData: {
					files: ''
				},
				params: {
					page: 1,
					page_size: 1000,
				},
				cityIndex:0,
				areaIndex:0,
				streetIndex:0,
				commIndex:0
			}
		},
		onLoad(option) {
			try {
				let obj = JSON.parse(decodeURIComponent(option.item))
				this.item = { ...obj }
			} catch (e) {
				//TODO handle the exception
			}
			// console.log(this.item)
		},
		mounted() {
			this.themeCode('', 1)
			this.typeNames()
			this.theme_one()
		},
		methods: {
			
			//城市选择
			bindPickerChange(e) {
				console.log(e)
				this.cityIndex = e.detail.value
				this.item.city_name = this.array[this.cityIndex].name
				this.themeCode(this.array[this.cityIndex].coding, 2)
			},
			//所在区域选择
			bindPickerCoding(e) {
				if(this.areaIndex != e.detail.value){
					this.item.street_name = ''
					this.item.street_coding = ''
					this.item.comm_name = ''
					this.item.comm_coding = ''
					this.streetIndex = 0
					this.commIndex = 0
				}
				this.areaIndex = e.detail.value
				this.item.area_name = this.areaData[this.areaIndex].name
				this.item.area_coding = this.areaData[this.areaIndex].coding
				this.themeCode(this.areaData[this.areaIndex].coding, 3)
			},
			//所在街道选择
			bindPickerStreet(e) {
				if(this.streetIndex != e.detail.value){
					this.item.comm_name = ''
					this.item.comm_coding = ''
					this.commIndex = 0
				}
				this.streetIndex = e.detail.value
				this.item.street_name = this.streetData[this.streetIndex].name
				this.item.street_coding = this.streetData[this.streetIndex].coding
				this.themeCode(this.streetData[this.streetIndex].coding, 4)
			},
			//所在社区选择
			bindPickerComm(e) {
				this.commIndex = e.detail.value
				this.item.comm_name = this.commData[this.commIndex].name
				this.item.comm_coding = this.commData[this.commIndex].coding
				// console.log(this.commData)
				this.themeCode(this.commData[this.commIndex].coding, 5)
			},
			//父级企业选择
			async enterChange(e) {
				if(this.entIndex != e.detail.value){
					this.chidrenentIndex = ''
					this.item.org_sub_type_name = ''
					this.item.org_sub_type_id = ''
				}
				this.entIndex = e.detail.value;
				this.item.org_type_name = this.enterArr[this.entIndex].name;
				this.item.parent_id = this.enterArr[this.entIndex].org_type_id;
				this.item.org_type_id = this.enterArr[this.entIndex].org_type_id //父企业绑定uuid
				let data = {
					grade: 2,
					parent_id: this.item.parent_id
				}
				await this.$api.typeName(data).then(res => {
					console.log(res, "责任主体子类型")
					this.chidrenenterArr = res.data.data
				})
			},
			//子级企业确认
			chidrenenterChange(e) {
				this.chidrenentIndex = e.detail.value;
				this.item.org_sub_type_name = this.chidrenenterArr[this.chidrenentIndex].name;
				this.item.org_sub_type_id = this.chidrenenterArr[this.chidrenentIndex].org_type_id //子企业绑定uuid
			},
			//审核不通过重新提交
			anewSubmit() {
				// console.log(this.item.name)
				// return
				this.$showLoading()
				let data = {
					...this.item,
					name:this.item.name
				}
				this.$api.theme_put(this.item.id, data).then(res => {
					console.log(res)
					if (res.data.code == 200) {
						this.$showToast("提交成功")
						setTimeout(() => {
							uni.reLaunch({
								url: "/pages/home/home"
							})
						}, 1000)
					} else {
						uni.showToast({
							title: '提示',
							icon: "none"
						})
					}
				}).catch(err => {
					uni.showToast({
						title: err.data.msg,
						icon: "none"
					})
				})
			},
			//责任主体获取单条信息
			theme_one() {
				this.$showLoading()
				let id = this.item.id
				// console.log(id)
				this.$api.theme_one(id).then(res => {
					// console.log(res, 5678)
					if (res.data.code == 200) {
						this.image = res.data.data.license
						// console.log(this.image)
						this.item = { ...res.data.data }
						this.themeCode(this.item.city_coding, 2)
						this.themeCode(this.item.area_coding, 3)
						this.themeCode(this.item.street_coding, 4)
					
					}
				})
			},
			//预览单张图片
			previewImg(image){
				let imgsArray = [];
				imgsArray[0] = image;
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			},
			//查询行政编码
			themeCode(coding, num) {
				let data = {
					grade: num,
					coding_like: coding
				}
				this.$api.themeCode(data).then(res => {
					if (num == 1) this.array = res.data.data;
					if (num == 2) this.areaData = res.data.data;
					if (num == 3) this.streetData = res.data.data;
					if (num == 4) this.commData = res.data.data;
					if (num == 5) this.orgData = res.data.data;
				})
			},
			//获取责任主体类型
			typeNames() {
				let data = {
					grade: 1,
				}
				this.$api.typeName(data).then(res => {
					// console.log(res, "责任主体类型")
					this.enterArr = res.data.data
				})
			},
			//注销企业
			cancellationBtn() {
				uni.showModal({
					title: '您是否确认注销？',
					content: '注销之后责任主体下所有数据都将清空，不可找回',
					success: ress => {
						if (ress.confirm) {
							this.$showLoading()
							let id = this.item.id
							this.$api.theme_del(id).then(res => {
								if (res.data.code == 200) {
									uni.showToast({
										title: "注销成功",
										icon: "none"
									})
									this.theme_list()
									setTimeout(() => {
										uni.reLaunch({
											url: "/pages/home/home"
										})
									}, 1000)
								}
							})
						}
					}
				});
			},
			//获取主题列表
			theme_list() {
				let data = {
					page: this.params.page,
					page_size: this.params.page_size,
				}
				this.$api.theme_list(data).then(res => {

				})
			},
			//取消创建
			cancelBtn() {
				uni.showModal({
					content: '您是否确认取消？',
					success: ress => {
						if (ress.confirm) {
							this.$showLoading()
							let id = this.item.id
							this.$api.theme_del(id).then(res => {
								if (res.data.code == 200) {
									this.theme_list()
									uni.reLaunch({
										url: "/pages/home/home"
									})
								}
							})
						}
					}
				});
			},
			//修改企业
			modifyUp() {

			},
			//注册成功跳转首页
			wellBtn() {
				this.isShow = false
				uni.reLaunch({
					url: "../home/home"
				})
			},
			// 新增图片
			addImage(e) {
				this.imageData = e.allImages
				this.item.license = e.allImages[0]
				// console.log(this.imageData)
			},
			// 删除图片
			deleteImage(e) {
				// console.log(e);
			},
		}
	}
</script>

<style lang="scss" scoped>
	image {
		width: 150rpx;
		height: 150rpx;

		&>image {
			width: 100%;
			height: 100%;
		}
	}

	.list-wrap {
		width: 100%;
		padding: 15rpx 20rpx;
		box-sizing: border-box;

		.failed {
			width: 100%;
			padding: 8rpx 0;
			color: #FF6000;
			font-size: 28rpx;
			line-height: 55rpx;
			text-align: center;
			background: rgba(255, 162, 0, 0.2);
		}

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
			>image{
				width: 92rpx;
				height: 92rpx;
				margin-top: 14rpx;
			}
		}

		.submit {
			width: 678rpx;
			height: 78rpx;
			background: #00B079;
			margin: 30rpx auto;
			text-align: center;
			line-height: 78rpx;
			color: #FFFFFF;
			font-size: 28rpx;
			border-radius: 24px;
		}

		.cancellationBtn {
			background-color: #FF4400;
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
