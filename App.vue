<script>
	// #ifdef APP-PLUS
	import APPUpdate, {
		getCurrentNo
	} from "@/components/APPUpdate/index.js";
	// #endif
	export default {
		data() {
			return {
				version: "" // 版本号
			};
		},
		onLaunch: function(e) {
			// #ifdef APP-PLUS
			APPUpdate()
			// #endif
		},
		//第一次加载
		onLoad(e) {
			// #ifdef APP-PLUS
			getCurrentNo(res => {
				// 进页面获取当前APP版本号（用于页面显示）
				this.version = res.version;
			});
			// #endif
		},
		//方法
		methods: {
			// 检查APP是否有新版本
			onAPPUpdate() {
				// true 没有新版本的时候有提示，默认：false
				APPUpdate(true);
			}
		}
	};
</script>

<style>
	/*每个页面公共css */
	/* @import './common/uni.css'; */
	view {
		box-sizing: border-box;
	}

	html,
	body,
	#app {
		height: 100%;
	}
</style>
