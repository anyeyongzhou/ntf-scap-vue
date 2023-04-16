<template>
	<cl-view-group :title="title">
		<template #left>
			<div style="height: 100%">
				<div class="device-group">
					<device-group @row-click="onGroupRowClick"></device-group>
				</div>
				<ptz-control @ptzControl="handlePtzControl" />
			</div>
		</template>
		<template #right>
			<div>
				<div class="view-header">
					<el-radio-group v-model="radio" @change="radioChange">
						<el-radio-button :label="1">单屏幕</el-radio-button>
						<el-radio-button :label="4">四分屏</el-radio-button>
						<el-radio-button :label="9">九分屏</el-radio-button>
						<el-button :icon="FullScreen" @click="toggle">全屏</el-button>
					</el-radio-group>
				</div>
				<div ref="el" :class="['player-container', 'player-container_' + radio]">
					<div
						class="player-item"
						v-for="(item, index) in videoList"
						:key="index"
						@click="onActive(index)"
						@mouseover="onMouseover(index)"
						@mouseleave="onMouseleave()"
					>
						<div
							:class="['closes']"
							v-if="hoverIndex === index"
							@click="onClose(index)"
						>
							关闭
						</div>
						<div
							:class="['player-box', { 'player-active': active === index }]"
							v-loading="item.loading"
							element-loading-background="rgb(0, 0, 0)"
							element-loading-text="加载中..."
						>
							<live-player
								:videoTitle="item.title"
								:videoUrl="item.videoUrl"
								:show-custom-button="false"
								live
								fluent
								autoplay
							></live-player>
						</div>
					</div>
				</div>
			</div>
		</template>
	</cl-view-group>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import LivePlayer from "@liveqing/liveplayer-v3";
// import * as _ from "lodash";
import DeviceGroup from "../components/device-group.vue";
import { FullScreen } from "@element-plus/icons-vue";
import { useFullscreen } from "@vueuse/core";
import { service } from "/@/cool";
import { ElMessage } from "element-plus";
import PtzControl from "/$/monitor/components/ptz-control.vue";
import * as _ from "lodash";

interface VideoItem {
	index: number;
	channel: number;
	videoUrl: string;
	loading: boolean;
	title: string;
}

const el = ref(null);
const { toggle } = useFullscreen(el);
const radio = ref(1);
const active = ref(0);
const hoverIndex = ref(-1);
const videoList = ref<VideoItem[]>([]);

// 选择项
const selects = reactive<any>({
	dept: {},
	ids: []
});

const title = computed(() => {
	return `视频查看`;
});

async function onGroupRowClick({ item, ids }: any) {
	selects.dept = item;
	console.log(item);
	console.log(ids);

	videoList.value[active.value].videoUrl = "";
	videoList.value[active.value].title = "";
	videoList.value[active.value].channel = 0;
	videoList.value[active.value].loading = true;
	await service.monitor.device
		.liveUrl({ channel: item.channelNo })
		.then((res: any) => {
			console.log(res.flvUrl);
			videoList.value[active.value].videoUrl = res.flvUrl;
			videoList.value[active.value].title = item.name;
			videoList.value[active.value].channel = item.channelNo;
		})
		.catch((err) => {
			ElMessage({
				message: err.message,
				type: "warning"
			});
		});
	videoList.value[active.value].loading = false;
}

const radioChange = (value: any) => {
	console.log(value);
	radio.value = value;
	setVideoUrlList();
};

const setVideoUrlList = () => {
	onStopPlayer();
	videoList.value = [];
	for (let i = 0; i < radio.value; i++) {
		const item: VideoItem = {
			index: i,
			channel: 0,
			videoUrl: "",
			loading: false,
			title: ""
		};
		videoList.value.push(item);
	}
};

const onStopPlayer = () => {
	for (let i = 0; i < videoList.value.length; i++) {
		videoList.value[i].videoUrl = "";
	}
};

const onActive = (val: number) => {
	active.value = val;
};

const onClose = (index: number) => {
	videoList.value[index].videoUrl = "";
};

const onMouseover = (index: number) => {
	hoverIndex.value = index;
};

const onMouseleave = () => {
	hoverIndex.value = -1;
};

const handlePtzControl = (e: any) => {
	const videoItem = videoList.value[active.value];
	if (_.isEmpty(videoItem.videoUrl)) {
		ElMessage.warning("请选择运行中云台设备");
		return;
	}
	console.log(videoItem.channel);
	console.log(e.type);
	service.monitor.device
		.control({ channel: videoItem.channel, cmd: e.type })
		.then((res) => {
			console.log(res);
			setTimeout(() => {
				stopPtzControl(videoItem.channel);
			}, 100);
		})
		.catch((err) => {
			ElMessage.warning(err.message);
		});
};

const stopPtzControl = async (channel: any) => {
	await service.monitor.device.control({ channel: channel, cmd: "stop" });
};

onMounted(async function () {
	setVideoUrlList();
});
</script>

<style lang="scss" scoped>
.view-header {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;

	:deep(.el-button) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		margin-left: -1px;
	}
}

.player-container {
	width: 97%;
	display: grid;
	grid-gap: 1px;
	margin: auto;
	position: relative;
}

.player-container_1 {
	grid-template-columns: 1fr;
	grid-template-rows: 1fr;
}

.player-container_4 {
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
}

.player-container_9 {
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
}

.player-active {
	box-shadow: 0 0 2px 1px red;
}

.player-item {
	position: relative;
	background-color: #ccc;
	border: 1px #fff solid;
}

.player-box {
	text-align: center;
	background: gray;
	padding: 0.5px;
}

.player-active {
	box-shadow: 0 0 2px 1px red;
}

.closes {
	position: absolute;
	cursor: pointer;
	top: 5px;
	right: 5px;
	width: 40px;
	height: 24px;
	text-align: center;
	line-height: 24px;
	border-radius: 4px;
	font-size: 12px;
	color: #fff;
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 999;
}

.device-group {
	height: calc(100% - 135px);
	overflow-y: auto;
}
</style>
