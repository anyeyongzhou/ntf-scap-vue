<template>
	<div class="info-container">
		<div class="info-container__main">
			<div class="name">{{ props.port?.name }}</div>
			<div class="location">
				<el-icon color="#16ce8c"><position /></el-icon>
				<span>109.052142/21.023780</span>
			</div>
		</div>
		<el-divider border-style="dashed" />
		<div class="info-card">
			<div class="info-card__field">
				<div>港口编号：{{ props.port?.code }}</div>
				<div>所属省份：{{ props.port?.provinceName }}</div>
			</div>
			<div class="info-card__field">
				<div>联系人：{{ props.port?.personName }}</div>
				<div>联系电话：{{ props.port?.personTel }}</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" name="port-info" setup>
import { Position } from "@element-plus/icons-vue";

const props = defineProps({
	port: {
		type: Object
	}
});
</script>

<style lang="scss" scoped>
.info-container {
	margin: 6px 10px 0 10px;
	padding: 10px;
	border-radius: 5px;
	background-color: rgba(85, 96, 113, 0.75);
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

			span {
				margin-left: 4px;
			}
		}
	}

	:deep(.el-divider--horizontal) {
		margin: 8px 0;
	}

	.info-card {
		color: white;
		margin-top: 5px;
		font-size: 12px;
		border-radius: 5px;
		padding: 5px 10px 10px 10px;
		background-color: rgba(247, 247, 246, 0.1);

		&__field {
			display: flex;
			margin-top: 5px;

			div {
				flex: 1;
			}
		}
	}
}
</style>
