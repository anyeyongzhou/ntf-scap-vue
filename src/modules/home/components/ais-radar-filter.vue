<template>
	<el-radio-group style="float: right" v-model="dataType" @change="handleTypeChange" size="small">
		<el-radio-button :label="0">全部</el-radio-button>
		<el-radio-button :label="1">AIS</el-radio-button>
		<el-radio-button :label="2">雷达</el-radio-button>
	</el-radio-group>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const dataType = ref(0);

const emit = defineEmits(["checkedValue"]);

function handleTypeChange(event: number) {
	dataType.value = event;
	emit("checkedValue", event);
}
</script>

<style scoped></style>
