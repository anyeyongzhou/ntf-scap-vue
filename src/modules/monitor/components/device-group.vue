<template>
	<div class="ship-tree">
		<div class="ship-tree__header">
			<div>设备列表</div>

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
									'is-offline': data.status === 'offline',
									'is-online': data.status === 'online'
								}"
								@click="rowClick(data)"
							>
								<cl-svg
									v-if="data.status && false"
									:name="`icon-${data.status}`"
									:size="10"
									style="margin-right: 4px"
								/>
								<el-icon
									v-if="!_.isEmpty(data.status)"
									style="margin-right: 4px"
									:size="18"
									><video-camera-filled
								/></el-icon>
								{{ node.label }}
							</span>
						</div>
					</template>
				</el-tree>
			</el-scrollbar>
		</div>
	</div>
</template>

<script lang="ts" name="device-group" setup>
import { nextTick, onMounted, ref } from "vue";
import { useCool } from "/@/cool";
import { ElTree } from "element-plus";
import * as _ from "lodash";
import { Refresh as RefreshIcon, VideoCameraFilled } from "@element-plus/icons-vue";
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

// 获取 ids
function rowClick(item?: any) {
	if (!item) {
		item = treeData.value[0];
	}
	if (item && item.status) {
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
	await service.monitor.device.tree().then((res: any[]) => {
		treeData.value = res;
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

			&.is-offline {
				//color: var(--color-primary);
				color: #fc6f17;
				font-weight: 500;
			}

			&.is-online {
				color: #159848;
				font-weight: 500;
			}
		}
	}
}
</style>
