<template>
	<cl-crud ref="Crud">
		<el-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn v-if="false" />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key />
		</el-row>

		<el-row>
			<!-- 数据表格 -->
			<cl-table ref="Table">
				<template #column-photoUrls="{ scope }">
					<photo-viewer :urls="scope.row.urls" />
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

<script lang="ts" name="enforcement-photo" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import PhotoViewer from "/$/enforcement/components/photo-viewer.vue";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{ label: "执法主题", prop: "subject", required: true, component: { name: "el-input" } },
		{
			label: "拍照Urls",
			prop: "urls",
			component: { name: "cl-upload", props: { listType: "text", multiple: true } },
			required: true
		}
	]
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "执法主题", prop: "subject", minWidth: 80 },
		{ label: "执法人", prop: "userName", minWidth: 60 },
		{ label: "照片", prop: "photoUrls", align: "left", minWidth: 120 },
		{ label: "创建时间", prop: "createTime", minWidth: 80 },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.enforcement.photo
	},
	(app) => {
		app.refresh();
	}
);
</script>
