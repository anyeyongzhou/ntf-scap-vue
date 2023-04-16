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
			<template #slot-province="{ scope }">
				<el-select v-model="scope.provinceCode" placeholder="请选择省份" filterable>
					<el-option
						v-for="item in provinces"
						:key="item.code"
						:label="item.name"
						:value="item.code"
					></el-option>
				</el-select>
			</template>
			<template #slot-boundary="{ scope }">
				<layer-draw v-model="scope.boundary" :type="2" />
			</template>
		</cl-upsert>
	</cl-crud>
</template>

<script lang="ts" name="ship-port" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import provinces from "./../utils/provinces.json";
import LayerDraw from "../../layer/components/layer-draw.vue";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{ label: "港口名称", prop: "name", required: true, component: { name: "el-input" } },
		{ label: "港口编号", prop: "code", component: { name: "el-input" }, required: true },
		{
			label: "颜色",
			prop: "color",
			required: true,
			value: "#409EFF",
			component: { name: "el-color-picker" }
		},
		{
			label: "港口范围",
			prop: "boundary",
			required: true,
			component: { name: "slot-boundary" }
		},
		{
			label: "港口描述",
			prop: "description",
			component: { name: "el-input", props: { type: "textarea", rows: 2 } }
		},
		{
			label: "所属省份",
			prop: "provinceCode",
			component: {
				name: "slot-province"
			},
			required: true
		},
		{ label: "联系人", prop: "personName", required: true, component: { name: "el-input" } },
		{
			label: "联系电话",
			prop: "personTel",
			required: true,
			component: { name: "el-input" }
		},
		{
			label: "备注",
			prop: "remark",
			component: { name: "el-input", props: { type: "textarea", rows: 2 } }
		}
	],
	async onSubmit(data, { next }) {
		const province = provinces.find((e) => e.code === data.provinceCode);
		await next({
			...data,
			provinceName: province?.name
		});
	}
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "港口名称", prop: "name" },
		{ label: "港口编号", prop: "code" },
		{ label: "颜色", prop: "color" },
		{ label: "所属省份", prop: "provinceName" },
		{ label: "联系人", prop: "personName" },
		{ label: "联系电话", prop: "personTel" },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.ship.port
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
