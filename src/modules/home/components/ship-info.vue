<template>
	<div class="info-container">
		<div class="info-container__main">
			<div class="name">{{ props.ship?.name }}</div>
			<div
				v-if="props.ship.longitude"
				class="location"
				@click="handleLocationClick(props.ship)"
			>
				<el-icon color="#16ce8c"><position /></el-icon>
				<span>
					{{ props.ship?.longitude?.toFixed(2) }}/{{ props.ship?.latitude?.toFixed(2) }}
				</span>
			</div>
		</div>
		<div class="ship-info-tabs">
			<el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
				<el-tab-pane label="船舶信息" name="0">
					<div class="info-box">
						<div class="info-card">
							<div class="info-card__field">
								<div style="flex: 1">编号：{{ props.ship?.code }}</div>
								<div style="flex: 1">MMSI：{{ props.ship?.mmsi }}</div>
							</div>
							<div class="info-card__field">
								<div style="flex: 1">呼号：{{ props.ship?.callNumber }}</div>
								<div style="flex: 1">船长：{{ props.ship?.captain }}米</div>
								<div style="flex: 1">船宽：{{ props.ship?.width }}米</div>
							</div>
							<div class="info-card__others">
								<div class="flag"></div>
								<span>其他信息</span>
							</div>
							<div class="info-card__field">
								<div style="flex: 1">
									对地航向：{{ props.ship?.cog }}{{ props.ship.cog ? "度" : "" }}
								</div>
								<div style="flex: 1">
									对地航速：{{ props.ship?.sog }}{{ props.ship.sog ? "节" : "" }}
								</div>
							</div>
							<div class="info-card__field">
								船艏向：{{ props.ship?.heading
								}}{{ props.ship.heading ? "度" : "" }}
							</div>
							<div class="info-card__field">
								最后更新时间：{{ props.ship?.updateTime }}
							</div>
						</div>
						<el-button
							v-if="props.ship?.contactTel && !confUuid"
							type="primary"
							size="small"
							style="width: 120px; margin: 0 auto"
							@click="handleCall"
							:loading="calling"
						>
							<cl-svg name="icon-call" size="14" style="margin-right: 6px" />
							呼叫（{{ props.ship?.contactTel }}）
						</el-button>
						<el-button
							v-if="confUuid"
							type="danger"
							size="small"
							style="width: 100px; margin: 0 auto"
							@click="handleHangUp"
						>
							<cl-svg name="icon-hangup" size="20" style="margin-right: 6px" />
							挂断
						</el-button>
					</div>
				</el-tab-pane>
				<el-tab-pane label="船舶轨迹" name="1">
					<div style="margin-top: 6px">
						<el-date-picker
							style="width: 94%"
							v-model="dateTime"
							type="datetimerange"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							:default-time="defaultTime"
							format="MM-DD HH:mm:ss"
							range-separator="至"
							:disabled-date="disabledDate"
							size="default"
						/>
						<el-button
							style="width: 100%; margin-top: 10px"
							type="primary"
							size="default"
							plain
							@click="handleTracks"
						>
							查询
						</el-button>
					</div>
				</el-tab-pane>
				<el-tab-pane label="视频监控" name="2">
					<div class="device-box" v-loading="deviceFetching">
						<div v-if="deviceList.length > 0">
							<div v-for="(item, index) in deviceList" :key="index">
								<div class="device-box__item" @click="handlePlayVideo(item)">
									<cl-svg name="icon-play" :size="36" />
									<div style="margin-top: 6px">
										{{ item.name }}
										<cl-svg
											:name="
												item.status === 'online'
													? 'icon-online'
													: 'icon-offline'
											"
											size="8"
											style="margin-bottom: 2px"
										/>
									</div>
								</div>
							</div>
						</div>
						<div v-else>
							<el-empty :image-size="36" description="未添加监控设备" />
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script lang="ts" name="ship-info" setup>
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import { Position } from "@element-plus/icons-vue";
import { service } from "/@/cool";
import { ElMessage } from "element-plus";
import * as _ from "lodash";

const props = defineProps({
	ship: {
		type: Object
	}
});

const emit = defineEmits(["playLive", "trackPlayback"]);

const activeName = ref<any>("0");
const confUuid = ref();
const calling = ref(false);
const deviceList = ref([]);
const deviceFetching = ref(false);

const handleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab.index, event);
	activeName.value = tab.index;
	if (_.isEqual(tab.index, "2")) {
		loadVideos();
	}
};

const disabledDate = (date: any) => {
	return date > new Date();
};

const dateTime = ref("");
const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)];

const handleLocationClick = (event: any) => {
	console.log(event);
};

const handleCall = async () => {
	calling.value = true;
	const data = {
		calleeNum: props.ship?.contactTel
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

const handleTracks = async () => {
	if (_.isEmpty(dateTime.value)) {
		ElMessage.warning("请选择开始时间和结束时间");
		return;
	}
	emit("trackPlayback", { dateRange: dateTime.value, shipId: props.ship?.mmsi });
};

const loadVideos = async () => {
	deviceFetching.value = true;
	await service.monitor.device.devices({ shipId: props.ship?.id }).then((res) => {
		console.log(res);
		deviceList.value = res;
	});
	deviceFetching.value = false;
};

const handlePlayVideo = (item: any) => {
	if (item.status !== "online") {
		ElMessage.warning("当前设备离线");
		return;
	}
	emit("playLive", item);
};
</script>

<style lang="scss" scoped>
.info-container {
	margin: 6px 10px 0 10px;
	background-color: rgba(85, 96, 113, 0.75);
	//background-color: rgba(255, 255, 255, 0.6);
	border-radius: 5px;
	padding: 10px;
	-webkit-backdrop-filter: blur(5px);
	backdrop-filter: blur(5px);

	&__main {
		display: flex;
		color: white;

		.name {
			flex: 1;
			font-size: 15px;
		}

		.location {
			display: flex;
			align-items: center;
			margin-top: 4px;
			font-size: 12px;
			cursor: pointer;

			span {
				margin-left: 4px;
			}
		}
	}
}

.ship-info-tabs {
	padding: 10px 0;

	::v-deep(.el-tabs) {
		.el-tabs__header {
			margin: 0 0 5px;
		}

		.el-tabs__nav-scroll {
			background-color: rgba(255, 255, 255, 0.6);
			border-radius: 14px;
			height: 28px;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 2px;
		}

		.el-tabs__item {
			flex: 1;
			height: 24px;
			line-height: 24px;
			//border: 1px solid #bbbfcc;
			border-radius: 24px;
			//margin: 0 8px;
			color: #666;
			font-size: 12.5px;
			//background-color: rgba(255, 255, 255, 0.6);

			&.is-active {
				color: rgba(65, 101, 215, 1);
				border-color: rgba(65, 101, 215, 1);
				background-color: rgba(255, 255, 255, 0.9);
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
			height: 0;
			border-radius: 1px;
		}

		.el-tabs__nav-wrap::after {
			display: none;
		}
	}

	.info-box {
		display: flex;
		flex-direction: column;

		.info-card {
			height: 100%;
			color: white;
			margin-top: 5px;
			font-size: 12px;
			border-radius: 5px;
			padding: 5px 10px 10px 10px;
			background-color: rgba(247, 247, 246, 0.1);
			margin-bottom: 8px;

			&__field {
				display: flex;
				margin-top: 5px;
			}

			&__others {
				font-weight: 500;
				margin: 5px 0;
				display: flex;
				align-items: center;

				.flag {
					height: 14px;
					width: 4px;
					background: #16ce8c;
					border-radius: 8px;
				}

				span {
					margin-left: 6px;
				}
			}
		}
	}
}

.device-box {
	min-height: 100px;

	&__item {
		margin-top: 8px;
		width: 160px;
		height: 90px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		cursor: pointer;
	}

	:deep(.el-empty__description p) {
		color: lightgray;
		font-size: 13px;
	}
}
</style>
