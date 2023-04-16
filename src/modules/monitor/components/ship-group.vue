<template>
	<div class="ship-tree">
		<div class="ship-tree__header">
			<div>船舶列表</div>

			<ul class="ship-tree__op">
				<li @click="refresh()">
					<el-tooltip content="刷新">
						<el-icon>
							<refresh-icon />
						</el-icon>
					</el-tooltip>
				</li>
			</ul>
		</div>
		<div class="ship-tree__container">
			<el-scrollbar>
				<el-tree
					ref="treeRef"
					v-loading="loading"
					:data="treeData"
					node-key="id"
					:expand-on-click-node="false"
					:props="defaultProps"
					default-expand-all
				>
					<template #default="{ node, data }">
						<div class="ship-tree__node">
							<span
								class="ship-tree__node-label"
								:class="{
									'is-active': data.id === info?.id
								}"
								@click="rowClick(data)"
							>
								{{ node.label }}
							</span>
						</div>
					</template>
				</el-tree>
			</el-scrollbar>
		</div>
	</div>
</template>

<script lang="ts" name="ship-group" setup>
import { nextTick, onMounted, ref } from "vue";
import { useCool } from "/@/cool";
import { ElTree } from "element-plus";
import { Refresh as RefreshIcon } from "@element-plus/icons-vue";
import { revDeepTree } from "/@/cool/utils";
import { useViewGroup } from "/$/base";
const { ViewGroup } = useViewGroup();

const { service } = useCool();

const treeRef = ref<InstanceType<typeof ElTree>>();
const loading = ref<boolean>(false);

const emit = defineEmits(["row-click"]);

const defaultProps = {
	children: "children",
	label: "name"
};

const treeData = ref<any[]>([]);
// 选中
const info = ref();

// 获取 ids
function rowClick(item?: any) {
	if (!item) {
		item = treeData.value[0];
	}

	if (item) {
		const ids = item.children ? revDeepTree(item.children).map((e) => e.id) : [];
		ids.unshift(item.id);

		// 选择
		ViewGroup.value?.select(item);

		nextTick(() => {
			// 刷新列表
			return emit("row-click", { item: item, ids });
		});
	}
}

async function refresh() {
	loading.value = true;
	const data = {
		type: 0,
		showRoot: true
	};
	await service.ship.info.getList(data).then((res: any[]) => {
		treeData.value = res;

		if (!info.value) {
			info.value = treeData.value[0];
		}
		// 模拟点击
		rowClick(info.value);
	});
	loading.value = false;
}

onMounted(async function () {
	await refresh();
});
</script>

<style lang="scss" scoped>
.ship-tree {
	height: 100%;
	width: 100%;

	:deep(.el-tree-node__label) {
		display: block;
		height: 100%;
		width: 100%;
	}

	&__header {
		display: flex;
		align-items: center;
		height: 40px;
		padding: 0 10px;
		letter-spacing: 1px;
		position: relative;

		div {
			font-size: 14px;
			flex: 1;
			white-space: nowrap;
		}

		i {
			font-size: 18px;
			cursor: pointer;
		}
	}

	&__op {
		display: flex;

		li {
			display: flex;
			justify-content: center;
			align-items: center;
			list-style: none;
			margin-left: 5px;
			padding: 5px;
			cursor: pointer;

			&:not(.no):hover {
				background-color: #eee;
			}
		}
	}

	&__container {
		height: calc(100% - 40px);

		:deep(.el-tree-node__content) {
			height: 28px;
			margin: 0 5px;
		}
	}

	&__node {
		display: flex;
		align-items: center;
		height: 100%;
		width: 100%;
		box-sizing: border-box;

		&-label {
			display: flex;
			align-items: center;
			flex: 1;
			height: 100%;
			font-size: 14px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			&.is-active {
				color: var(--color-primary);
				font-weight: bold;
			}
		}
	}
}
</style>
