<template>
	<div class="ship-select">
		<div>
			<el-button type="primary" @click="handleShowDialog" size="small">选择船舶</el-button>
			<el-table :data="shipData" style="width: 100%; margin-top: 6px" border>
				<el-table-column type="index" label="序号" width="80" align="center" />
				<el-table-column prop="name" label="船舶名称" align="center" />
				<el-table-column prop="mmsi" label="MMSI编号" align="center" />
				<el-table-column label="操作" width="120" align="center">
					<template #default="scope">
						<el-button
							link
							type="primary"
							size="small"
							@click.prevent="deleteRow(scope.$index)"
						>
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<cl-dialog title="选择船舶" v-model="dialogVisible" width="68%" top="10vh">
			<div>
				<cl-crud ref="ShipCrud" style="height: 500px">
					<el-row>
						<cl-flex1 />
						<!-- 关键字搜索 -->
						<cl-search-key />
					</el-row>
					<el-row>
						<!-- 数据表格 -->
						<cl-table
							ref="ShipTable"
							@selection-change="handleSelectionChange"
						></cl-table>
					</el-row>

					<el-row>
						<cl-flex1 />
						<!-- 分页控件 -->
						<cl-pagination />
					</el-row>
				</cl-crud>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="handleDialogConfirm">确定</el-button>
				</span>
			</template>
		</cl-dialog>
	</div>
</template>

<script lang="ts" name="ship-select" setup>
// cl-table 配置
import { useCrud, useTable } from "@cool-vue/crud";
import { service } from "/@/cool";
import { onMounted, ref } from "vue";
import * as _ from "lodash";
import { ElMessage } from "element-plus";

const props = defineProps({
	shipList: {
		type: Array
	}
});

const dialogVisible = ref(false);
const multipleSelection = ref([]);
const shipData = ref<any>([]);

const emit = defineEmits(["update:modelValue"]);

const ShipTable = useTable({
	columns: [
		{ type: "selection" },
		{ label: "船舶名称", prop: "name", minWidth: 120 },
		{ label: "船舶编号", prop: "code", minWidth: 120 },
		{ label: "所属船队", prop: "fleetName", minWidth: 120 },
		{ label: "所属港口", prop: "portName", minWidth: 120 },
		{ label: "MMSI编号", prop: "mmsi", minWidth: 120 },
		{ label: "IMO编号", prop: "imo", minWidth: 100 },
		{ label: "呼号", prop: "callNumber", minWidth: 100 },
		{ label: "船籍", prop: "nationality" },
		{ label: "船长(米)", prop: "captain" },
		{ label: "船宽(米)", prop: "width" },
		{ label: "吃水深度(米)", prop: "draft", minWidth: 120 },
		{ label: "建造年份", prop: "builtYear", minWidth: 100 },
		{ label: "载重(吨)", prop: "deadweight" },
		{ label: "总吨位(吨)", prop: "grossTonnage", minWidth: 100 },
		{ label: "最大航速(节)", prop: "maxSpeed", minWidth: 120 },
		{ label: "经济船速(节)", prop: "economicSpeed", minWidth: 120 },
		{ label: "联系电话", prop: "contactTel", minWidth: 120 },
		{
			label: "船舶类型",
			prop: "type",
			dict: [
				{ label: "渔船", value: 0 },
				{ label: "执法船", value: 1, color: "#67C23A" }
			],
			minWidth: 100
		},
		{
			label: "通讯方式",
			prop: "contactTypes",
			dict: [
				{ label: "短波电台", value: 0 },
				{ label: "IP电话", value: 1, color: "#67C23A" },
				{ label: "视频监控", value: 2, color: "#E6A23C" },
				{ label: "天通电话", value: 3, color: "#F56C6C" }
			],
			minWidth: 100
		}
	]
});

// cl-crud 配置
const ShipCrud = useCrud(
	{
		service: service.ship.info
	},
	(app) => {
		app.refresh();
	}
);

const handleShowDialog = () => {
	dialogVisible.value = true;
};

const handleSelectionChange = (val: any) => {
	multipleSelection.value = val;
};

const handleDialogConfirm = () => {
	if (multipleSelection.value.length === 0) {
		ElMessage({
			message: "请选择船舶",
			type: "warning"
		});
		return;
	}
	dialogVisible.value = false;
	shipData.value = multipleSelection.value;

	const selectedIds = _.map(shipData.value, "id");
	emit("update:modelValue", selectedIds);
};

const deleteRow = (index: number) => {
	shipData.value.splice(index, 1);
	const selectedIds = _.map(shipData.value, "id");
	emit("update:modelValue", selectedIds);
};

onMounted(() => {
	console.log("---> ", props.shipList);
	shipData.value = props.shipList!;
});
</script>

<style lang="scss" scoped>
.ship-select {
	:deep(.cl-dialog .el-dialog__body) {
		padding: 10px;
	}
}
</style>
