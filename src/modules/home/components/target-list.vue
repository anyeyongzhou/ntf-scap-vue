<template>
	<div>
		<column-subtitle :subtitle="props.title" />
		<div class="target-container">
			<vue3-seamless-scroll
				v-if="props.list?.length > 0"
				:list="Array.isArray(props.list) ? props.list : []"
				class="scroll"
				:step="0.5"
				hover
			>
				<target-item
					v-for="(item, index) in props.list"
					:key="index"
					:target="item"
					@trackTarget="handleTrackTarget"
				/>
			</vue3-seamless-scroll>
			<el-empty v-if="props.list?.length === 0" description="暂无数据" :image-size="36" />
		</div>
	</div>
</template>

<script lang="ts" name="target-other" setup>
import ColumnSubtitle from "/$/home/components/column-subtitle.vue";
import TargetItem from "/$/home/components/target-item.vue";

const props = defineProps({
	title: {
		type: String
	},
	list: {
		type: Array
	}
});

const emit = defineEmits(["trackTarget"]);

function handleTrackTarget(target: any) {
	emit("trackTarget", target);
}
</script>

<style lang="scss" scoped>
.target-container {
	border-radius: 5px;
	background-color: rgba(85, 96, 113, 0.75);
	-webkit-backdrop-filter: blur(5px);
	backdrop-filter: blur(5px);
	padding: 6px 0;

	:deep(.el-empty__description p) {
		color: lightgray;
		font-size: 13px;
	}
}

.scroll {
	height: 45vh; // 150px -> 50vh
	overflow: hidden;
	padding: 10px;

	.item {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: rgba(247, 247, 246, 0.1);
		margin: 5px auto;
		border-radius: 5px;
		padding: 5px 10px;
		color: white;
		font-size: 13px;
	}
}
</style>
