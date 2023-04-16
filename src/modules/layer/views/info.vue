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
			<template #slot-classifyId="{ scope }">
				<el-select v-model="scope.classifyId" placeholder="请选择">
					<el-option
						v-for="item in classifies"
						:key="item.id"
						:label="`${item.name}`"
						:value="`${parseInt(item.id)}`"
					/>
				</el-select>
			</template>
			<template #slot-boundary="{ scope }">
				<layer-draw v-model="scope.boundary" :type="scope.type" />
			</template>
		</cl-upsert>
	</cl-crud>
</template>

<script lang="ts" name="layer-info" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import LayerDraw from "./../components/layer-draw.vue";
import { ref } from "vue";
import { ElMessage } from "element-plus";

const { service } = useCool();

const classifies = ref<any>([]);

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{ label: "图层名称", prop: "name", required: true, component: { name: "el-input" } },
		{
			label: "颜色",
			prop: "color",
			required: true,
			value: "#409EFF",
			component: { name: "el-color-picker" }
		},
		{
			label: "图层分类",
			prop: "classifyId",
			component: { name: "slot-classifyId" },
			rules: {
				required: true,
				message: "请选择图层分类"
			}
		},
		{
			label: "类型",
			prop: "type",
			value: 0,
			component: {
				name: "el-radio-group",
				options: [
					{
						label: "点",
						value: 0
					},
					{
						label: "线",
						value: 1
					},
					{
						label: "面",
						value: 2
					}
				]
			}
		},
		{
			prop: "boundary",
			label: "图层边界",
			hook: "empty",
			component: {
				name: "slot-boundary"
			},
			required: true
		},
		{
			label: "图层描述",
			prop: "description",
			component: { name: "el-input", props: { type: "textarea", rows: 3 } }
		},
		{
			label: "是否加载",
			prop: "status",
			value: 1,
			component: {
				name: "el-radio-group",
				options: [
					{
						label: "开启",
						value: 1
					},
					{
						label: "关闭",
						value: 0
					}
				]
			}
		}
	],
	onOpen(data) {
		// 打开时
		console.log("-> OnOpen : " + JSON.stringify(data));
		service.layer.type
			.list()
			.then((res: any) => {
				classifies.value = res;
			})
			.catch((err: any) => {
				ElMessage.error(err);
			});
	}
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "图层名称", prop: "name" },
		{ label: "颜色", prop: "color" },
		{ label: "分类", prop: "classifyName" },
		{
			label: "类型",
			prop: "type",
			dict: [
				{ label: "点", value: 0 },
				{ label: "线", value: 1, color: "#67C23A" },
				{ label: "面", value: 2, color: "#e6a23c" }
			]
		},
		{ label: "图层描述", prop: "description" },
		{ label: "是否加载", prop: "status", component: { name: "cl-switch" } },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.layer.info
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
