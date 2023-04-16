<template>
	<div>
		<el-button type="primary" @click="handleShowDialog" size="small">选择围栏</el-button>
		<el-table :data="fenceData" style="width: 100%; margin-top: 6px" border>
			<el-table-column type="index" label="序号" width="80" align="center" />
			<el-table-column prop="name" label="围栏名称" align="center" />
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
		<cl-dialog title="选择电子围栏" v-model="dialogVisible">
			<el-table
				:data="fenceList"
				style="width: 100%"
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55" />
				<el-table-column prop="name" label="围栏名称" width="180" />
				<el-table-column prop="type" label="围栏类型" width="120" />
				<el-table-column prop="description" label="围栏描述" />
				<el-table-column prop="createTime" label="创建时间" width="180" />
			</el-table>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="handleDialogConfirm">确定</el-button>
				</span>
			</template>
		</cl-dialog>
	</div>
</template>

<script lang="ts" name="select-fence" setup>
import { onMounted, ref } from "vue";
import { service } from "/@/cool";
import * as _ from "lodash";

const dialogVisible = ref(false);
const fenceList = ref([]);
const multipleSelection = ref([]);
const fenceData = ref<any>([]);

const props = defineProps({
	fenceList: {
		type: Array
	}
});

const emit = defineEmits(["update:modelValue"]);

const handleShowDialog = () => {
	dialogVisible.value = true;
	getFenceList();
};

const getFenceList = () => {
	service.supervise.fence.list().then((res: any) => {
		console.log(res);
		fenceList.value = res;
	});
};

const handleSelectionChange = (val: any) => {
	multipleSelection.value = val;
};

const deleteRow = (index: number) => {
	fenceData.value.splice(index, 1);
	const selectedIds = _.map(fenceData.value, "id");
	emit("update:modelValue", selectedIds);
};

const handleDialogConfirm = () => {
	dialogVisible.value = false;
	fenceData.value = multipleSelection.value;
	const selectedIds = _.map(fenceData.value, "id");
	emit("update:modelValue", selectedIds);
};

onMounted(() => {
	fenceData.value = props.fenceList!;
});
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
	margin-right: 10px;
}
</style>
