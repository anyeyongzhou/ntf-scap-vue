<template>
	<div ref="videoRef"></div>
</template>

<script lang="ts" name="v3-dplayer" setup>
import DPlayer from "dplayer";
import { ref, reactive, onMounted } from "vue";

const videoRef = ref();
const state = reactive({
	instance: DPlayer
});

const props = defineProps({
	// 是否自动播放
	autoplay: {
		type: Boolean,
		default: true
	},
	// 主题色
	theme: {
		type: String,
		default: "#0093ff"
	},
	// 视频是否循环播放
	loop: {
		type: Boolean,
		default: false
	},
	// 语言(可选值: 'en', 'zh-cn', 'zh-tw')
	lang: {
		type: String,
		default: "zh-cn"
	},
	// 是否开启截图(如果开启，视频和视频封面需要允许跨域)
	screenshot: {
		type: Boolean,
		default: false
	},
	// 是否开启热键
	hotkey: {
		type: Boolean,
		default: true
	},
	// 视频是否预加载(可选值: 'none', 'metadata', 'auto')
	preload: {
		type: String,
		default: "auto"
	},
	// 默认音量
	volume: {
		type: Number,
		default: 0.7
	},
	// 可选的播放速率，可以设置成自定义的数组
	playbackSpeed: {
		type: Array,
		// eslint-disable-next-line vue/require-valid-default-prop
		default: [0.5, 0.75, 1, 1.25, 1.5, 2]
	},
	// 在左上角展示一个 logo，你可以通过 CSS 调整它的大小和位置
	logo: {
		type: String,
		default: ""
	},
	// 视频信息
	video: {
		type: Object
	},
	// 自定义进度条提示点
	highlight: {
		type: Array
	},
	// 阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
	mutex: {
		type: Boolean,
		default: true
	}
});

onMounted(() => {
	let player = {
		container: videoRef.value,
		autoplay: props.autoplay,
		theme: props.theme,
		loop: props.loop,
		lang: props.lang,
		screenshot: props.screenshot,
		hotkey: props.hotkey,
		preload: props.preload,
		volume: props.volume,
		playbackSpeed: props.playbackSpeed,
		logo: props.logo,
		video: props.video,
		highlight: props.highlight,
		mutex: props.mutex
	};
	console.log(player);
	state.instance = new DPlayer(player);
});

const onDestroy = () => {
	if (state.instance) {
		state.instance!.destroy();
	}
};

defineExpose({
	onDestroy
});
</script>

<style lang="scss" scoped></style>
