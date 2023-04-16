<template>
	<div class="view-home" ref="homeEl">
		<ol-map
			ref="mapRef"
			:loadTilesWhileAnimating="true"
			:loadTilesWhileInteracting="true"
			class="map-container"
			@singleClick="handleSingleClick"
		>
			<ol-view
				ref="viewRef"
				:center="center"
				:rotation="rotation"
				:zoom="zoom"
				:maxZoom="20"
				:projection="projection"
				@zoomChanged="zoomChanged"
			/>

			<ol-tile-layer type="base">
				<ol-source-osm />
			</ol-tile-layer>

			<ol-tile-layer>
				<ol-source-xyz :url="sourceUrl" />
			</ol-tile-layer>

			<!-- 显示当前船舶位置 -->
			<ol-overlay
				v-for="shipLoc in shipLocations"
				:position="shipLoc.position"
				:key="shipLoc.id"
			>
				<template #default>
					<div
						:class="currentZoom > 10 && shipLoc.status === 1 ? 'overlay-radar' : ''"
						:style="`width: ${200 * (currentZoom - 9)}px; height: ${
							200 * (currentZoom - 9)
						}px`"
					>
						<div
							class="overlay-ship"
							:style="
								currentZoom > 10
									? 'margin-top: -28px; margin-left: 46px'
									: 'margin-top: -36px; margin-left: 0'
							"
							@click="handleShipClick(shipLoc)"
						>
							<div class="overlay-ship__name">
								<cl-svg
									:name="shipLoc.status === 1 ? 'icon-online' : 'icon-offline'"
									size="8"
								/>
								<span>{{ shipLoc.name }}</span>
							</div>
							<div
								class="overlay-ship__marker"
								:style="`transform: rotate(${shipLoc?.cog}deg)`"
							></div>
						</div>
					</div>
				</template>
			</ol-overlay>

			<ol-vector-layer>
				<ol-source-vector>
					<ol-feature
						v-for="(item, index) in aisRadars"
						:key="index"
						:properties="{ ...item }"
					>
						<ol-geom-point
							:coordinates="[item.longitude, item.latitude]"
						></ol-geom-point>

						<ol-style>
							<ol-style-icon
								:src="AisShipSailIcon"
								:scale="1.2"
								:rotation="item?.cog"
								:rotateWithView="true"
							></ol-style-icon>
							<ol-style-text :text="item.mmsi" :offsetY="-18">
								<!-- <ol-style-fill color="red"></ol-style-fill>-->
							</ol-style-text>
						</ol-style>
					</ol-feature>

					<ol-feature v-for="(item, index) in layerList" :key="index">
						<ol-geom-polygon :coordinates="item.boundary"></ol-geom-polygon>
						<ol-style>
							<ol-style-fill :color="hexToRGB(item.color, 0.1)"></ol-style-fill>
							<ol-style-stroke :color="item.color" :width="1"></ol-style-stroke>
						</ol-style>
					</ol-feature>
				</ol-source-vector>
			</ol-vector-layer>

			<ol-interaction-select
				ref="selectRef"
				@select="featureSelected"
				:condition="selectCondition"
				:filter="selectInteractionFilter"
			>
				<ol-style>
					<ol-style-icon
						:src="AisShipStillIcon"
						:scale="1.2"
						:offsetY="-18"
					></ol-style-icon>
				</ol-style>
			</ol-interaction-select>

			<ol-overlay
				:position="[selectedAisRadar.longitude, selectedAisRadar.latitude]"
				v-if="selectedAisRadar"
				positioning="bottom-center"
				:offset="[0, -18]"
			>
				<template #default>
					<div class="aisradar-overlay-box">
						<ais-radar-info :info="selectedAisRadar" />
						<div class="close" @click="handleAisRadarClose">
							<el-icon :size="12" color="white"><close /></el-icon>
						</div>
					</div>
				</template>
			</ol-overlay>

			<ol-overlay
				:position="[selectedOwnShip.longitude, selectedOwnShip.latitude]"
				v-if="selectedOwnShip"
				positioning="bottom-center"
				:offset="[0, -40]"
			>
				<template #default>
					<div class="ownship-overlay-box">
						<ship-info
							:ship="selectedOwnShip"
							@playLive="handlePlayLive"
							style="margin: 0 0 -10px 0"
							@trackPlayback="handleTrackPlayback"
						/>
						<div class="close" @click="handleShipInfoClose">
							<el-icon :size="12" color="white"><close /></el-icon>
						</div>
					</div>
				</template>
			</ol-overlay>

			<ol-fullscreen-control />
			<ol-scaleline-control />
			<ol-zoom-control />
			<ol-mouseposition-control v-if="false" />

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

			<div class="center-box">
				<count-targets :targetCounts="targetCounts" />
			</div>

			<div class="right-box">
				<div>
					<column-title title="情报感知" />
					<target-list
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
					<ais-radar-filter @checkedValue="handleTypeChange" style="margin-top: 10px" />
				</div>
			</div>

			<div class="tools-box">
				<div
					v-if="false"
					class="btn-distance"
					@click="handleDistance"
					:style="distanceEnabled ? 'background: #5f80f5' : 'background: #819ab6'"
				>
					<cl-svg name="icon-distance" :size="14"></cl-svg>
				</div>
			</div>
		</ol-map>
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
				<!-- <track-list /> -->
				<track-view :dateRange="trackDateRange" :shipId="trackShipId" />
			</div>
		</cl-dialog>
	</div>
</template>

<script lang="ts" name="home" setup>
import { inject, onBeforeUnmount, onMounted, ref } from "vue";
import ShipTree from "/$/home/components/ship-tree.vue";
import LayerViews from "/$/home/components/layer-views.vue";
// import OwnShipSailIcon from "/$/home/static/icons/svg/icon-own-ship-sail.svg";
// import OwnShipStillIcon from "/$/home/static/icons/svg/icon-own-ship-still.svg";
import AisShipSailIcon from "/$/home/static/icons/svg/icon-ais-ship-sail.svg";
import AisShipStillIcon from "/$/home/static/icons/svg/icon-ais-ship-still.svg";
import { useCool } from "/@/cool";
import SearchViews from "/$/home/components/search-views.vue";
import { useResizeObserver } from "@vueuse/core";
import ShipInfo from "/$/home/components/ship-info.vue";
import { Close } from "@element-plus/icons-vue";
import AisRadarFilter from "/$/home/components/ais-radar-filter.vue";
import ColumnTitle from "/$/home/components/column-title.vue";
import AisRadarInfo from "/$/home/components/ais-radar-info.vue";
import LivePlayer from "@liveqing/liveplayer-v3";
import { ElMessage } from "element-plus";
import TrackView from "/$/home/components/track-view.vue";
import { hexToRGB } from "/@/cool/utils";
import _ from "lodash";
import TargetList from "/$/home/components/target-list.vue";
import CountTargets from "/$/home/components/count-targets.vue";

interface TargetCount {
	onlineCount: number;
	offlineCount: number;
	aisCount: number;
	radarCount: number;
}

const { service } = useCool();

const center = ref([109.119254, 21.473343]);
const projection = ref("EPSG:4326");
const zoom = ref(9);
const rotation = ref(0);
const sourceUrl = ref(import.meta.env.VITE_SEA_TILE_LAYER_URL);
const shipLocations = ref([]);
const shipIds = ref([]);
const homeEl = ref(null);
const mapRef = ref<any>(null);
const selectRef = ref<any>(null);
const viewRef = ref();
const dataType = ref(0);
const currentZoom = ref(9);
const selectedAisRadar = ref(null);
const selectedOwnShip = ref(null);
const videoUrl = ref();
const videoVisible = ref(false);
const liveLoading = ref(false);
const trackVisible = ref(false);
const trackDateRange = ref(null);
const trackShipId = ref(null);
// 测距
const distanceEnabled = ref(false);
// 图层管理
const layerList = ref();
// 可疑目标
const suspiciousTargets = ref<any[]>([]);
const otherTargets = ref<any[]>([]);

const leftMaxHeight = ref();
const targetCounts = ref<TargetCount>();

const selectConditions = inject("ol-selectconditions");
const selectCondition = selectConditions.singleClick;

// 定义 timer 初始值及类型
let timer: NodeJS.Timer | null = null;
const aisRadars = ref<any>(0);

const zoomChanged = (zoom: number) => {
	console.log("current zoom: " + zoom);
	// currentZoom.value = zoom;
};

// const coordinate = ref([109.119254, 21.473343]);
// const strokeWidth = ref(2);
// const strokeColor = ref("red");
// const fillColor = ref("white");
// const radius = ref(8);

const treeCheckedValues = (values: []) => {
	console.log("-> tree checked : ", values);
	shipIds.value = values;
	getLocation();
	getAisAndRadarData();
	// refreshCounts();
};

async function getLocation() {
	await service.ship.info.getLocation({ shipIds: shipIds.value }).then((res: []) => {
		console.log(res);
		shipLocations.value = res;
		mapRef.value.render();
	});
}

// 监听内容尺寸的更改，使地图尺寸进行改变
useResizeObserver(homeEl, (entries) => {
	const entry = entries[0];
	const { height } = entry.contentRect;
	leftMaxHeight.value = height - 50;
	mapRef.value.updateSize();
});

function handleTypeChange(event: number) {
	dataType.value = event;
	getAisAndRadarData();

	// viewRef.value.setCenter([104.06, 30.67]);
}

function handleShowLayers(event: any) {
	console.log("-> event: ", event);
	layerList.value = event;
}

function handleTrackPlayback(props: any) {
	const { dateRange, shipId } = props;
	console.log(dateRange);
	trackVisible.value = true;
	trackDateRange.value = dateRange;
	trackShipId.value = shipId;
}

function handleMoveCenter(position: any) {
	// viewRef.value.setCenter(position);
	viewRef.value.animate({
		center: position,
		duration: 1000
	});
}

async function getAisAndRadarData() {
	await service.ehh.data
		.query({ type: dataType.value, shipIds: shipIds.value })
		.then((res: []) => {
			aisRadars.value = res;
			mapRef.value.render();
			judgeSuspiciousTargets(res);
		});
}

async function refreshCounts() {
	await service.ship.info.statistics({ shipIds: shipIds.value }).then((res: any) => {
		targetCounts.value = res;
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
		if (item?.mmsi.startsWith("412") || item?.mmsi.startsWith("413")) {
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

const featureSelected = (event: any) => {
	console.log(event);
	if (event.selected.length == 1) {
		selectedAisRadar.value = event.selected[0].values_;
	} else {
		selectedAisRadar.value = null;
	}
};

const selectInteractionFilter = (feature: any) => {
	return feature.values_.mmsi != undefined;
};

const handleSingleClick = (event: any) => {
	console.log("-> handleSingleClick : ", event);
};

const handleShipClick = (event: any) => {
	selectedOwnShip.value = event;
};

const handleShipInfoClose = () => {
	selectedOwnShip.value = null;
};

const handleAisRadarClose = () => {
	selectRef.value.select.getFeatures().clear();
	selectedAisRadar.value = null;
};

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

const handleDistance = () => {
	distanceEnabled.value = !distanceEnabled.value;
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
			viewRef.value.setZoom(16);
			viewRef.value.animate({
				center: position,
				duration: 1000
			});
		}
	}
}

const handleSearchPosition = (e: any) => {
	const { position } = e;
	console.log(position);
	viewRef.value.setZoom(16);
	viewRef.value.animate({
		center: position,
		duration: 1000
	});
};

onMounted(async () => {
	await refreshCounts();
	timer = setInterval(() => {
		// getLocation();
		// getAisAndRadarData();
	}, 30 * 1000);
});

onBeforeUnmount(() => {
	// 清理定时器要处理 timer 的类型
	clearInterval(Number(timer));
});
</script>

<style lang="scss">
.view-home {
	.map-container {
		position: relative;
		height: calc(100vh - 110px);
	}

	.ol-zoom {
		left: 0.5em;
		bottom: 3em;
		top: unset;
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

	.tools-box {
		position: absolute;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: right;
		right: 42px;
		z-index: 3;

		.btn-distance {
			background-color: rgba(129, 154, 182, 1);
			width: 22.5px;
			height: 22.5px;
			display: flex;
			align-items: center;
			justify-content: center;
			border: #f5f5f5 solid 1px;
			border-radius: 4px;
			cursor: pointer;

			&:hover {
				background: #3779fa;
			}
		}
	}

	.overlay-content {
		background: #efefef;
		box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
		padding: 10px 20px;
		font-size: 16px;
	}

	.overlay-ship {
		z-index: -2;
		margin-top: -28px;
		margin-left: 46px;
		cursor: pointer;

		&__name {
			background: rgba(255, 255, 255, 0.8);
			padding: 2px 6px;
			width: 82px;
			margin-left: -48px;
			margin-bottom: 5px;
			border-radius: 8px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			span {
				margin-left: 4px;
				font-size: 12px;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				display: block;
			}
		}

		&__marker {
			width: 0;
			height: 0;
			border-left: 5px solid transparent;
			border-right: 5px solid transparent;
			border-bottom: 20px solid red;
			position: relative;
			margin-left: -5px;
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

	.overlay-radar {
		background: -webkit-radial-gradient(
				center,
				rgba(32, 255, 77, 0.3) 0%,
				rgba(32, 255, 77, 0) 75%
			),
			-webkit-repeating-radial-gradient(rgba(32, 255, 77, 0) 5.8%, rgba(32, 255, 77, 0) 18%, #20ff4d
						18.6%, rgba(32, 255, 77, 0) 18.9%),
			-webkit-linear-gradient(90deg, rgba(32, 255, 77, 0) 49.5%, #20ff4d 50%, #20ff4d 50%, rgba(
							32,
							255,
							77,
							0
						)
						50.2%),
			-webkit-linear-gradient(0deg, rgba(32, 255, 77, 0) 49.5%, #20ff4d 50%, #20ff4d 50%, rgba(
							32,
							255,
							77,
							0
						)
						50.2%);
		background: radial-gradient(center, rgba(32, 255, 77, 0.3) 0%, rgba(32, 255, 77, 0) 75%),
			repeating-radial-gradient(
				rgba(32, 255, 77, 0) 5.8%,
				rgba(32, 255, 77, 0) 18%,
				#20ff4d 18.6%,
				rgba(32, 255, 77, 0) 18.9%
			),
			linear-gradient(
				90deg,
				rgba(32, 255, 77, 0) 49.5%,
				#20ff4d 50%,
				#20ff4d 50%,
				rgba(32, 255, 77, 0) 50.2%
			),
			linear-gradient(
				0deg,
				rgba(32, 255, 77, 0) 49.5%,
				#20ff4d 50%,
				#20ff4d 50%,
				rgba(32, 255, 77, 0) 50.2%
			);
		transform: translate(-50%, -50%);
		border-radius: 50%;
		border: 0.2rem solid #20ff4d;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.overlay-radar:after {
		content: " ";
		display: block;
		background-image: linear-gradient(44deg, rgba(0, 255, 51, 0) 50%, #00ff33 100%);
		width: 50%;
		height: 50%;
		position: absolute;
		top: 0;
		left: 0;
		animation: radar-beam 4s infinite;
		animation-timing-function: linear;
		transform-origin: bottom right;
		border-radius: 100% 0 0 0;
	}

	@keyframes radar-beam {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
}
</style>
