<template>
	<div>
		<div class="search-tabs">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="船舶搜索" name="first">
					<el-input
						v-model="mmsiInput"
						placeholder="请输入船名/MMSI"
						@change="handleMmsiChange"
						clearable
					/>
				</el-tab-pane>
				<el-tab-pane label="港口搜索" name="second">
					<el-input
						v-model="portInput"
						placeholder="请输入港口名称/编号"
						@change="handlePortChange"
						clearable
					/>
				</el-tab-pane>
				<el-tab-pane label="位置搜索" name="third">
					<el-form ref="positionFormRef" :model="positionForm" :rules="rules" status-icon>
						<el-form-item label="经度" prop="longitude">
							<el-input
								v-model="positionForm.longitude"
								placeholder="请输入经度"
								clearable
							/>
						</el-form-item>
						<el-form-item label="纬度" prop="latitude">
							<el-input
								v-model="positionForm.latitude"
								placeholder="请输入纬度"
								clearable
							/>
						</el-form-item>
					</el-form>
					<el-button style="width: 100%" type="primary" @click="onSubmit(positionFormRef)"
						>搜索</el-button
					>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div>
			<ship-info v-for="ship in shipList" :key="ship.id" :ship="ship" />
			<port-info v-for="port in portList" :key="port.id" :port="port" />
		</div>
	</div>
</template>

<script lang="ts" name="search-views" setup>
import { reactive, ref } from "vue";
import { FormInstance, TabsPaneContext } from "element-plus";
import ShipInfo from "./ship-info.vue";
import PortInfo from "./port-info.vue";
import { service } from "/@/cool";

const emit = defineEmits(["searchPosition"]);

const activeName = ref("first");
const mmsiInput = ref("");
const portInput = ref("");
const positionForm = reactive({
	longitude: "",
	latitude: ""
});
const shipList = ref<any>([]);
const portList = ref<any>([]);
const positionFormRef = ref<FormInstance>();

const validateLongitude = (rule: any, value: any, callback: any) => {
	const reg =
		/^[-+]?(((0|1?[0-7]?[0-9]?)|([1-9]?[0-9]?))(([.][0-9]{1,8})?)|180(([.][0]{1,8})?))$/;
	if (value === "") {
		callback(new Error("请输入经度"));
	} else if (!reg.test(value)) {
		callback(new Error("经度格式输入不正确"));
	} else {
		callback();
	}
};

const validateLatitude = (rule: any, value: any, callback: any) => {
	const reg = /^[-+]?([1-8]?\d(\.\d{1,8})?|90(\.0{1,8})?)$/;
	if (value === "") {
		callback(new Error("请输入纬度"));
	} else if (!reg.test(value)) {
		callback(new Error("纬度格式输入不正确"));
	} else {
		callback();
	}
};

const rules = reactive({
	longitude: [{ validator: validateLongitude, trigger: "change" }],
	latitude: [{ validator: validateLatitude, trigger: "change" }]
});

const onSubmit = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			emit("searchPosition", {
				position: [Number(positionForm.longitude), Number(positionForm.latitude)]
			});
		} else {
			console.log("error submit!");
			return false;
		}
	});
};

const handleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event);
	// shipList.value = [];
	// portList.value = [];
};

// 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发
const handleMmsiChange = async (value: string | number) => {
	if (value) {
		const data = { keyword: value };
		await service.ship.info.search(data).then((res: any[]) => {
			console.log(res);
			shipList.value = res;
		});
	} else {
		shipList.value = [];
	}
};

const handlePortChange = async (value: string | number) => {
	if (value) {
		const data = { keyword: value };
		await service.ship.port.search(data).then((res: any[]) => {
			console.log(res);
			portList.value = res;
		});
	} else {
		portList.value = [];
	}
};
</script>

<style lang="scss" scoped>
.search-tabs {
	margin: 0 10px 0 10px;
	padding: 0 10px;
	border-radius: 5px;
	background-color: rgba(65, 101, 215, 0.15);
	-webkit-backdrop-filter: blur(10px);
	backdrop-filter: blur(10px);

	.el-form-item {
		margin-bottom: 16px;
	}

	:deep(.el-tabs) {
		.el-tabs__header {
			margin: 0 0 10px;
		}

		.el-tabs__item {
			font-size: 12.5px;
			padding: 0 10px;
			height: 36px;
		}

		.el-tabs__content {
			padding-bottom: 10px;
		}
	}
}
</style>
