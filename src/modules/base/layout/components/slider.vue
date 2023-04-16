<template>
	<div class="app-slider">
		<div class="app-slider__logo">
			<img src="/logo.png" alt="logo" />
			<span v-if="!app.isFold || browser.isMini">{{ app.info.name }}</span>
		</div>

		<div class="app-slider__container">
			<b-menu />
		</div>

		<div class="app-slider__version">
			<span v-if="modeName !== 'production'">{{ modeName.toUpperCase() }} VERSION</span>
		</div>
	</div>
</template>

<script lang="ts" name="app-slider" setup>
import { useBase } from "/$/base";
import { useBrowser } from "/@/cool";
import BMenu from "./bmenu";
import { ref } from "vue";

const { browser } = useBrowser();
const { app } = useBase();
const modeName = ref(import.meta.env.VITE_MODE_NAME);
</script>

<style lang="scss">
.app-slider {
	height: 100%;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	background-color: #2f3447;

	&__logo {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80px;
		cursor: pointer;

		img {
			height: 24px;
			width: 24px;
		}

		span {
			color: #fff;
			font-weight: bold;
			font-size: 15px;
			margin-left: 10px;
			font-family: inherit;
			white-space: nowrap;
		}
	}

	&__container {
		height: calc(100% - 100px);
		overflow-y: auto;

		&::-webkit-scrollbar {
			width: 0;
			height: 0;
		}
	}

	&__menu {
		&.el-popper {
			&.is-light {
				border: 0;
			}
		}

		.el-menu {
			border-right: 0;
			background-color: transparent;

			&--popup {
				.cl-svg,
				span {
					color: #000;
				}
			}

			.el-sub-menu__title,
			&-item {
				&.is-active,
				&:hover {
					background-color: var(--color-primary) !important;

					.cl-svg,
					span {
						color: #fff;
					}
				}
			}

			.el-sub-menu__title,
			&-item,
			&__title {
				color: #eee;
				letter-spacing: 0.5px;
				height: 50px;
				line-height: 50px;

				.wrap {
					width: 100%;
				}

				.cl-svg {
					font-size: 16px;
				}

				span {
					display: inline-block;
					font-size: 12px;
					letter-spacing: 1px;
					margin-left: 10px;
					user-select: none;
				}
			}

			&--collapse {
				.wrap {
					text-align: center;

					.cl-svg {
						font-size: 18px;
					}
				}
			}
		}
	}

	&__version {
		color: gray;
		opacity: 0.5;
		text-align: center;
		font-size: 12px;
	}
}
</style>
