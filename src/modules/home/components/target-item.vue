<template>
	<div class="target-item">
		<div class="target-item__info">
			<div class="content">
				<cl-svg name="icon-ship-white" :size="14"></cl-svg>
				<span style="margin-left: 5px">
					{{
						props.target?.type === 1
							? props.target?.mmsi
							: props.target?.mmsi.length > 8
							? props.target?.mmsi
							: props.target?.number
					}}
				</span>
				<div
					style="margin-left: 6px; display: flex; align-items: center"
					v-if="
						props.target.registry &&
						props.target?.registry?.mid !== '412' &&
						props.target?.registry?.mid !== '413'
					"
				>
					<el-image
						:src="props.target?.registry?.flagImg"
						style="width: 16px; height: 12px"
					></el-image>
					<span style="font-size: 12px; margin-left: 3px">
						{{ `- ${props.target?.registry?.cCountry}` }}
					</span>
				</div>
			</div>
			<span style="margin-top: 5px">
				{{ `${props.target?.longitude.toFixed(2)},${props.target.latitude.toFixed(2)}` }}
			</span>
		</div>
		<el-button type="primary" size="small" @click="handleTrack">追踪</el-button>
	</div>
</template>

<script lang="ts" name="target-item" setup>
const props = defineProps({
	target: {
		type: Object
	}
});

const emit = defineEmits(["trackTarget"]);

function handleTrack() {
	emit("trackTarget", props.target);
}
</script>

<style lang="scss" scoped>
.target-item {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	background-color: rgba(247, 247, 246, 0.1);
	margin: 5px auto;
	border-radius: 5px;
	padding: 5px 10px;
	color: white;
	font-size: 13px;
	align-items: center;

	&__info {
		display: flex;
		flex-direction: column;
	}

	.content {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
}
</style>
