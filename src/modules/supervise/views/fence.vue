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
				<template #column-color="{ scope }">
					<div class="color-box">
						<div class="color-view" :style="{ background: scope.row.color }" />
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
		<cl-upsert ref="Upsert">
			<template #slot-boundary="{ scope }">
				<layer-draw v-model="scope.boundary" :type="scope.type" />
			</template>
		</cl-upsert>
	</cl-crud>
</template>

<script lang="ts" name="supervise-fence" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import LayerDraw from "../../layer/components/layer-draw.vue";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{ label: "围栏名称", prop: "name", required: true, component: { name: "el-input" } },
		{
			label: "颜色",
			prop: "color",
			required: true,
			value: "#409EFF",
			component: { name: "el-color-picker" }
		},
		{
			label: "围栏类型",
			prop: "type",
			value: 3,
			component: {
				name: "el-radio-group",
				options: [
					{ label: "多边形", value: 2, color: "#67C23A" },
					{ label: "矩形", value: 3 }
				]
			}
		},
		{
			label: "围栏边界",
			prop: "boundary",
			required: true,
			component: { name: "slot-boundary" }
		},
		{
			label: "围栏描述",
			prop: "description",
			component: { name: "el-input", props: { type: "textarea", rows: 2 } }
		}
	]
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "围栏名称", prop: "name" },
		{ label: "颜色", prop: "color" },
		{
			label: "围栏类型",
			prop: "type",
			dict: [
				{ label: "矩形", value: 3 },
				{ label: "多边形", value: 2, color: "#67C23A" }
			]
		},
		{ label: "围栏描述", prop: "description" },
		{ label: "创建时间", prop: "createTime" },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.supervise.fence
	},
	(app) => {
		app.refresh();
	}
);
</script>

<style lang="scss" scoped>
.color-box {
	display: flex;
	align-items: center;
	justify-content: center;

	.color-view {
		width: 16px;
		height: 16px;
		border-radius: 8px;
		border: 1px #f5f5f5 solid;
	}
}
</style>
