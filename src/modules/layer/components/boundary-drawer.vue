<template>
	<div id="map" class="w-full h-full"></div>
</template>

<script lang="ts" name="boundary-drawer" setup>
import * as control from "ol/control";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { XYZ } from "ol/source";
import { onMounted, PropType, ref } from "vue";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Circle, Fill, Stroke, Style } from "ol/style";
import { Draw, Modify } from "ol/interaction";
import GeometryType from "ol/geom/GeometryType";
import { createBox } from "ol/interaction/Draw";

const props = defineProps({
	zones: Array as PropType<any>,
	type: {
		type: String as PropType<GeometryType>, // GeometryType
		default: "Polygon"
	},
	modifyEnabled: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(["updateFeature"]);

const viewRef = ref();
const mapRef = ref<any>(null);
const center = ref([109.119254, 21.473343]);
const layerSource = ref();
const boundaryDraw = ref();
const boundaryModify = ref();

function initMap() {
	console.log("--> initMap()");
	const scaleLineControl = new control.ScaleLine();
	layerSource.value = new VectorSource({ wrapX: false, features: props.zones });
	const _vector = new VectorLayer({
		source: layerSource.value,
		style: new Style({
			fill: new Fill({
				color: "rgba(49,173,252, 0.4)"
			}),
			stroke: new Stroke({
				color: "#0099FF",
				width: 3
			}),
			image: new Circle({
				radius: 7,
				fill: new Fill({
					color: "#0099FF"
				})
			})
		})
	});

	viewRef.value = new View({
		// 地图视图
		projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3857
		center: center.value, // 深圳坐标
		minZoom: 2, // 地图缩放最小级别
		maxZoom: 16, // 地图缩放最大级别
		zoom: 11 // 地图缩放级别（打开页面时默认级别）
	});
	// 地图实例
	mapRef.value = new Map({
		target: "map", // 对应页面里 id 为 map 的元素
		layers: [
			// 图层
			// new Tile({
			// 	source: new OSM()
			// }),
			new TileLayer({
				source: new XYZ({
					url: import.meta.env.VITE_SEA_TILE_LAYER_URL
				})
			}),
			_vector
		],
		view: viewRef.value,
		controls: control.defaults().extend([scaleLineControl])
	});
	console.log("-> modifyEnabled: ", props.modifyEnabled);
	if (props.modifyEnabled) {
		modifyFeature();

		const feature = layerSource.value.getFeatures()[0];
		const geometry = feature.getGeometry();
		viewRef.value.fit(geometry);
	} else {
		addDrawInteraction();
	}
}

function addDrawInteraction() {
	if (props.type === "Circle") {
		boundaryDraw.value = new Draw({
			source: layerSource.value,
			type: props.type,
			geometryFunction: createBox()
		});
	} else {
		boundaryDraw.value = new Draw({
			source: layerSource.value,
			type: props.type
		});
	}
	boundaryDraw.value.on("drawend", (event: any) => {
		console.log("画完了", event.feature);
		mapRef.value.removeInteraction(boundaryDraw.value);
		emit("updateFeature", { feature: event.feature });
	});
	mapRef.value.addInteraction(boundaryDraw.value);
}

function modifyFeature() {
	boundaryModify.value = new Modify({
		source: layerSource.value
	});
	boundaryModify.value.on("modifyend", function (event: any) {
		if (event.features && event.features.getArray().length) {
			//add this line
			console.log(
				"-> feature id is",
				event.features.getArray()[0].getGeometry().getCoordinates()[0]
			);
			emit("updateFeature", { feature: event.feature });
		}
	});
	mapRef.value.addInteraction(boundaryModify.value);
}

onMounted(() => {
	initMap();
});
</script>

<style scoped></style>
