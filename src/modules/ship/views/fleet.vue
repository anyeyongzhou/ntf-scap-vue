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
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" name="ship-fleet" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import DeptSelect from "/$/base/views/components/dept/select.vue";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	props: {
		labelWidth: "120px"
	},
	items: [
		{ label: "船队名称", prop: "name", required: true, component: { name: "el-input" } },
		{
			label: "船队编号",
			prop: "code",
			component: { name: "el-input" },
			required: true
		},
		{
			label: "组织部门",
			prop: "departmentId",
			component: {
				vm: DeptSelect
			},
			required: true
		},
		{ label: "负责人", prop: "personName", required: true, component: { name: "el-input" } },
		{
			label: "负责人手机号",
			prop: "personTel",
			required: true,
			component: { name: "el-input" }
		},
		{
			label: "备注",
			prop: "remark",
			component: { name: "el-input", props: { type: "textarea", rows: 4 } }
		}
	],
	async onInfo(data, { done }) {
		data.departmentId = parseInt(data.departmentId);
		done(data);
	}
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "船队名称", prop: "name" },
		{ label: "船队编号", prop: "code" },
		{ label: "组织部门", prop: "departmentName" },
		{ label: "负责人", prop: "personName" },
		{ label: "负责人手机号", prop: "personTel" },
		{ label: "创建时间", prop: "createTime" },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.ship.fleet
	},
	(app) => {
		app.refresh();
	}
);
</script>
