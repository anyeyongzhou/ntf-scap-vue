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
			<cl-table ref="Table" />
		</el-row>

		<el-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</el-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert">
			<template #slot-fenceIds="{ scope }">
				<select-fence v-model="scope.fenceIds" :fenceList="scope?.fenceList" />
			</template>
			<template #slot-shipIds="{ scope }">
				<select-ship v-model="scope.shipIds" :shipList="scope?.shipList" />
			</template>
			<template #slot-speed="{ scope }">
				<el-input-number v-model="scope.speed" :min="0" /><span class="ml-2">节</span>
			</template>
		</cl-upsert>
	</cl-crud>
</template>

<script lang="ts" name="warning-rule" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import SelectFence from "/$/warning/components/fence/select.vue";
import SelectShip from "/$/warning/components/ship/select.vue";
import * as _ from "lodash";

const { service } = useCool();

const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]; // '12:00:00', '08:00:00'

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{ label: "规则名称", prop: "name", required: true, component: { name: "el-input" } },
		{
			label: "规则类型",
			prop: "type",
			component: {
				name: "el-radio-group",
				options: [
					{ label: "超速报警", value: 0 },
					{ label: "低速报警", value: 1, color: "#67C23A" },
					{ label: "驶入围栏", value: 2, color: "#E6A23C" },
					{ label: "驶出围栏", value: 3, color: "#F56C6C" }
				]
			},
			value: 0,
			required: true
		},
		{
			label: "速度限值",
			prop: "speed",
			span: 8,
			required: true,
			component: { name: "slot-speed" },
			hidden: ({ scope }) => {
				return scope.type !== 0 && scope.type !== 1;
			}
		},
		{
			label: "选择围栏",
			prop: "fenceIds",
			component: {
				name: "slot-fenceIds"
			},
			required: true,
			hidden: ({ scope }) => {
				return scope.type !== 2 && scope.type !== 3;
			}
		},
		{
			label: "适用时段",
			prop: "enableTimeType",
			component: {
				name: "el-radio-group",
				options: [
					{ label: "所有时段", value: 0 },
					{ label: "具体时段", value: 1, color: "#67C23A" }
				]
			},
			value: 0,
			required: true
		},
		{
			label: "适用时间",
			prop: "useTime",
			required: true,
			component: {
				name: "el-date-picker",
				props: {
					type: "datetimerange",
					rangeSeparator: "至",
					valueFormat: "YYYY-MM-DD HH:mm:ss",
					startPlaceholder: "开始时间",
					endPlaceholder: "结束时间",
					defaultTime: defaultTime
				}
			},
			hidden: ({ scope }) => {
				console.log("=-> scope: ", scope);
				return scope.enableTimeType !== 1;
			}
		},
		{
			label: "适用船舶",
			prop: "enableShipType",
			component: {
				name: "el-radio-group",
				options: [
					{ label: "所有船舶", value: 0 },
					{ label: "具体船舶", value: 1, color: "#67C23A" }
				]
			},
			value: 0,
			required: true
		},
		{
			label: "选择船舶",
			prop: "shipIds",
			component: {
				name: "slot-shipIds"
			},
			required: true,
			hidden: ({ scope }) => {
				return scope.enableShipType !== 1;
			}
		},
		{
			label: "规则描述",
			prop: "description",
			component: { name: "el-input", props: { type: "textarea", rows: 2 } }
		},
		{
			label: "状态",
			prop: "status",
			value: true,
			component: { name: "cl-switch" }
		}
	],
	async onSubmit(data, { done, close, next }) {
		if (!_.isEmpty(data.useTime)) {
			data.beginTime = data.useTime[0];
			data.endTime = data.useTime[1];
		}
		console.log(data);
		await next({
			...data
		});
		// done 关闭加载状态
		done();
		// close 关闭弹窗
		close();
	}
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "规则名称", prop: "name" },
		{
			label: "规则类型",
			prop: "type",
			dict: [
				{ label: "超速报警", value: 0 },
				{ label: "低速报警", value: 1, color: "#67C23A" },
				{ label: "驶入围栏", value: 2, color: "#E6A23C" },
				{ label: "驶出围栏", value: 3, color: "#F56C6C" }
			]
		},
		{ label: "规则描述", prop: "description", minWidth: 120 },
		{ label: "状态", prop: "status", component: { name: "cl-switch" } },
		{
			label: "适用时段",
			prop: "enableTimeType",
			dict: [
				{ label: "所有时段", value: 0 },
				{ label: "具体时段", value: 1, color: "#67C23A" }
			]
		},
		{ label: "适用时间-起", prop: "beginTime" },
		{ label: "适用时间-止", prop: "endTime" },
		{
			label: "适用船舶",
			prop: "enableShipType",
			dict: [
				{ label: "所有船舶", value: 0 },
				{ label: "具体船舶", value: 1, color: "#67C23A" }
			]
		},
		{ label: "创建时间", prop: "createTime", minWidth: 120 },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.warning.rule
	},
	(app) => {
		app.refresh();
	}
);
</script>
