<template>
	<view>
		<view class="list-wrap">
			<!-- 城市选择 -->
			<view class="regList">
				<view class="title">所在城市</view>
				<view class="picker">
					<picker @change="bindPickerChange" :value="cityIndex" :range="array" range-key="name">
						<view class="reg-input">{{regName.city_name || '请选择所在的城市'}}</view>
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
						<view class="reg-input">{{regName.area_name || '请选择所在的区域'}}</view>
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
						<view class="reg-input">{{regName.street_name || '请选择所在的街道'}}</view>
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
						<view class="reg-input">{{regName.comm_name || '请选择所在的社区'}}</view>
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
					<input type="text" v-model="regData.name" placeholder="请填写企业名称" />
				</view>
			</view>
			<!-- 企业类型 -->
			<view class="regList">
				<view class="title">企业类型</view>
				<view class="picker">
					<picker @change="enterChange" :value="entIndex" :range="enterArr" range-key="name">
						<view>{{regName.enter || '请选择父企业'}}</view>
					</picker>
				</view>
				<view class="picker">
					<picker @change="chidrenenterChange" :value="chidrenentIndex" :range="chidrenenterArr" range-key="name">
						<view>{{regName.chidrenName || '请选择子企业'}}</view>
					</picker>
				</view>
				<view class="img">
					<image src="../../static/img/youjiantou.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 营业执照 -->
			<view class="License">
				<view class="title">营业执照</view>
				<robby-image-upload v-model="imageData" @delete="deleteImage" @add="addImage" :limit="limitNumber" :server-url="serverUrl"
				 :file-key-name="fileKeyName" :form-data="formData">
				</robby-image-upload>
			</view>
			<view class="submit" @click="submitBtn">提交</view>

			<!-- mask遮罩 -->
			<view class="mask-wrap" v-if="isShow">
				<view class="content">
					<image src="../../static/img/bianxie.png" mode="widthFix"></image>
					<view class="text">审核中</view>
					<view style="color: #666666;font-size: 28rpx;">您提交的信息正在审核中</view>
					<view class="wellBtn" @click="wellBtn">返回首页</view>
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
				isShow: false, //mask遮罩显示隐藏
				array: [], //城市列表
				areaData: [], //所在区列表,
				streetData: [], //所在街道列表
				commData: [], //所在社区列表
				orgData: [], //小区列表
				enterArr: [], //父企业列表
				parent_id: null, //父级企业id
				chidrenenterArr: [], //子级企业列表
				entIndex: 0, //父企业索引
				chidrenentIndex: 0, //子级企业索引
				cityIndex:0,//城市索引
				areaIndex:0,//区索引
				streetIndex:0,//街道索引
				commIndex:0,//社区索引
				regName: {//页面展示的数据
					city_name: "",
					area_name: "",
					street_name: "",
					comm_name: "",
					enter: '', //企业名称
					chidrenName: '',//子企业名称
				},
				regData: {//后台传的字段
					city: "",
					name: "",
					org_type_id: "",
					org_sub_type_id: "",
					area_coding: "",
					street_coding: "",
					comm_coding: "",
					license: "",
				},
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
			}
		},
		mounted() {
			this.themeCode('', 1)
			this.typeNames()
		},
		methods: {
			//城市选择
			async bindPickerChange(e) {
				console.log(e)
				this.cityIndex = e.detail.value
				this.regName.city_name = this.array[this.cityIndex].name
				await this.themeCode(this.array[this.cityIndex].coding, 2)
			},
			//所在区域选择
			bindPickerCoding(e) {
				if(this.areaIndex != e.detail.value){
					this.regName.street_name = ''
					this.regData.street_coding = ''
					this.regName.comm_name = ''
					this.regData.comm_coding = ''
					this.streetIndex = 0
					this.commIndex = 0
				}
				this.areaIndex = e.detail.value
				this.regName.area_name = this.areaData[this.areaIndex].name
				this.regData.area_coding = this.areaData[this.areaIndex].coding
				this.themeCode(this.areaData[this.areaIndex].coding, 3)
			},
			//所在街道选择
			bindPickerStreet(e) {
				if(this.streetIndex != e.detail.value){
					this.regName.comm_name = ''
					this.regData.comm_coding = ''
					this.commIndex = 0
				}
				this.streetIndex = e.detail.value
				this.regName.street_name = this.streetData[this.streetIndex].name
				this.regData.street_coding = this.streetData[this.streetIndex].coding
				this.themeCode(this.streetData[this.streetIndex].coding, 4)
			},
			//所在社区选择
			bindPickerComm(e) {
				this.commIndex = e.detail.value
				this.regName.comm_name = this.commData[this.commIndex].name
				this.regData.comm_coding = this.commData[this.commIndex].coding
				this.themeCode(this.commData[this.commIndex].coding, 5)
			},
			//父级企业选择
			async enterChange(e) {
				if(this.entIndex != e.detail.value){
					this.chidrenentIndex = ''
					this.regName.chidrenName = ''
					this.regData.org_sub_type_id = ''
				}
				this.entIndex = e.detail.value;
				this.regName.enter = this.enterArr[this.entIndex].name;
				this.parent_id = this.enterArr[this.entIndex].org_type_id;
				this.regData.org_type_id = this.enterArr[this.entIndex].org_type_id //父企业绑定uuid
				let data = {
					grade: 2,
					parent_id: this.parent_id
				}
				await this.$api.typeName(data).then(res => {
					console.log(res, "责任主体子类型")
					this.chidrenenterArr = res.data.data
				})
			},
			//子级企业确认
			chidrenenterChange(e) {
				this.chidrenentIndex = e.detail.value;
				this.regName.chidrenName = this.chidrenenterArr[this.chidrenentIndex].name;
				this.regData.org_sub_type_id = this.chidrenenterArr[this.chidrenentIndex].org_type_id //子企业绑定uuid
			},
			//提交按钮 责任主题创建
			submitBtn() {
				let setData = [{
						name: '请选择城市',
						value: this.regName.city_name
					},
					{
						name: '请选择所在区域',
						value: this.regData.area_coding
					},
					{
						name: '请选择所在街道',
						value: this.regData.street_coding
					},
					{
						name: '请选择所在社区',
						value: this.regData.comm_coding
					},
					{
						name: '请填写企业名称',
						value: this.regData.name
					},
					{
						name: '请选择父企业',
						value: this.regData.org_type_id
					},
					{
						name: '请选择子企业',
						value: this.regData.org_sub_type_id
					},
					{
						name: '请上传营业执照',
						value: this.regData.license
					},

				];
				if (!utils.isEmpty(setData)) return;
				this.$showLoading()
				let data = {
					...this.regData
				}
				this.$api.themeSet(data).then(res => {
					console.log(res)
					if (res.data.code == 200) {
						this.isShow = true;
					} else {
						uni.showToast({
							title: '提示',
							icon: "none"
						})
					}

				}).catch(err => {
					console.log(err)
					uni.showToast({
						title: err.data.errors.name[0],
						icon: "none"
					})
				})
			},
			//注册成功跳转首页
			wellBtn() {
				this.isShow = false
				uni.reLaunch({
					url: "../home/home"
				})
			},
			//查询行政编码
			themeCode(coding, num) {
				console.log(coding)
				let data = {
					grade: num,
					coding_like: coding
				}
				this.$api.themeCode(data).then(res => {
					// console.log(res)
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
			//修改企业
			modifyUp() {

			},
			
			// 新增图片
			addImage(e) {
				this.imageData = e.allImages
				this.regData.license = e.allImages[0]
			},
			// 删除图片
			deleteImage(e) {
				// console.log(e);
			},
		}
	}
</script>

<style lang="scss" scoped>
	input{ font-size: 30rpx !important;color: #9A9A9A !important;}
	.list-wrap {
		width: 100%;
		padding: 15rpx 20rpx;
		box-sizing: border-box;

		.failed {
			width: 100%;
			height: 55rpx;
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
				font-size: 30rpx;
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
