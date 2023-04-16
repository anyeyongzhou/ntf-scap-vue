<template>
	<div class="info-container">
		<div>
			MMSI: {{ props.info?.mmsi }}
			{{ props.info?.registry ? `（${props.info?.registry.cCountry}）` : "" }}
		</div>
		<div>
			位于:
			{{ `${props.info?.longitude.toFixed(2)},${props.info?.latitude.toFixed(2)}` }}
		</div>
		<div>对地航向：{{ props.info?.cog }}度</div>
		<div>对地航速：{{ props.info?.sog }}节</div>
		<div>数据来源：{{ props.info?.type === 1 ? "AIS" : "雷达" }}</div>
		<div>更新时间：{{ props.info?.updateTime }}</div>
	</div>
</template>

<script lang="ts" name="ais-radar-info" setup>
const props = defineProps({
	info: {
		type: Object
	}
});
</script>

<style lang="scss" scoped>
.info-container {
	border-radius: 5px;
	font-size: 12px;
	padding: 10px;
	margin-bottom: -10px;
	background-color: rgba(85, 96, 113, 0.85);
	-webkit-backdrop-filter: blur(5px);
	backdrop-filter: blur(5px);
	line-height: 18px;
}
</style>
