<template>
	<el-container class="h-full" direction="vertical">
		<el-header v-if="true">
			<div class="header">
				<img src="../../static/images/logo.png" alt="logo" class="w-168px" />
				<span class="sm:text-xl md:text-2xl ml-2 font-medium text-gray-500">
					{{ app.info.name }}
				</span>
			</div>
		</el-header>
		<el-main>
			<div class="login-form-content">
				<div class="box-card bg-white p-4 rounded-md shadow">
					<div class="login-title">系统登录</div>
					<el-form class="form" :disabled="saving" size="large">
						<el-form-item>
							<el-input
								placeholder="请输入用户名"
								v-model="form.username"
								maxlength="20"
								autocomplete="on"
								clearable
							>
								<template #prepend>
									<div class="i-ion-person-circle-outline text-size-normal"></div>
								</template>
							</el-input>
						</el-form-item>

						<el-form-item>
							<el-input
								placeholder="请输入密码"
								v-model="form.password"
								maxlength="20"
								autocomplete="off"
								clearable
								show-password
							>
								<template #prepend>
									<el-icon><lock /></el-icon>
								</template>
							</el-input>
						</el-form-item>

						<el-form-item>
							<el-input
								class="input-with-captcha"
								placeholder="请输入验证码"
								maxlength="4"
								v-model="form.verifyCode"
								auto-complete="off"
								@change="toLogin"
							>
								<template #prepend>
									<div class="i-ion-shield-checkmark-outline"></div>
								</template>
								<template #append>
									<captcha
										class="value"
										:ref="setRefs('captcha')"
										v-model="form.captchaId"
										@change="
											() => {
												form.verifyCode = '';
											}
										"
									/>
								</template>
							</el-input>
						</el-form-item>

						<el-button class="submit-btn" @click="toLogin" :saving="saving">
							登录
						</el-button>
					</el-form>
				</div>
			</div>
		</el-main>
		<el-footer>
			<div class="support">
				<img src="../../static/images/ntfweb-logo.png" alt="ntfweb" />
				<span>提供技术支持</span>
			</div>
		</el-footer>
	</el-container>
</template>

<script lang="ts" name="login" setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useCool } from "/@/cool";
import { useBase } from "/$/base";
import Captcha from "./components/captcha.vue";
import { Lock } from "@element-plus/icons-vue";

const { refs, setRefs, router, service } = useCool();
const { user, app } = useBase();

// 状态1
const saving = ref(false);

// 表单数据
const form = reactive({
	username: "",
	password: "",
	captchaId: "",
	verifyCode: ""
});

// 登录
async function toLogin() {
	if (!form.username) {
		return ElMessage.error("用户名不能为空");
	}

	if (!form.password) {
		return ElMessage.error("密码不能为空");
	}

	if (!form.verifyCode) {
		return ElMessage.error("图片验证码不能为空");
	}

	saving.value = true;

	try {
		// 登录
		await service.base.open.login(form).then((res) => {
			user.setToken(res);
		});

		// token 事件
		await Promise.all(app.events.hasToken.map((e) => e()));

		// 跳转
		await router.push("/");
	} catch (err: any) {
		refs.value.captcha.refresh();
		ElMessage.error(err.message);
	}

	saving.value = false;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/*const alertOpen = () => {
	ElMessageBox.alert("您已输入3次错误密码，超过5次后该账号将被锁定10分钟。", "信息提示", {
		// if you want to disable its autofocus
		// autofocus: false,
		confirmButtonText: "确定",
		callback: (action: Action) => {
			ElMessage({
				type: "info",
				message: `action: ${action}`
			});
		}
	});
};*/
</script>

<style lang="scss" scoped>
body > .el-container {
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}

.el-footer {
	color: #333;
	text-align: center;
	height: 48px;

	.support {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		img {
			width: 72px;
		}

		span {
			margin-left: 6px;
			font-size: 13px;
			color: gray;
		}
	}
}

.el-header {
	color: #333;
	height: 72px;

	.header {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 60px;

		.title {
			margin-left: 6px;
			font-size: 24px;
			color: #666666;
			font-weight: 500;
		}
	}
}

.el-main {
	background-image: url("../../static/images/bg.jpg");
	background-size: cover;
	overflow: hidden;
	height: 100%;
	text-align: center;

	.login-form-content {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: right;
		padding-right: 10%;
	}
}

.box-card {
	width: 360px;

	.login-title {
		margin-top: 10px;
		font-size: 20px;
		color: #1e70d8;
		font-weight: bold;
	}

	.el-form {
		margin: 30px 12px;

		.el-form-item {
			margin-bottom: 30px;
		}

		.input-with-captcha {
			.value {
				background-color: rgba(75, 87, 85, 0.5);
				width: 138px;
				border-top-right-radius: 3px;
				border-bottom-right-radius: 3px;
			}
		}

		.submit-btn {
			width: 100%;
			background: linear-gradient(to top left, #2f3447, #445e8e);
			color: #fff;
			font-size: 15px;
			letter-spacing: 2px;
			cursor: pointer;
			margin-top: 10px;
		}
	}
}
</style>
