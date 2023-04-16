<template>
	<div class="ship-tree">
		<el-tabs v-model="activeName" @tab-click="handleTabsClick">
			<el-tab-pane label="船舶" name="ship" />
			<el-tab-pane label="船队" name="fleet" />
		</el-tabs>
		<div class="ship-tree__header">
			<ship-filter @checkedModes="handleCheckModes"></ship-filter>
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
					@check="handleTreeClick"
					show-checkbox
					default-expand-all
				>
					<template #default="{ node, data }">
						<span class="custom-tree-node">
							<span v-if="_.isEmpty(data.mmsi)">
								{{ node.label }}
							</span>
							<span
								v-else
								@dblclick="handleDoubleClick(node, data)"
								onselectstart="return false"
							>
								<cl-svg
									:name="data.status === 1 ? 'icon-online' : 'icon-offline'"
									size="8"
									style="margin-bottom: 2px"
								/>
								{{ node.label }}
							</span>
						</span>
					</template>
				</el-tree>
				<div style="margin: 10px 0; display: flex; justify-content: center">
					<el-button
						v-if="user?.info?.callNum && !confUuid"
						type="primary"
						size="small"
						@click="handleConfCall"
						:loading="calling"
					>
						<cl-svg name="icon-invite-conf" size="16" style="margin-right: 4px" />
						电话会议（{{ user?.info?.callNum }}）
					</el-button>
					<el-button
						v-if="confUuid"
						type="danger"
						size="small"
						style="width: 100px; margin: 0 auto"
						@click="handleHangUp"
					>
						<cl-svg name="icon-hangup" size="20" style="margin-right: 6px" />
						结束会议
					</el-button>
					<el-button color="#487aff" :dark="isDark" size="small" v-show="false">
						<cl-svg name="icon-box-select" size="16" style="margin-right: 4px" />
						选择船只
					</el-button>
				</div>
			</el-scrollbar>
		</div>
	</div>
</template>

<script lang="ts" name="ship-tree" setup>
import { nextTick, onMounted, ref } from "vue";
import { useCool } from "/@/cool";
import { ElMessage, ElTree, TabsPaneContext } from "element-plus";
import * as _ from "lodash";
import ShipFilter from "./ship-filter.vue";
import { useDark } from "@vueuse/core";
import { useBase } from "/$/base";

const isDark = useDark();
const { service } = useCool();
const { user } = useBase();

const treeRef = ref<InstanceType<typeof ElTree>>();
const loading = ref<boolean>(false);
const activeName = ref("ship");
const tabIndex = ref<number>(0);
const calling = ref<boolean>(false);
const confUuid = ref();
const checkedModes = ref([]);

const defaultProps = {
	children: "children",
	label: "name"
};

const emit = defineEmits(["checkedValues", "moveCenter"]);

const treeData = ref<any[]>([]);

async function refresh() {
	loading.value = true;
	const data = {
		type: tabIndex.value,
		modes: checkedModes.value
	};
	await service.ship.info.getList(data).then((res: any[]) => {
		treeData.value = res;
	});

	loading.value = false;
}

const handleTreeClick = () => {
	let checkedLeafNodes = treeRef.value?.getCheckedNodes(true);
	let shipIds: any = [];
	let mmsiArray: any = [];
	checkedLeafNodes?.map((item) => {
		if (!_.isEmpty(item.mmsi)) {
			shipIds.push(item.id);
			mmsiArray.push(item.mmsi);
		}
	});
	window.sessionStorage.setItem("shipIds", JSON.stringify(shipIds));
	emit("checkedValues", mmsiArray);
};

const handleDoubleClick = (node: any, data: any) => {
	// console.log("==> ", data);
	// console.log("--> ", node);
	// 是否叶子节点
	if (node.isLeaf) {
		let checkedLeafNodes = treeRef.value?.getCheckedNodes(true);
		const hasElement = checkedLeafNodes?.some((ship) => ship.id === data.id);
		console.log(hasElement);
		if (!hasElement) {
			let ids: any = [];
			checkedLeafNodes?.map((item) => {
				ids.push(item.id);
			});
			ids.push(data.id);
			treeRef.value!.setCheckedKeys(ids, false);
			handleTreeClick();
		}
		console.log(data.position);
		if (data?.position[0] && data?.position[1]) {
			emit("moveCenter", data.position);
		} else {
			ElMessage.info("该船舶位置未知");
		}
	}
};

// 加载选中船只
const loadCheckedNodes = () => {
	const shipIds = JSON.parse(window.sessionStorage.getItem("shipIds") || "[]");
	treeRef.value!.setCheckedKeys(shipIds, false);
	handleTreeClick();
};

const handleTabsClick = async (tab: TabsPaneContext) => {
	tabIndex.value = Number(tab.index);
	await refresh();
};

onMounted(async function () {
	await refresh();
	await nextTick();
	loadCheckedNodes();
});

const handleConfCall = async () => {
	// 获取选中船只信息
	let checkedLeafNodes = treeRef.value?.getCheckedNodes(true);
	console.log(checkedLeafNodes);
	if (_.isEmpty(checkedLeafNodes)) {
		ElMessage.warning("请选择参与会议船舶");
		return;
	}

	const calleeNum = _.map(checkedLeafNodes, "contactTel").toString();
	// 执行呼叫操作
	calling.value = true;
	const data = {
		calleeNum: calleeNum
	};
	await service.conference.info
		.invite(data)
		.then((res: any) => {
			confUuid.value = res?.confuuid;
		})
		.catch((err) => {
			console.log(err);
			ElMessage({
				showClose: true,
				message: err.message,
				type: "warning"
			});
		});

	calling.value = false;
};

const handleHangUp = async () => {
	const data = {
		confUuid: confUuid.value
	};
	await service.conference.info.hangUp(data).then(() => {
		confUuid.value = null;
	});
};

const handleCheckModes = async (modes: any) => {
	checkedModes.value = modes;
	await refresh();
	await nextTick();
	loadCheckedNodes();
};
</script>

<style lang="scss" scoped>
.ship-tree {
	height: 100%;
	width: 100%;
	margin-top: 10px;

	&__header {
		display: flex;
		align-items: center;
		letter-spacing: 1px;
		position: relative;

		div {
			font-size: 14px;
			flex: 1;
			white-space: nowrap;
			color: white;
		}

		i {
			font-size: 18px;
			cursor: pointer;
		}
	}

	&__container {
		height: calc(100% - 40px);
		background-color: rgba(85, 96, 113, 0.8);
		border-radius: 5px;
		padding: 5px 0;
		margin-top: 5px;
		-webkit-backdrop-filter: blur(5px);
		backdrop-filter: blur(5px);

		:deep(.el-tree-node__content) {
			height: 28px;
			margin: 0 5px;
		}
	}

	.custom-tree-node {
	}
}

/* 设置树形最外层的背景颜色和字体颜色 */
::v-deep(.el-tree) {
	color: #fff;
	background-color: transparent;
	font-size: 12px;
}

/* 设置三角形图标的颜色 */
::v-deep(.el-tree-node__expand-icon) {
	color: white;
}

::v-deep(.el-tree-node__expand-icon.is-leaf) {
	color: transparent;
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

::v-deep(.el-tabs) {
	.el-tabs__header {
		margin: 0 0 5px;
	}

	.el-tabs__item {
		height: 24px;
		line-height: 22px;
		border: 1px solid #bbbfcc;
		border-radius: 24px;
		margin: 0 4px;
		color: #666;
		font-size: 12.5px;
		background-color: rgba(255, 255, 255, 0.3);

		&.is-active {
			color: rgba(65, 101, 215, 1);
			border-color: rgba(65, 101, 215, 1);
			background-color: rgba(65, 101, 215, 0.2);
		}
	}

	&.el-tabs--top {
		.el-tabs__item.is-top:nth-child(2) {
			padding-left: 20px;
			margin-left: 0;
		}
		.el-tabs__item.is-top:last-child {
			padding-right: 20px;
		}
	}

	.el-tabs__active-bar {
		height: 2px;
		border-radius: 1px;
	}

	.el-tabs__nav-wrap::after {
		//display: none;
		position: relative;
		display: block;
		margin-top: 5px;
		background-color: #e4e7ed;
	}
}
</style>
