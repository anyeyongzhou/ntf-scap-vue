<template>
	<cl-view-group :title="title">
		<template #left>
			<ship-group @row-click="onGroupRowClick"></ship-group>
		</template>
		<template #right>
			<cl-crud ref="Crud">
				<el-row>
					<!-- 刷新按钮 -->
					<cl-refresh-btn />
					<!-- 新增按钮 -->
					<cl-add-btn :disabled="addDisable" />
					<!-- 删除按钮 -->
					<cl-multi-delete-btn />
					<cl-flex1 />
					<!-- 关键字搜索 -->
					<cl-search-key />
				</el-row>

				<el-row>
					<!-- 数据表格 -->
					<cl-table ref="Table" />
				</el-row>

				<el-row>
					<cl-flex1 />
					<!-- 分页控件 -->
					<cl-pagination />
				</el-row>

				<!-- 新增、编辑 -->
				<cl-upsert ref="Upsert" />
			</cl-crud>
		</template>
	</cl-view-group>
</template>

<script lang="ts" name="monitor-device" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { computed, reactive, ref } from "vue";
const { service } = useCool();
import ShipGroup from "../components/ship-group.vue";
import * as _ from "lodash";

const title = computed(() => {
	return `设备列表（${selects.dept?.name || ""}）`;
});

// 选择项
const selects = reactive<any>({
	dept: {},
	ids: []
});

const addDisable = ref<boolean>(true);

// cl-upsert 配置
const Upsert = useUpsert({
	dialog: {
		width: "600px"
	},
	items: [
		{ label: "摄像头名称", prop: "name", required: true, component: { name: "el-input" } },
		{
			label: "摄像头编号",
			prop: "identifier",
			required: true,
			component: { name: "el-input" }
		},
		{ label: "全局通道号", prop: "channelNo", required: true, component: { name: "el-input" } },
		{ label: "惟一标识号", prop: "uniqueId", required: true, component: { name: "el-input" } },
		{
			label: "备注",
			prop: "remark",
			component: { name: "el-input", props: { type: "textarea", rows: 4 } }
		}
	],
	onSubmit(data, { next }) {
		next({
			...data,
			shipId: selects.dept?.id
		});
	}
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "摄像头名称", prop: "name", minWidth: "120px" },
		{ label: "摄像头编号", prop: "identifier" },
		{ label: "全局通道号", prop: "channelNo" },
		{ label: "惟一标识号", prop: "uniqueId" },
		{ label: "所属船舶", prop: "shipName", minWidth: "120px" },
		{ label: "创建时间", prop: "createTime", minWidth: "140px" },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

function onGroupRowClick({ item, ids }: any) {
	console.log(item);
	selects.dept = item;
	addDisable.value = _.isEmpty(item.mmsi);

	refresh({
		page: 1,
		shipIds: ids
	});
}

// 刷新列表
function refresh(params: any) {
	Crud.value?.refresh(params);
}

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.monitor.device
	},
	(app) => {
		app.refresh();
	}
);
</script>
