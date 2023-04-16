<template>
	<div class="map-container" ref="drawRef">
		<ol-map
			ref="mapRef"
			:loadTilesWhileAnimating="true"
			:loadTilesWhileInteracting="true"
			style="width: 100%; height: 100%"
		>
			<ol-view
				ref="view"
				:center="center"
				:rotation="rotation"
				:zoom="zoom"
				:projection="projection"
			/>

			<ol-tile-layer>
				<ol-source-osm />
			</ol-tile-layer>

			<ol-tile-layer>
				<ol-source-xyz :url="sourceUrl" />
			</ol-tile-layer>

			<ol-vector-layer ref="vectorLayer">
				<ol-source-vector>
					<ol-feature>
						<ol-geom-line-string :coordinates="path"></ol-geom-line-string>
						<ol-style-flowline
							color="red"
							color2="yellow"
							:width="2"
							:width2="2"
							:arrow="1"
						/>
					</ol-feature>
					<ol-feature ref="geoMarker">
						<ol-geom-point :coordinates="position"></ol-geom-point>
						<ol-style>
							<ol-style-circle :radius="10">
								<ol-style-fill color="blue"></ol-style-fill>
								<ol-style-stroke color="blue" :width="2"></ol-style-stroke>
							</ol-style-circle>
						</ol-style>
					</ol-feature>
				</ol-source-vector>
			</ol-vector-layer>

			<ol-scaleline-control />
			<ol-zoom-control />

			<div>
				<el-button @click="handleStart">开始</el-button>
			</div>
		</ol-map>
	</div>
</template>

<script lang="ts" name="track-list" setup>
import { onMounted, ref } from "vue";
import { useResizeObserver } from "@vueuse/core";

const mapRef = ref<any>(null);
const center = ref([28.287109375, 44.73302734375001]); // [109.119254, 21.473343]
const projection = ref("EPSG:4326"); // 4326 // 3857
const zoom = ref(7);
const rotation = ref(0);
const sourceUrl = ref(import.meta.env.VITE_SEA_TILE_LAYER_URL);
const drawRef = ref(null);

let animating = ref(false);
let distance = ref(0);
let lastTime = ref();

const vectorLayer = ref();
const geoMarker = ref();

const path = ref([
	[25.6064453125, 44.73302734375001],
	[27.759765625, 44.75500000000001],
	[28.287109375, 43.32677734375001],
	[30.55029296875, 46.40294921875001],
	[31.69287109375, 43.04113281250001]
]);

const position = ref(path.value[0]);

// 监听内容尺寸的更改，使地图尺寸进行改变
useResizeObserver(drawRef, () => {
	mapRef.value.updateSize();
});

function moveFeature(event: any) {
	const speed = Number(10);
	const time = event.frameState.time;
	const elapsedTime = time - lastTime.value;
	distance.value = (distance.value + (speed * elapsedTime) / 1e6) % 2;
	lastTime.value = time;

	console.log("-> event: ", event);
}

const handleStart = () => {
	if (animating.value) {
		stopAnimation();
	} else {
		startAnimation();
	}
};

function startAnimation() {
	animating.value = true;
	lastTime.value = Date.now();
	console.log("Stop Animation");
	// mapRef.value.on("postrender", moveFeature);
	vectorLayer.value.postrender(moveFeature);
	geoMarker.value.setGeometry(null);
}

function stopAnimation() {
	animating.value = false;
	console.log("Start Animation");
	geoMarker.value.setGeometry(position);
	// mapRef.value.un("postrender", moveFeature);
	vectorLayer.value.postrender(moveFeature);
}

onMounted(() => {});
</script>

<style scoped>
.map-container {
	display: flex;
	width: 100%;
	height: 80vh;
	overflow: auto;
	background: lightgray;
}
</style>
