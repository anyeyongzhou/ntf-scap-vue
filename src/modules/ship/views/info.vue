<template>
	<cl-crud ref="Crud">
		<el-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key />
		</el-row>

		<el-row>
			<!-- 数据表格 -->
			<cl-table ref="Table">
				<template #column-builtYear="{ scope }">
					{{ dayjs(scope.row.builtYear).format("YYYY") }}
				</template>
			</cl-table>
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

<script lang="ts" name="ship-info" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import dayjs from "dayjs";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{
			label: "船舶名称",
			prop: "name",
			span: 12,
			required: true,
			component: { name: "el-input" }
		},
		{
			label: "船舶编号",
			prop: "code",
			span: 12,
			component: { name: "el-input" },
			required: true
		},
		{
			label: "所属船队",
			prop: "fleetId",
			span: 12,
			required: true,
			component: { name: "el-select", options: [] }
		},
		{
			label: "所属港口",
			prop: "portId",
			span: 12,
			required: true,
			component: { name: "el-select", options: [] }
		},
		{
			label: "MMSI编号",
			prop: "mmsi",
			span: 12,
			required: true,
			component: { name: "el-input" }
		},
		{
			label: "IMO编号",
			prop: "imo",
			span: 12,
			required: true,
			component: { name: "el-input" }
		},
		{
			label: "呼号",
			prop: "callNumber",
			span: 12,
			required: true,
			component: { name: "el-input" }
		},
		{
			label: "船籍",
			prop: "nationality",
			span: 12,
			required: true,
			component: { name: "el-input" }
		},
		{
			label: "船长(米)",
			prop: "captain",
			span: 12,
			required: true,
			component: { name: "el-input-number", props: { "controls-position": "right", min: 1 } }
		},
		{
			label: "船宽(米)",
			prop: "width",
			span: 12,
			required: true,
			component: { name: "el-input-number", props: { "controls-position": "right", min: 1 } }
		},
		{
			label: "吃水深度(米)",
			prop: "draft",
			span: 12,
			required: true,
			component: { name: "el-input-number", props: { "controls-position": "right", min: 1 } }
		},
		{
			label: "建造年份",
			prop: "builtYear",
			span: 12,
			required: true,
			component: {
				name: "el-date-picker",
				props: { type: "year", placeholder: "请选择建造年份" }
			}
		},
		{
			label: "载重(吨)",
			prop: "deadweight",
			span: 12,
			required: true,
			component: { name: "el-input-number", props: { "controls-position": "right", min: 1 } }
		},
		{
			label: "总吨位(吨)",
			prop: "grossTonnage",
			span: 12,
			component: { name: "el-input-number", props: { "controls-position": "right", min: 1 } },
			required: true
		},
		{
			label: "最大航速(节)",
			prop: "maxSpeed",
			span: 12,
			required: true,
			component: { name: "el-input-number", props: { "controls-position": "right", min: 1 } }
		},
		{
			label: "经济船速(节)",
			prop: "economicSpeed",
			span: 12,
			required: true,
			component: { name: "el-input-number", props: { "controls-position": "right", min: 1 } }
		},
		{
			label: "联系电话",
			prop: "contactTel",
			span: 12,
			required: true,
			component: { name: "el-input" }
		},
		{
			label: "船舶类型",
			prop: "type",
			component: {
				name: "el-radio-group",
				options: [
					{ label: "渔船", value: 0 },
					{ label: "执法船", value: 1, color: "#67C23A" }
				]
			},
			value: 0
		},
		{
			label: "通讯方式",
			prop: "contactTypes",
			component: {
				name: "el-checkbox-group",
				options: [
					{ label: "IP电话", value: 0 },
					{ label: "视频会议", value: 1 },
					{ label: "卫星电话", value: 2 },
					{ label: "视频监控", value: 3 }
				]
			}
		},
		{
			label: "备注",
			prop: "remark",
			component: { name: "el-input", props: { type: "textarea", rows: 2 } }
		}
	],
	async onOpen() {
		const fleetList = await service.ship.fleet.list();
		// 设置船队列表
		Upsert.value?.setOptions(
			"fleetId",
			fleetList.map((e) => {
				return {
					label: e.name || "",
					value: e.id
				};
			})
		);

		const portList = await service.ship.port.list();
		// 设置港口列表
		Upsert.value?.setOptions(
			"portId",
			portList.map((e) => {
				return {
					label: e.name || "",
					value: e.id
				};
			})
		);
	}
});

// cl-table 配置
const Table = useTable({
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
				{ label: "IP电话", value: 0 },
				{ label: "视频会议", value: 1, color: "#67C23A" },
				{ label: "卫星电话", value: 2, color: "#E6A23C" },
				{ label: "视频监控", value: 3, color: "#F56C6C" }
			],
			minWidth: 100
		},
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.ship.info
	},
	(app) => {
		app.refresh();
	}
);
</script>
