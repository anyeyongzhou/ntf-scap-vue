<template>
	<div class="view-my">
		<el-tabs tab-position="left" style="height: 100%" class="info-tabs">
			<el-tab-pane label="基本信息">
				<basic />
			</el-tab-pane>
			<el-tab-pane label="账户密码">
				<password />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script lang="ts" name="my-info" setup>
import Basic from "/$/base/views/components/info/basic.vue";
import Password from "/$/base/views/components/info/password.vue";
</script>

<style lang="scss">
.view-my {
	background-color: var(--el-bg-color);
	height: 100%;
	padding: 20px 40px;
	box-sizing: border-box;
}

.info-tabs > .el-tabs__content {
	padding: 5px 30px;
	color: #6b778c;
	font-size: 32px;
	font-weight: 600;
}
</style>
