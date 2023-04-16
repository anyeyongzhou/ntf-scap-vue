<template>
	<div class="title">{{ props?.title }}</div>
</template>

<script lang="ts" name="column-title" setup>
const props = defineProps({
	title: {
		type: String,
		default: ""
	}
});
</script>

<style lang="scss" scoped>
.title {
	width: 100px;
	height: 24px;
	position: relative;
	color: white;
	font-size: 14px;
	display: flex;
	align-items: center;
	padding-left: 12px;
	margin-bottom: 1px;
	margin-left: 10px;

	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(43, 89, 255, 0.75);
		transform: skewX(-30deg);
		z-index: -1;
	}
}
</style>
