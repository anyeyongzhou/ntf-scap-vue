<template>
	<div>
		<el-image
			style="width: 48px; height: 48px; margin: 0 2px"
			v-for="(item, index) in photoList"
			:key="index"
			:src="item"
			:preview-src-list="photoList"
			fit="cover"
			:initial-index="index"
			preview-teleported
			lazy
		/>
	</div>
</template>

<script lang="ts" name="photo-viewer" setup>
import { onMounted, ref } from "vue";

const props = defineProps({
	urls: Object
});

const photoList = ref([]);

onMounted(() => {
	photoList.value = props.urls?.split(",");
});
</script>

<style lang="scss" scoped></style>
