<template>
	<div class="filter-container">
		<span class="filter-container__label">筛选：</span>
		<el-checkbox-group v-model="checkList" @change="handleChange">
			<el-checkbox :label="0">
				<el-tooltip content="IP电话" placement="bottom">
					<cl-svg name="icon-tel-ip" size="16" />
				</el-tooltip>
			</el-checkbox>
			<el-checkbox :label="1">
				<el-tooltip content="视频会议" placement="bottom">
					<cl-svg name="icon-qchat" size="16" />
				</el-tooltip>
			</el-checkbox>
			<el-checkbox :label="2">
				<el-tooltip content="卫星电话" placement="bottom">
					<cl-svg name="icon-tel-satellite" size="16" />
				</el-tooltip>
			</el-checkbox>
			<el-checkbox :label="3">
				<el-tooltip content="视频监控" placement="bottom">
					<cl-svg name="icon-dvr" size="16" />
				</el-tooltip>
			</el-checkbox>
		</el-checkbox-group>
	</div>
</template>

<script lang="ts" name="ship-filter" setup>
import { ref } from "vue";

const emit = defineEmits(["checkedModes"]);

const checkList = ref([]);

const handleChange = (value: any) => {
	console.log(value);
	emit("checkedModes", value);
};
</script>

<style lang="scss" scoped>
.filter-container {
	width: 100%;
	background-color: rgba(85, 96, 113, 0.75);
	border-radius: 5px;
	padding: 0 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
}
</style>
