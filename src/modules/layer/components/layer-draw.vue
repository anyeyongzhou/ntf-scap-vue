<template>
	<div class="drawer-container">
		<el-input
			v-model="textarea"
			:rows="3"
			type="textarea"
			placeholder="请点击右侧按钮绘制图层"
			disabled
		/>
		<el-button type="primary" style="margin-left: 10px" @click="visible = true">绘制</el-button>
	</div>
	<cl-dialog title="图层绘制" v-model="visible" top="1%" width="95%">
		<div class="map-container">
			<boundary-drawer
				v-if="visible"
				:type="drawType"
				:zones="zones"
				:modify-enabled="modifyEnabled"
				@updateFeature="updateFeature"
			/>
		</div>
		<div class="mt-4 flex justify-end">
			<el-button @click="visible = false">取消</el-button>
			<el-button type="success" @click="handleConfirm">确定</el-button>
		</div>
	</cl-dialog>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { GeoJSON } from "ol/format";
import BoundaryDrawer from "/$/layer/components/boundary-drawer.vue";

const emit = defineEmits(["update:modelValue", "change"]);

const visible = ref(false);
const drawType = ref<any>("Polygon");
const modifyEnabled = ref(false);

const props = defineProps({
	modelValue: Array,
	type: {
		type: String,
		default: "0"
	}
});

const textarea = ref<string>("");
const zones = ref<any[]>([]);

const handleConfirm = () => {
	console.log(zones.value);
	if (zones.value.length == 0) {
		ElMessage.warning("请绘制图层");
		return;
	}
	const geometry = zones.value[0].getGeometry();
	const coordinates = geometry.getCoordinates();
	console.log(coordinates);
	textarea.value = JSON.stringify(coordinates);
	emit("update:modelValue", coordinates);
	visible.value = false;
};

function updateFeature(event: any) {
	if (event.feature) {
		zones.value = [];
		const feature = event.feature;
		zones.value.push(feature);
		modifyEnabled.value = true;
	}
}

onMounted(async () => {
	console.log("---> type: " + props.type);

	await nextTick();
	setTimeout(function () {
		textarea.value = JSON.stringify(props.modelValue!);
		console.log("--> 图层数据：", props.modelValue, props.type);

		changeDrawType(props.type);

		if (props.modelValue) {
			modifyEnabled.value = true;
			zones.value = new GeoJSON().readFeatures(generateGeoJson());
		}
		console.log(props.type, drawType.value);
	}, 300);
});

const changeDrawType = (type: string) => {
	if (parseInt(type) === 0) {
		drawType.value = "Point";
	} else if (parseInt(type) === 1) {
		drawType.value = "LineString";
	} else if (parseInt(type) === 2) {
		drawType.value = "Polygon";
	} else if (parseInt(type) === 3) {
		drawType.value = "Circle";
	}
}

const generateGeoJson = () => {
	return {
		type: "FeatureCollection",
		crs: {
			type: "name",
			properties: {
				name: "EPSG:4326"
			}
		},
		features: [
			{
				type: "Feature",
				geometry: {
					type: drawType.value,
					coordinates: props.modelValue!
				}
			}
		]
	};
};

watch(
	() => props.type,
	(newVal, oldVal) => {
		console.log("parentProp changed from", oldVal, "to", newVal);
		changeDrawType(newVal);
	}
);
</script>

<style scoped>
.drawer-container {
	display: flex;
	flex-direction: row;
}

.map-container {
	width: 100%;
	height: 80vh;
	background-color: #f5f5f5;
	overflow: auto;
	border: 1px solid #eee;
}
</style>
