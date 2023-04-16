<template>
	<cl-crud ref="Crud">
		<el-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />

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

<script lang="ts" name="ehh-alarm" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{ label: "船舶的MMSI", prop: "shipId", required: true, component: { name: "el-input" } },
		{
			label: "时间戳，数据发送时间，秒",
			prop: "timestamp",
			required: true,
			component: { name: "el-input" }
		},
		{
			label: "告警类型，0-取消报警，1-人员落水，2-船舶触礁，3-机舱着火",
			prop: "alarmType",
			component: { name: "el-radio-group", options: [] },
			required: true
		}
	]
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "船舶名称", prop: "shipName" },
		{ label: "船舶MMSI", prop: "shipId" },
		{
			label: "告警类型",
			prop: "alarmType",
			dict: []
		},
		{ label: "发送时间", prop: "timestamp" },
		{ type: "op", buttons: ["delete"] }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.ehh.alarm
	},
	(app) => {
		app.refresh();
	}
);
</script>
