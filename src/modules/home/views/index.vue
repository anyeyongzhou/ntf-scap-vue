<template>
	<div class="w-full h-full">
		<div id="map" class="w-full h-full relative">
			<div class="left-box">
				<el-scrollbar :max-height="leftMaxHeight">
					<search-views @searchPosition="handleSearchPosition" />
					<div class="ship-container">
						<ship-tree
							@checkedValues="treeCheckedValues"
							@moveCenter="handleMoveCenter"
						></ship-tree>
					</div>
				</el-scrollbar>
			</div>

			<div class="absolute bottom-[40px] left-9 bg-white z-10 opacity-65 rounded-sm">
				<div class="text-xs px-1">当前级别：{{ state.zoom }}</div>
			</div>

			<div
				@click="showTargetPanel = !showTargetPanel"
				class="absolute top-2 right-10 bg-white hover:bg-gray-50 z-10 opacity-85 rounded-sm w-6.1 h-6.1 flex items-center justify-center rounded-lg border-t-2"
			>
				<div
					class="i-ion-warning-outline hover:text-blue-400"
					:class="showTargetPanel ? 'text-blue-500' : 'text-gray-500'"
				></div>
			</div>

			<div class="center-box">
				<count-targets :targetCounts="targetCounts" />
			</div>

			<div class="right-box">
				<div v-if="showTargetPanel">
					<column-title title="情报感知" />
					<target-list
						v-if="false"
						title="探测目标"
						:list="suspiciousTargets"
						@trackTarget="handleTrackTarget"
					/>
					<target-list
						title="可疑目标"
						:list="otherTargets"
						@trackTarget="handleTrackTarget"
					/>
				</div>
				<div style="position: absolute; bottom: 10px; right: 0; z-index: 10">
					<layer-views @showLayers="handleShowLayers"></layer-views>
					<ais-radar-filter @checkedValue="handleTypeChange" class="mt-3" />
				</div>
			</div>
		</div>
		<!-- 船舶弹窗容器 -->
		<div ref="popupCom" class="ownship-overlay-box">
			<!-- 弹窗内容（展示坐标信息） -->
			<ship-info
				:ship="selectedOwnShip"
				v-if="selectedOwnShip"
				style="margin: 0 0 -10px 0"
				@trackPlayback="handleTrackPlayback"
				@playLive="handlePlayLive"
			/>
			<!-- 关闭按钮 -->
			<div class="close" @click="handleShipInfoClose">
				<el-icon :size="12" color="white"><close /></el-icon>
			</div>
		</div>
		<!-- AIS/雷达目标弹窗容器 -->
		<div ref="popupTarget" class="aisradar-overlay-box">
			<ais-radar-info :info="selectedAisRadar" v-if="selectedAisRadar" />
			<div class="close" @click="handleAisRadarClose">
				<el-icon :size="12" color="white"><close /></el-icon>
			</div>
		</div>
		<!-- 视频查看 -->
		<cl-dialog title="视频查看" v-model="videoVisible" :before-close="beforeVideoClose">
			<div v-loading="liveLoading" element-loading-background="rgba(0, 0, 0, 0.8)">
				<live-player
					videoTitle=""
					:videoUrl="videoUrl"
					:show-custom-button="false"
					fluent
					live
					autoplay
				></live-player>
			</div>
		</cl-dialog>
		<!-- 历史轨迹 -->
		<cl-dialog
			title="历史轨迹"
			v-model="trackVisible"
			top="1%"
			width="80%"
			:close-on-click-modal="false"
		>
			<div>
				<track-view :dateRange="trackDateRange" :shipId="trackShipId" />
			</div>
		</cl-dialog>
	</div>
</template>

<script lang="ts" name="home" setup>
import { onMounted, reactive, ref } from "vue";
import { Feature, Map, Overlay, View } from "ol";
import { XYZ } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import * as control from "ol/control";
import { Geometry, Point, Polygon } from "ol/geom";
import { Circle, Fill, Icon, Stroke, Style, Text } from "ol/style";
import SourceVector from "ol/source/Vector";
import AisShipSailIcon from "/$/home/static/icons/svg/icon-ais-ship-sail.svg";
import LivePlayer from "@liveqing/liveplayer-v3";
// import AisShipStillIcon from "/$/home/static/icons/svg/icon-ais-ship-still.svg";
import OwnShipStillIcon from "/$/home/static/icons/svg/icon-own-ship-still.svg";
import SearchViews from "/$/home/components/search-views.vue";
import ShipTree from "/$/home/components/ship-tree.vue";
import { service } from "/@/cool";
import ShipInfo from "/$/home/components/ship-info.vue";
import { Close } from "@element-plus/icons-vue";
import CountTargets from "/$/home/components/count-targets.vue";
import AisRadarInfo from "/$/home/components/ais-radar-info.vue";
import TrackView from "/$/home/components/track-view.vue";
import { ElMessage } from "element-plus";
import ColumnTitle from "/$/home/components/column-title.vue";
import TargetList from "/$/home/components/target-list.vue";
import LayerViews from "/$/home/components/layer-views.vue";
import AisRadarFilter from "/$/home/components/ais-radar-filter.vue";
import * as _ from "lodash";
import { hexToRGB } from "/@/cool/utils";
import { fromLonLat } from "ol/proj";

interface TargetCount {
	onlineCount: number;
	offlineCount: number;
	aisCount: number;
	radarCount: number;
}

const mapRef = ref();
const center = ref([109.119254, 21.473343]);
const viewRef = ref();

const selectedOwnShip = ref();
const selectedAisRadar = ref();
const overlay = ref();
const popupCom = ref();

const targetOverlay = ref();
const popupTarget = ref();
const shipLayer = ref();
const targetLayer = ref();
const customLayer = ref();
const radarLayer = ref();

const leftMaxHeight = ref(window.innerHeight - 215);
const shipIds = ref([]);
const dataType = ref(0);
const aisRadars = ref<any>(0);
const shipInfos = ref([]);
// 可疑目标
const suspiciousTargets = ref<any[]>([]);
const otherTargets = ref<any[]>([]);

const targetCounts = ref<TargetCount>();
// 历史轨迹
const trackVisible = ref(false);
const trackDateRange = ref(null);
const trackShipId = ref(null);
// 视频监控
const videoUrl = ref();
const videoVisible = ref(false);
const liveLoading = ref(false);
// 图层管理
const layerList = ref();
const state = reactive({
	zoom: 0,
	pixelLength: 0
});
const showTargetPanel = ref(true);

const handleSearchPosition = (e: any) => {
	const { position } = e;
	console.log(position);
	viewRef.value.setZoom(15);
	viewRef.value.animate({
		center: fromLonLat(position),
		duration: 1000
	});
};

const treeCheckedValues = (values: []) => {
	console.log("-> tree checked : ", values);
	shipIds.value = values;
	getLocation();
	getAisAndRadarData();
	// refreshCounts();
};

function handleMoveCenter(position: any) {
	viewRef.value.setZoom(15);
	viewRef.value.animate({
		center: position,
		duration: 1000
	});
}

async function getLocation() {
	await service.ship.info.getLocation({ shipIds: shipIds.value }).then((res: []) => {
		console.log(res);
		shipInfos.value = res;
		handleAddShipFeatures(res);
		handleAddRadarFeatures();
	});
}

async function getAisAndRadarData() {
	await service.ehh.data
		.query({ type: dataType.value, shipIds: shipIds.value })
		.then((res: []) => {
			aisRadars.value = res;
			handleAddTargetFeatures(res);
			judgeSuspiciousTargets(res);
		});
}

/**
 * 判断可疑目标
 */
function judgeSuspiciousTargets(targets: any) {
	let suspicious: any[] = [];
	let others: any[] = [];
	let aisCount = 0;
	let radarCount = 0;
	targets.map((item: any) => {
		if (
			item?.mmsi.startsWith("412") ||
			item?.mmsi.startsWith("413") ||
			item?.mmsi.startsWith("414")
		) {
			suspicious.push(item);
		} else {
			others.push(item);
		}

		if (item.type == 1) {
			aisCount += 1;
		} else if (item.type == 2) {
			radarCount += 1;
		}
	});
	suspiciousTargets.value = suspicious;
	otherTargets.value = others;
	targetCounts.value!.aisCount = aisCount;
	targetCounts.value!.radarCount = radarCount;
}

// 点击地图事件
function mapClick() {
	// 绑定一个点击事件
	mapRef.value.on("singleclick", (event: any) => {
		if (overlay.value) {
			handleShipInfoClose();
		}
		if (targetOverlay.value) {
			handleAisRadarClose();
		}
		const feature = mapRef.value.getFeaturesAtPixel(event.pixel)[0];
		if (!feature) {
			return;
		}
		console.log("-> click: ", event.coordinate, feature.getId());
		const coordinate = feature.getGeometry().getCoordinates();
		if (feature.getId().startsWith("target")) {
			// AIS & 雷达目标
			selectedAisRadar.value = feature.getProperties();
			targetOverlay.value.setPosition(coordinate);
		} else if (feature.getId().startsWith("ship")) {
			// 船舶
			selectedOwnShip.value = feature.getProperties(); // 保存坐标点
			overlay.value.setPosition(coordinate); // 设置覆盖物出现的位置
		}
	});

	mapRef.value.on("pointermove", (event: any) => {
		mapRef.value.getViewport().style.cursor = mapRef.value.hasFeatureAtPixel(event.pixel)
			? "pointer"
			: "inherit";
	});

	mapRef.value.on("moveend", () => {
		state.zoom = mapRef.value.getView().getZoom();
		// 获取当前视口大小
		const viewportSize = mapRef.value.getSize();
		// 获取屏幕高度
		const screenHeight = viewportSize[1];
		if (state.zoom === 16) {
			state.pixelLength = screenHeight * 0.8;
			canvasWidth.value = screenHeight * 0.8;
			canvasHeight.value = screenHeight * 0.8;
		} else if (state.zoom === 15) {
			state.pixelLength = (screenHeight * 0.8) / 1.5;
			canvasWidth.value = (screenHeight * 0.8) / 1.5;
			canvasHeight.value = (screenHeight * 0.8) / 1.5;
		} else if (state.zoom === 14) {
			state.pixelLength = (screenHeight * 0.8) / 2.5;
			canvasWidth.value = (screenHeight * 0.8) / 2.5;
			canvasHeight.value = (screenHeight * 0.8) / 2.5;
		}
	});
}

// 关闭弹窗
function handleShipInfoClose() {
	overlay.value.setPosition(undefined); // setPosition 传入undefined会隐藏弹窗元素
	selectedOwnShip.value = ""; // 把弹窗内容清空
}

function handleAisRadarClose() {
	targetOverlay.value.setPosition(undefined); // setPosition 传入undefined会隐藏弹窗元素
	selectedAisRadar.value = ""; // 把弹窗内容清空
}

function initMap() {
	const scaleLineControl = new control.ScaleLine();
	const fullScreenControl = new control.FullScreen();

	overlay.value = new Overlay({
		element: popupCom.value, // 弹窗标签，在html里
		autoPan: true, // 如果弹窗在底图边缘时，底图会移动
		stopEvent: true,
		positioning: "bottom-center",
		offset: [0, -28]
	});

	targetOverlay.value = new Overlay({
		element: popupTarget.value,
		autoPan: true,
		stopEvent: true,
		positioning: "bottom-center",
		offset: [0, -15]
	});

	radarLayer.value = new VectorLayer({
		source: new SourceVector()
	});

	// 设置船舶图层
	shipLayer.value = new VectorLayer({
		source: new SourceVector()
	});

	// 设置AIS/雷达目标图层
	targetLayer.value = new VectorLayer({
		source: new SourceVector()
	});

	// 自定义图层
	customLayer.value = new VectorLayer({
		source: new SourceVector()
	});

	viewRef.value = new View({
		// 地图视图
		projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3857
		center: center.value, // 深圳坐标
		minZoom: 2, // 地图缩放最小级别
		maxZoom: 16, // 地图缩放最大级别
		zoom: 8, // 地图缩放级别（打开页面时默认级别）
		constrainResolution: true // 选项设置为true，以便在缩放时自动调整到最接近的整数级别
	});
	// 地图实例
	mapRef.value = new Map({
		target: "map", // 对应页面里 id 为 map 的元素
		layers: [
			// 图层
			new TileLayer({
				source: new XYZ({
					url: import.meta.env.VITE_SEA_TILE_LAYER_URL
				})
			}),
			radarLayer.value,
			customLayer.value,
			targetLayer.value,
			shipLayer.value
		],
		view: viewRef.value,
		overlays: [overlay.value, targetOverlay.value], // 绑定一个覆盖物
		controls: control.defaults().extend([scaleLineControl, fullScreenControl])
	});
	// 在地图初始化完成后再绑定点击事件
	mapClick();
}

function getShipStyles(feature: Feature<Point>) {
	console.log(feature.getProperties());
	const shipInfo = feature.getProperties();
	let styles = [];
	styles.push(
		new Style({
			image: new Icon({
				src: OwnShipStillIcon,
				anchor: [0.5, 0.5],
				rotation: shipInfo.cog
			})
		})
	);
	// 绘制圆角矩形
	let canvas = document.createElement("canvas");
	let context = canvas.getContext("2d");
	let length = shipInfo.name.length + 1;
	canvas.width = length * 10 + 10;
	canvas.height = 22;
	let x = 0;
	let y = 0;
	let w = canvas.width;
	let h = canvas.height;
	let r = 8;
	// 缩放
	context!.scale(0.8, 0.8);
	context!.fillStyle = "rgba(255, 255, 255, 0.75)";
	// 绘制圆角矩形
	context!.beginPath();
	context!.moveTo(x + r, y);
	context!.arcTo(x + w, y, x + w, y + h, r);
	context!.arcTo(x + w, y + h, x, y + h, r);
	context!.arcTo(x, y + h, x, y, r);
	context!.arcTo(x, y, x + w, y, r);
	// 设置阴影
	// context!.shadowColor = "rgba(0, 0, 0, 0.2)"; // 颜色
	// context!.shadowBlur = 5; // 模糊尺寸
	// context!.shadowOffsetX = 2; // 阴影Y轴偏移
	// context!.shadowOffsetY = 2; // 阴影X轴偏移
	// ---
	context!.closePath();
	context!.fill();
	// 绘制黑色小圆
	context!.beginPath();
	context!.arc(11, 11, 4, 0, Math.PI * 2, true);
	if (shipInfo.status === 1) {
		context!.fillStyle = "rgb(22, 206, 140)"; // 在线
	} else {
		context!.fillStyle = "rgb(179, 179, 182)"; // 离线
	}
	context!.closePath();
	// 填充
	context!.fill();
	// 设置style
	styles.push(
		new Style({
			image: new Icon({
				img: canvas,
				imgSize: [w, h],
				anchor: [0.39, 1.3]
			}),
			text: new Text({
				textAlign: "center",
				text: shipInfo?.name,
				offsetX: 6,
				offsetY: -20
			})
		})
	);
	return styles;
}

function getTargetStyles(feature: Feature<Point>) {
	const target = feature.getProperties();
	let styles = [];
	// 设置style
	styles.push(
		new Style({
			image: new Icon({
				src: AisShipSailIcon,
				anchor: [0.5, 0.5],
				rotation: target.cog
			}),
			text: new Text({
				text: target?.mmsi,
				font: "12px",
				fill: new Fill({
					color: "black"
				}),
				offsetY: 14,
				stroke: new Stroke({
					color: "white",
					width: 2.5
				})
			})
		})
	);
	return styles;
}

function handleAddTargetFeatures(aisRadars: any) {
	const features: Feature<Geometry>[] = [];
	// 循环添加 feature
	aisRadars.map((item: any) => {
		// 创建 feature
		let feature = new Feature({
			geometry: new Point([item.longitude, item.latitude])
		});
		// 设置ID
		feature.setId(`target_${item.id}`);
		feature.setProperties(item);
		// 设置样式
		feature.setStyle(getTargetStyles(feature));
		// 放入features
		features.push(feature);
	});
	targetLayer.value.getSource()!.clear(true);
	targetLayer.value.getSource()!.addFeatures(features);
}

function handleAddRadarFeatures() {
	const features: Feature<Geometry>[] = [];
	// 循环添加 feature
	shipInfos.value.map((item: any) => {
		// 创建 feature
		let feature: any = new Feature({
			geometry: new Point(item.position)
		});
		// 设置ID
		feature.setId(`radar_${item.id}`);
		feature.setStyle(null);
		// 放入features
		features.push(feature);
	});
	radarLayer.value.getSource()!.clear(true);
	radarLayer.value.getSource()!.addFeatures(features);
	startRadarAnimation();
}

function handleAddShipFeatures(shipLocations: any) {
	console.log(shipLocations);
	const features: Feature<Geometry>[] = [];
	// 循环添加 feature
	shipLocations.map((item: any) => {
		// 创建 feature
		let feature = new Feature({
			geometry: new Point(item.position)
		});
		// 设置ID
		feature.setId(`ship_${item.id}`);
		feature.setProperties(item);
		// 设置样式
		feature.setStyle(getShipStyles(feature));
		// 放入features
		features.push(feature);
	});
	shipLayer.value.getSource()!.clear(true);
	shipLayer.value.getSource()!.addFeatures(features);
}

function handleAddCustomLayers(layerList: any) {
	const features: Feature<Geometry>[] = [];
	// 循环添加 feature
	layerList.map((item: any) => {
		// 创建 feature
		let feature = new Feature({
			geometry: new Polygon(item.boundary)
		});
		// 设置ID
		feature.setId(`layer_${item.type}_${item.id}`);
		// 设置样式
		feature.setStyle(
			new Style({
				fill: new Fill({
					color: hexToRGB(item.color, 0.12)
				}),
				stroke: new Stroke({
					color: item.color,
					width: 1
				})
			})
		);
		// 放入features
		features.push(feature);
	});
	customLayer.value.getSource()!.clear(true);
	customLayer.value.getSource()!.addFeatures(features);
}

function refreshCounts() {
	service.ship.info.statistics({ shipIds: shipIds.value }).then((res: any) => {
		targetCounts.value = res;
	});
}

function handleTrackPlayback(props: any) {
	const { dateRange, shipId } = props;
	console.log(dateRange);
	trackVisible.value = true;
	trackDateRange.value = dateRange;
	trackShipId.value = shipId;
}

const handlePlayLive = async (item: { channelNo: any }) => {
	videoVisible.value = true;
	liveLoading.value = true;
	await service.monitor.device
		.liveUrl({ channel: item.channelNo })
		.then((res) => {
			console.log();
			videoUrl.value = res.flvUrl;
		})
		.catch((err) => {
			ElMessage.warning(err.message);
		});
	liveLoading.value = false;
};

// 关闭前释放播放器资源
const beforeVideoClose = (done: () => void) => {
	videoUrl.value = null;
	done();
};

function handleTrackTarget(target: any) {
	if (!_.isEmpty(target)) {
		if (target.longitude && target.latitude) {
			const position = [target.longitude, target.latitude];
			viewRef.value.setZoom(15);
			viewRef.value.animate({
				center: position,
				duration: 1000
			});
		}
	}
}

function handleShowLayers(event: any) {
	console.log("-> event: ", event);
	layerList.value = event;
	handleAddCustomLayers(event);
}

function handleTypeChange(event: number) {
	dataType.value = event;
	getAisAndRadarData();
}

function startRadarAnimation() {
	const features = radarLayer.value.getSource().getFeatures();

	let angle = Math.PI / 4;
	let scanBegin = 0;
	let scanEnd = angle;

	// Create rotation animation
	setInterval(() => {
		if (state.zoom < 14) {
			for (let i = 0; i < features.length; i++) {
				features[i].setStyle(
					new Style({
						image: new Circle({
							radius: 0,
							fill: new Fill({
								color: "rgba(0, 0, 0, 0)"
							})
						})
					})
				);
			}
			return;
		}
		features.forEach((feature: any) => {
			// create canvas element
			const canvas = document.createElement("canvas");
			canvas.width = canvasWidth.value;
			canvas.height = canvasHeight.value;

			// draw radar display on canvas
			const context: any = canvas.getContext("2d");
			context.imageSmoothingEnabled = false;
			context.beginPath();
			const x = canvas.width / 2;
			const y = canvas.height / 2;
			const radius = Math.min(x, y);
			drawRadar(context, x, y, radius, 0, Math.PI * 2);
			drawSector(context, x, y, radius, scanBegin, scanEnd);
			// 改变扇形的角度
			scanBegin += angle / 25;
			scanEnd = scanBegin + angle;
			// 超过阈值变为初始值
			if (scanBegin >= Math.PI * 2) {
				scanBegin = 0;
				scanEnd = scanBegin + angle;
			}

			const newStyle = new Style({
				image: new Icon({
					img: canvas,
					imgSize: [canvas.width, canvas.height],
					anchor: [0.5, 0.5]
				})
			});
			feature.setStyle(newStyle);
		});
		mapRef.value.render();
	}, 60);
}

const canvasWidth = ref<number>(300); // canvas 宽度
const canvasHeight = ref<number>(300); // canvas 高度

function drawRadar(
	context: CanvasRenderingContext2D,
	x: number,
	y: number,
	radius: number,
	startAngle: number,
	endAngle: number
) {
	context.beginPath();
	context.arc(x, y, radius, startAngle, endAngle);
	context.lineTo(x, y);
	context.closePath();
	// 设置背景色为白色，透明度为10%
	context.fillStyle = "rgba(0, 250, 0, 0.1)";
	context.fill();

	const drawLine = function (
		toX: number,
		toY: number,
		lineDash: any,
		color = "#396a00",
		lineWidth = 1
	) {
		context.beginPath();
		context.setLineDash(lineDash);
		context.moveTo(x, y);
		context.lineTo(toX, toY);
		context.lineWidth = lineWidth;
		context.strokeStyle = color;
		context.stroke();
	};

	const drawCircle = function (radius: number, lineWidth = 1, color = "rgba(0, 255, 0, 0.3)") {
		context.beginPath();
		context.setLineDash([]);
		context.arc(x, y, radius, 0, 2 * Math.PI);
		context.lineWidth = lineWidth;
		context.strokeStyle = color;
		context.stroke();
	};

	// 绘制 x 轴和 y 轴线条
	for (let i = 1; i <= 8; i++) {
		drawLine(
			x + Math.sin((Math.PI * i) / 4) * radius,
			y + Math.cos((Math.PI * i) / 4) * radius,
			[5, 3],
			"rgba(0, 255, 0, 0.3)"
		);
	}

	for (let i = 1; i <= 15; ) {
		drawLine(
			x + Math.sin((Math.PI * i) / 8) * radius,
			y + Math.cos((Math.PI * i) / 8) * radius,
			[],
			"rgba(0, 255, 0, 0.1)"
		);
		i += 2;
	}

	// 绘制圆形线条
	drawCircle(y * 0.99, 2.5);
	drawCircle(0.9 * y, 2.5, "rgba(0, 255, 0, 0.1)");
	drawCircle(0.6 * y);
	drawCircle(0.3 * y);
}

// 绘制雷达扫描扇形
const drawSector = function (
	context: CanvasRenderingContext2D,
	x: number,
	y: number,
	radius: number,
	sAngle: number,
	eAngle: number
) {
	let blob = 50;
	let increase = 0;

	if (sAngle < eAngle) {
		increase = (eAngle - sAngle) / blob;
	} else if (sAngle > eAngle) {
		increase = (Math.PI * 2 - sAngle + eAngle) / blob;
	} else {
		return;
	}

	let angle1 = sAngle;
	let angle2 = sAngle + increase;
	for (let i = 0; i < blob; i++) {
		context.beginPath();
		context.moveTo(x, y);
		context.arc(x, y, radius, angle1, angle2);
		context.fillStyle = "rgba(42,195,39," + i / blob + ")";
		context.fill();
		angle1 = angle2;
		angle2 = angle1 + increase;
		if (angle2 >= Math.PI * 2) {
			context.beginPath();
			context.moveTo(x, y);
			context.arc(x, y, radius, angle1, Math.PI * 2);
			context.fillStyle = "rgba(42,195,39," + i / blob + ")";
			context.fill();
			angle1 = 0;
			angle2 = angle1 + increase;
		}
	}
};

function handleResize() {
	leftMaxHeight.value = window.innerHeight - 215;
}

onMounted(() => {
	initMap();
	refreshCounts();
	// 添加对resize事件的监听
	window.addEventListener("resize", handleResize);
});
</script>

<style lang="scss">
#map .ol-zoom {
	top: unset;
	left: 0.5em;
	bottom: 2.5em;
}

.left-box {
	display: flex;
	flex-direction: column;
	position: absolute;
	z-index: 2;
	width: 370px;
	top: 10px;

	.ship-container {
		margin: 0 10px;
		border-radius: 5px;
	}
}

.center-box {
	width: 480px;
	display: flex;
	flex-direction: column;
	position: absolute;
	z-index: 1;
	align-items: center;
	justify-content: center;
	top: 10px;
	left: 0;
	right: 0;
	margin: auto;
}

.ownship-overlay-box {
	z-index: 999;
	width: 350px;
	color: white;
	border-radius: 5px;

	.close {
		width: 20px;
		height: 20px;
		background-color: rgba(85, 96, 113, 0.75);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		margin: auto;
		cursor: pointer;
	}
}

.aisradar-overlay-box {
	width: 200px;
	color: white;
	display: flex;
	flex-direction: column;

	.close {
		width: 20px;
		height: 20px;
		background-color: rgba(85, 96, 113, 0.75);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		margin: auto;
		cursor: pointer;
	}
}

.right-box {
	height: calc(100% - 42px);
	display: flex;
	flex-direction: column;
	position: absolute;
	z-index: 2;
	width: 290px;
	right: 10px;
	top: 42px;
}
</style>
