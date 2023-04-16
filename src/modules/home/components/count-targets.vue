<template>
	<div class="flex justify-center">
		<div class="target">
			<div class="value">{{ props.targetCounts?.onlineCount }}</div>
			<div class="label"><cl-svg name="icon-online" class="icon" />在线渔船</div>
		</div>
		<div class="target">
			<div class="value">{{ props.targetCounts?.offlineCount }}</div>
			<div class="label"><cl-svg name="icon-offline" class="icon" />离线渔船</div>
		</div>
		<div class="target">
			<div class="value">{{ props.targetCounts?.radarCount }}</div>
			<div class="label"><cl-svg name="icon-radar" class="icon" size="16" />雷达目标数量</div>
		</div>
		<div class="target">
			<div class="value">{{ props.targetCounts?.aisCount }}</div>
			<div class="label"><cl-svg name="icon-ais" class="icon" size="14" />AIS目标数量</div>
		</div>
	</div>
</template>

<script lang="ts" name="count-targets" setup>
const props = defineProps({
	targetCounts: {
		type: Object,
		default: () => {
			return {
				onlineCount: 0,
				offlineCount: 0,
				radarCount: 0,
				aisCount: 0
			};
		}
	}
});
</script>

<style lang="scss" scoped>
.target {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 5px;

	.value {
		background-color: rgba(48, 56, 77, 0.65);
		padding: 5px 10px;
		border-radius: 3px;
		font-weight: bold;
		color: white;
		font-size: 16px;
	}

	.label {
		margin-top: 5px;
		font-size: 10px;
		color: #000000;
		background-color: rgba(255, 255, 255, 0.4);
		padding: 3px 10px;
		border-radius: 3px;

		.icon {
			margin-right: 4px;
		}
	}
}
</style>
