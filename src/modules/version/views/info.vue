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
			<cl-table ref="Table"></cl-table>
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

<script lang="ts" name="version-info" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	props: {
		labelWidth: "120px"
	},
	items: [
		{
			label: "版本名",
			prop: "name",
			required: true,
			component: { name: "el-input", props: { placeholder: "请输入应用版本名，例如：1.0.1" } }
		},
		{
			label: "版本号",
			prop: "code",
			component: { name: "el-input", props: { placeholder: "请输入应用版本号，例如：101" } },
			required: true
		},
		{
			label: "是否强制更新",
			prop: "isForce",
			component: { name: "el-switch" }
		},
		{
			label: "更新内容",
			prop: "content",
			component: { name: "el-input", props: { type: "textarea", rows: 6 } }
		},
		{
			label: "下载链接",
			prop: "downloadUrl",
			component: { name: "cl-upload", props: { listType: "text", limit: 1, type: "file" } },
			required: true
		}
	]
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "版本名", prop: "name", minWidth: 60 },
		{ label: "版本号", prop: "code", minWidth: 60 },
		{
			prop: "isForce",
			label: "是否强制更新",
			minWidth: 80,
			component: {
				name: "cl-switch"
			}
		},
		{ label: "下载链接", prop: "downloadUrl", component: { name: "cl-link" }, minWidth: 120 },
		{ label: "更新内容", prop: "content", minWidth: 140 },
		{ label: "更新时间", prop: "updateTime", minWidth: 90 },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.version.info
	},
	(app) => {
		app.refresh();
	}
);
</script>
