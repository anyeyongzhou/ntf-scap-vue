<template>
	<div>
		<column-title title="图层管理" />
		<div class="layer-container">
			<el-tree
				ref="treeRef"
				v-loading="loading"
				:data="treeData"
				:props="defaultProps"
				accordion
				:expand-on-click-node="false"
				:show-checkbox="false"
			>
				<template #default="{ node, data }">
					<span class="tree-node">
						<cl-svg
							:name="data.status === 1 ? 'icon-view' : 'icon-hide'"
							size="14"
							@click="handleShowOrHide(node, data)"
						></cl-svg>
						<span
							v-if="data.color"
							class="tree-node__color"
							:style="`background:${data.color}`"
						></span>
						<span class="tree-node__label" @dblclick="handleDoubleClick(data)">
							{{ node.label }}
						</span>
						<span v-if="data.children & false">（{{ data?.children?.length }}）</span>
					</span>
				</template>
			</el-tree>
		</div>
	</div>
</template>

<script lang="ts" name="layer-views" setup>
import { nextTick, onMounted, ref } from "vue";
import { useCool } from "/@/cool";
import { ElTree } from "element-plus";
import ColumnTitle from "/$/home/components/column-title.vue";
import * as _ from "lodash";

const { service } = useCool();

const treeRef = ref<InstanceType<typeof ElTree>>();

const loading = ref<boolean>(false);

const defaultProps = {
	children: "children",
	label: "name"
};

const treeData = ref<any[]>([]);

const emit = defineEmits(["showLayers"]);

async function refresh() {
	loading.value = true;
	await service.layer.info.allLayers().then(async (res: any[]) => {
		treeData.value = res;
		await nextTick();
		getShowLayers();
	});
	loading.value = false;
}

function handleDoubleClick(data: any) {
	console.log(data);
}

function handleShowOrHide(node: any, data: any) {
	if (node.level == 1) {
		treeData.value.map((item) => {
			if (item.id === data.id) {
				item.status = item.status === 0 ? 1 : 0;
				if (item?.children?.length > 0) {
					item.children.map((child: any) => {
						child.status = item.status;
						if (child?.children?.length > 0) {
							child.children.map((childItem: any) => {
								childItem.status = item.status;
							});
						}
					});
				}
			}
			return item;
		});
	} else if (node.level == 2) {
		treeData.value.map((item) => {
			item.children.map((child: any) => {
				if (_.isEqual(child, data)) {
					if (item.children.length === 1 && item.id == child.parentId) {
						item.status = item.status === 0 ? 1 : 0;
					}
					child.status = child.status === 0 ? 1 : 0;
					if (child?.children?.length > 0) {
						child.children.map((childItem: any) => {
							childItem.status = childItem.status === 0 ? 1 : 0;
						});
					}
				}
			});
			return item;
		});
	} else if (node.level === 3 && node.isLeaf) {
		treeData.value.map((item) => {
			item.children.map((child: any) => {
				if (child?.children?.length > 0) {
					child.children.map((childItem: any) => {
						if (childItem.id === data.id) {
							if (item.children.length === 1) {
								item.status = item.status === 0 ? 1 : 0;
							}
							if (child.children.length === 1) {
								child.status = child.status === 0 ? 1 : 0;
							}
							childItem.status = childItem.status === 0 ? 1 : 0;
						}
					});
				}
			});
			return item;
		});
	}
	getShowLayers();
}

function getShowLayers() {
	const allNodes = treeRef.value?.store._getAllNodes() || [];
	const leafNodes = allNodes.filter((item) => item.isLeaf);
	const layerArray: any[] = [];
	leafNodes?.map((item) => {
		if (item?.data?.status == 1 && !item?.data.children) {
			layerArray.push(item?.data);
		}
	});
	emit("showLayers", layerArray);
}

onMounted(function () {
	refresh();
});
</script>

<style lang="scss" scoped>
.layer-container {
	background-color: rgba(85, 96, 113, 0.9);
	border-radius: 5px;
	padding: 5px;
	width: 280px;

	.tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		padding-right: 8px;

		&__label {
			margin-left: 5px;
		}

		&__color {
			width: 8px;
			height: 8px;
			border-radius: 50%;
			margin-left: 8px;
		}
	}

	/* 设置树形最外层的背景颜色和字体颜色 */
	::v-deep(.el-tree) {
		color: #fff;
		background-color: transparent;
		font-size: 12px;
	}

	/* 改变被点击节点背景颜色，字体颜色 */
	::v-deep(.el-tree-node:focus > .el-tree-node__content) {
		background-color: transparent;
		color: #fff;
	}

	/* 树节点鼠标悬浮式改变背景色，字体颜色 */
	::v-deep(.el-tree-node__content:hover) {
		background-color: #4165d7;
		color: #fff;
	}

	::v-deep(.el-tree-node__label) {
		font-size: 12px;
	}
}
</style>
