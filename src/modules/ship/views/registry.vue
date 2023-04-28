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
				<template #column-flagImg="{ scope }">
					<div class="flex items-center justify-center">
						<el-image
							class="h-9 min-w-12"
							:src="scope.row.flagImg"
							fit="cover"
						/>
					</div>
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

<script lang="ts" name="ship-registry" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{
			label: "编码",
			prop: "mid",
			required: true,
			component: { name: "el-input" },
		},
		{
			label: "国家名",
			prop: "eCountry",
			required: true,
			component: { name: "el-input" },
		},
		{
			label: "中文名",
			prop: "cCountry",
			required: true,
			component: { name: "el-input" },
		},
		{ label: "缩写", prop: "abbreviate", component: { name: "el-input" } },
		{
			label: "国旗",
			prop: "flagImg",
			component: {
				name: "upload-image",
			},
		},
	],
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "国旗", prop: "flagImg" },
		{ label: "编码", prop: "mid" },
		{ label: "国家名", prop: "eCountry" },
		{ label: "中文名", prop: "cCountry" },
		{ label: "缩写", prop: "abbreviate" },
		{ type: "op", buttons: ["edit", "delete"] },
	],
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.ship.registry,
	},
	app => {
		app.refresh();
	}
);
</script>
