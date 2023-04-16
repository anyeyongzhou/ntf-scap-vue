<template>
	<div class="ptz-control">
		<div class="ptz-control__header">
			<div>云台控制</div>
		</div>
		<div class="ptz-control__content">
			<div class="ptz-control__arrow">
				<div
					class="top"
					:class="active === 'up' ? 'btn-opacity' : 'button'"
					@click="handleButtonClick('up')"
				>
					<cl-svg name="icon-arrow-up" :size="size" />
				</div>
				<div class="center">
					<div
						:class="active === 'left' ? 'btn-opacity' : 'button'"
						@click="handleButtonClick('left')"
					>
						<cl-svg name="icon-arrow-left" :size="size" />
					</div>
					<div class="point" :style="`width: ${size - 4}px; height: ${size - 4}px`"></div>
					<div
						:class="active === 'right' ? 'btn-opacity' : 'button'"
						@click="handleButtonClick('right')"
					>
						<cl-svg name="icon-arrow-right" :size="size" />
					</div>
				</div>
				<div
					class="bottom"
					:class="active === 'down' ? 'btn-opacity' : 'button'"
					@click="handleButtonClick('down')"
				>
					<cl-svg name="icon-arrow-down" :size="size" />
				</div>
			</div>
			<div class="ptz-control__zoom">
				<div
					:class="active === 'zoomin' ? 'btn-opacity' : 'button'"
					@click="handleButtonClick('zoomin')"
				>
					<cl-svg name="icon-add-bold" :size="size" />
				</div>
				<div
					:class="active === 'zoomout' ? 'btn-opacity' : 'button'"
					class="ml-2"
					@click="handleButtonClick('zoomout')"
				>
					<cl-svg name="icon-minus-bold" :size="size" style="margin-left: 6px" />
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" name="ptz-control" setup>
import { ref } from "vue";

const size = ref(28);
const active = ref("");

const emit = defineEmits(["ptz-control"]);

const handleButtonClick = (type: any) => {
	active.value = type;
	emit("ptz-control", { type });
	setTimeout(() => {
		active.value = "";
	}, 200);
};
</script>

<style lang="scss" scoped>
.ptz-control {
	display: flex;
	flex-direction: column;
	padding: 10px;
	border-top: 1px solid #d4d7df;

	&__header {
		div {
			font-size: 14px;
			flex: 1;
			white-space: nowrap;
		}
	}

	&__content {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__arrow {
		display: flex;
		height: 100%;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		//background: #2b59ff;

		.top {
			display: flex;
			justify-content: center;
		}

		.center {
			display: flex;
			justify-content: center;
			align-content: center;

			.point {
				background: lightgray;
				border-radius: 50%;
				margin: 2px;
			}
		}

		.bottom {
			display: flex;
			justify-content: center;
			flex: 1;
		}
	}

	&__zoom {
		margin-left: 30px;
		display: flex;
	}

	.button {
		cursor: pointer;
		filter: alpha(opacity=90);
		-moz-opacity: 0.9;
		-khtml-opacity: 0.9;
		opacity: 0.9;
	}

	.btn-opacity {
		cursor: pointer;
		filter: alpha(opacity=50);
		-moz-opacity: 0.5;
		-khtml-opacity: 0.5;
		opacity: 0.5;
	}
}
</style>
