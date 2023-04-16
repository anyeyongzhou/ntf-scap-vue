<template>
	<div
		id="track-map"
		class="map__x"
		ref="drawRef"
		v-loading="fetchLoading"
		element-loading-text="加载中..."
		element-loading-background="rgba(122, 122, 122, 0.8)"
	>
		<div class="control-box" v-if="sourceData">
			<span>速度：</span>
			<el-slider
				style="width: 120px"
				v-model="speed"
				:step="10"
				:min="10"
				:max="999"
				:show-tooltip="false"
				size="small"
			/>
			<el-button-group size="small" style="margin-left: 10px">
				<el-button type="primary" @click="toggle">{{ buttonText }}</el-button>
				<el-button type="primary" @click="startAnimation">重新开始</el-button>
				<el-button v-if="false" type="primary" @click="stopAnimation">停止回放</el-button>
			</el-button-group>
		</div>
		<div class="info-box" v-if="sourceData">
			<span>位置：{{ currentPosition }}</span>
			<span style="margin: 0 10px">/</span>
			<span>速度：{{ currentSog }}节</span>
			<span style="margin: 0 10px">/</span>
			<span>时间：{{ currentTime }}</span>
		</div>
	</div>
</template>

<script lang="ts" name="track-view" setup>
import { onMounted, ref } from "vue";
import { Feature, Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { useResizeObserver } from "@vueuse/core";
import { Vector, XYZ } from "ol/source";
import { LineString, Point } from "ol/geom";
import * as control from "ol/control";
import { Icon, Stroke, Style } from "ol/style";
import OwnShipStillIcon from "/$/home/static/icons/svg/icon-own-ship-still.svg";
import StartIcon from "/$/home/static/icons/svg/icon-start.svg";
import EndIcon from "/$/home/static/icons/svg/icon-end.svg";
import dayjs from "dayjs";
import { ElMessage } from "element-plus";
import { service } from "/@/cool";

const props = defineProps({
	dateRange: {
		type: Array
	},
	shipId: String
});

const center = ref([109.119254, 21.473343]);
const drawRef = ref(null);
const map = ref(); // 存放地图实例
const viewRef = ref();
const fetchLoading = ref(false);

const routeCoords = ref();
const speed = ref(60);
const buttonText = ref("开始回放");

const routeFeature = ref();
const geoMarker = ref();
const startMarker = ref();
const endMarker = ref();
const vectorLayer = ref();

const sourceData = ref();
const animating = ref(false);
const timer = ref();
const elapsedTime = ref(0);
const index = ref(0);
const timerFlag = ref(false);
const startTime = ref();

const currentTime = ref();
const currentPosition = ref();
const currentSog = ref(0);

const styles = {
	route: new Style({
		stroke: new Stroke({
			width: 6,
			color: [237, 212, 0, 0.8]
		})
	}),
	start: new Style({
		image: new Icon({
			anchor: [0.5, 0.8],
			scale: 0.2,
			src: StartIcon
		})
	}),
	end: new Style({
		image: new Icon({
			anchor: [0.5, 0.8],
			scale: 0.2,
			src: EndIcon
		})
	})
};

function initMap() {
	const scaleLineControl = new control.ScaleLine();
	vectorLayer.value = new VectorLayer({
		source: new Vector()
	});

	viewRef.value = new View({
		// 地图视图
		projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3857
		center: center.value, // 深圳坐标
		minZoom: 2, // 地图缩放最小级别
		zoom: 11 // 地图缩放级别（打开页面时默认级别）
	});
	// 地图实例
	map.value = new Map({
		target: "track-map", // 对应页面里 id 为 map 的元素
		layers: [
			// 图层
			new TileLayer({
				source: new XYZ({
					url: import.meta.env.VITE_SEA_TILE_LAYER_URL
				})
			}),
			vectorLayer.value
		],
		view: viewRef.value,
		controls: control.defaults().extend([scaleLineControl])
	});
}

const getTracks = async () => {
	let start;
	let end;
	if (props.dateRange) {
		start = props.dateRange[0] as Date;
		end = props.dateRange[1] as Date;
	}
	const startTime = dayjs(start).format("YYYY-MM-DD HH:mm:ss");
	const endTime = dayjs(end).format("YYYY-MM-DD HH:mm:ss");
	console.log(startTime, endTime, props.shipId);

	fetchLoading.value = true;

	await service.ship.info
		.track({ shipId: props.shipId, startTime, endTime })
		.then((res) => {
			console.log(res);
			if (res.length > 0) {
				sourceData.value = res;
				currentPosition.value =
					res[0]?.longitude.toFixed(2) + "," + res[0]?.latitude.toFixed(2);
				currentSog.value = res[0]?.sog;
				currentTime.value = res[0].createTime;
				// 通过接口获取轨迹返回数据
				routeCoords.value = res.map((d: any) => {
					return [d.longitude, d.latitude];
				});
				viewRef.value.animate({
					center: [res[0].longitude, res[0].latitude],
					duration: 1000
				});
			} else {
				ElMessage.info("未查询到相关记录");
				return;
			}
		})
		.catch((err) => {
			ElMessage.warning(err.message);
			return;
		});
	fetchLoading.value = false;
	// 画线
	routeFeature.value = new Feature(new LineString(routeCoords.value));
	routeFeature.value.setStyle(styles.route);
	// 开始点
	startMarker.value = new Feature(new Point(routeCoords.value[0]));
	startMarker.value.setStyle(styles.start);
	// 结束点
	endMarker.value = new Feature(new Point(routeCoords.value[routeCoords.value.length - 1]));
	endMarker.value.setStyle(styles.end);
	// 船舶标记
	geoMarker.value = new Feature(new Point(routeCoords.value[0]));
	geoMarker.value.setStyle(getGeoMarkerStyle(sourceData.value[0]?.cog));

	// 运动集合展示在矢量图上
	vectorLayer.value
		.getSource()
		.addFeatures([routeFeature.value, startMarker.value, endMarker.value, geoMarker.value]);
	map.value.render();
};

function moveFeature() {
	if (!vectorLayer.value.getVisible()) {
		vectorLayer.value.setVisible(true);
	}
	let shipStyle, rotation;
	// 开始动画
	elapsedTime.value++; // elapsedTime 已过时间
	console.log(speed.value);
	index.value = Math.round((Number(speed.value) * elapsedTime.value) / 60); // 已经走了多少个点
	let x, y;
	if (index.value >= routeCoords.value.length) {
		buttonText.value = "开始回放";
		clearInterval(timer.value);
		return;
	}
	if (routeCoords.value[index.value] && routeCoords.value[index.value + 1]) {
		x = routeCoords.value[index.value][0] - routeCoords.value[index.value + 1][0];
		y = routeCoords.value[index.value][1] - routeCoords.value[index.value + 1][1];
		// 返回从原点(0,0)到(x,y)点的线段与x轴正方向之间的弧度值
		rotation = Math.atan2(y, x);
	} else {
		rotation = 0;
	}
	shipStyle = new Style({
		image: new Icon({
			src: OwnShipStillIcon,
			rotateWithView: false,
			rotation:
				-rotation +
				Math.atan2(
					routeCoords.value[0][1] - routeCoords.value[1][1],
					routeCoords.value[0][0] - routeCoords.value[1][0]
				) /
					2,
			scale: 1.2,
			anchor: [0.5, 0.5] // 图标中心
		})
	});
	const line = new Feature({
		geometry: new LineString(routeCoords.value)
	});
	const lineStyle = new Style({
		stroke: new Stroke({
			width: 6,
			color: [237, 212, 0, 0.8]
		})
	});
	line.setStyle(lineStyle);
	const currentPoint = new Point(routeCoords.value[index.value]);
	// 添加矢量元素
	const feature = new Feature(currentPoint);
	vectorLayer.value.getSource().clear();
	feature.setStyle(shipStyle);
	vectorLayer.value.getSource().addFeature(feature);
	vectorLayer.value.getSource().addFeature(routeFeature.value);
	vectorLayer.value.getSource().addFeature(startMarker.value);
	vectorLayer.value.getSource().addFeature(endMarker.value);
	map.value.render();

	currentPosition.value =
		sourceData.value[index.value]?.longitude.toFixed(2) +
		"," +
		sourceData.value[index.value]?.latitude.toFixed(2);
	currentSog.value = sourceData.value[index.value]?.sog;
	currentTime.value = sourceData.value[index.value].createTime;
	if (index.value % 200 === 0)
		// viewRef.value.animate(routeCoords.value[index.value]);
		viewRef.value.setCenter(routeCoords.value[index.value]);
}
function startAnimation() {
	buttonText.value = "暂停回放";
	animating.value = true;
	startTime.value = new Date().getTime();
	// 隐藏geoMarker
	geoMarker.value.changed();
	// 添加事件，地图渲染时触发
	if (timer.value) {
		clearInterval(timer.value);
	}
	timer.value = setInterval(() => {
		moveFeature();
	}, 60);
	elapsedTime.value = 0;
}

function pauseAnimation() {
	buttonText.value = "继续回放";
	clearInterval(timer.value);
	timerFlag.value = true;
}

function continueAnimation() {
	buttonText.value = "暂停回放";
	if (timerFlag.value) {
		// 添加事件，地图渲染时触发
		timer.value = setInterval(() => {
			moveFeature();
		}, 60);
	}
	timerFlag.value = false;
}

function stopAnimation() {
	clearInterval(timer.value);
	vectorLayer.value.getSource().clear();
	vectorLayer.value.getSource().addFeature(routeFeature.value);
	vectorLayer.value.getSource().addFeature(startMarker.value);
	vectorLayer.value.getSource().addFeature(endMarker.value);
}

// 运动轨迹开关
const toggle = () => {
	if (buttonText.value === "暂停回放") {
		pauseAnimation();
	} else if (buttonText.value === "继续回放") {
		continueAnimation();
	} else {
		startAnimation();
	}
};

const getGeoMarkerStyle = (cog: number) => {
	return new Style({
		// 移动船舶的图标样式
		image: new Icon({
			anchor: [0.5, 0.5],
			scale: 1.2,
			opacity: 1,
			src: OwnShipStillIcon,
			rotation: cog
		})
	});
};

onMounted(() => {
	initMap();
	setTimeout(() => {
		getTracks();
	}, 200);
});

// 监听内容尺寸的更改，使地图尺寸进行改变
useResizeObserver(drawRef, () => {
	map.value.updateSize();
});
</script>

<style lang="scss" scoped>
.map__x {
	width: 100%;
	height: 80vh;
	overflow: auto;
	border: 1px solid #eee;
}

.control-box {
	position: absolute;
	z-index: 99999;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 8px 20px;
	background-color: rgba(97, 104, 115, 0.8);
	border-radius: 5px;
	border: 1px solid #fff;
	left: 0;
	right: 0;
	margin: 10px auto;
	width: 320px;
	font-size: 14px;
	color: white;
}

.info-box {
	position: absolute;
	z-index: 99999;
	font-size: 13px;
	color: white;
	padding: 2px 20px;
	background-color: rgba(97, 104, 115, 0.8);
	border-radius: 5px;
	left: 0;
	right: 0;
	bottom: 20px;
	margin: 10px auto;
	width: 420px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
