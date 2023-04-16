<template>
	<div class="subtitle">{{ props?.subtitle }}</div>
</template>

<script lang="ts" name="column-title" setup>
const props = defineProps({
	subtitle: {
		type: String,
		default: ""
	}
});
</script>

<style lang="scss" scoped>
.subtitle {
	width: 54px;
	position: relative;
	color: #2b59ff;
	font-size: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1px 2px;
	border-radius: 2px;
	margin: 2px 0;
	background-color: rgba(255, 255, 255, 0.6);
}
</style>
