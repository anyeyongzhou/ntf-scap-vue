<template>
	<div class="view-basic">
		<div class="title">账户密码</div>
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			:model="form"
			:rules="rules"
			:disabled="loading"
			label-position="top"
			status-icon
		>
			<el-form-item label="原密码" prop="oldPassword">
				<el-input
					v-model="form.oldPassword"
					placeholder="请填写旧密码"
					clearable
					show-password
					autocomplete="off"
				/>
			</el-form-item>

			<el-form-item label="新密码" prop="newPassword">
				<el-input
					v-model="form.newPassword"
					placeholder="请填写新密码"
					clearable
					show-password
					autocomplete="off"
				/>
				<div class="intensity">
					<div style="display: flex; align-items: center">
						<span class="psdText">密码强度</span>
						<span class="line" :class="[level.includes('low') ? 'low' : '']"></span>
						<span
							class="line"
							:class="[level.includes('middle') ? 'middle' : '']"
						></span>
						<span class="line" :class="[level.includes('high') ? 'high' : '']"></span>
					</div>
					<div class="warning-text">
						<ul>
							<li>密码应由8~20位数字、字母、符号组成</li>
							<li>数字、大小写字母以及特殊字符至少包含两种</li>
						</ul>
					</div>
				</div>
			</el-form-item>

			<el-form-item label="确认密码" prop="confirmPassword">
				<el-input
					v-model="form.confirmPassword"
					placeholder="请确认新密码"
					:show-password="true"
					clearable
					autocomplete="off"
				/>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" :disabled="loading" @click="submitForm(ruleFormRef)">
					保存修改
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts" name="password" setup>
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";
import { useBase } from "/$/base";
import { useCool } from "/@/cool";

const { service } = useCool();
const { user } = useBase();

const ruleFormRef = ref<FormInstance>();
const level = ref<string[]>([]);

// 表单数据
const form = reactive<any>({
	oldPassword: "",
	newPassword: "",
	confirmPassword: ""
});

const checkPassword = (rule: any, value: any, callback: any) => {
	level.value = [];
	if (!value) {
		return callback("密码不能为空");
	}
	if (value.length < 8) {
		return callback("密码不少于8位");
	}
	if (value.length > 20) {
		return callback("密码不大于20位");
	}
	const reg = /^(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{8,20}$/;
	if (!reg.test(value)) {
		return callback("数字、大小写字母以及特殊字符至少包含两种");
	}
	// 校验是数字
	const regex1 = /^\d+$/;
	// 校验字母
	const regex2 = /^[A-Za-z]+$/;
	// 校验符号
	const regex3 =
		/^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/;
	if (regex1.test(value)) {
		level.value.push("low");
	} else if (regex2.test(value)) {
		level.value.push("low");
	} else if (regex3.test(value)) {
		level.value.push("low");
	} else if (/^[A-Za-z\d]+$/.test(value)) {
		level.value.push("low");
		level.value.push("middle");
	} else if (
		/^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\d]+$/.test(
			value
		)
	) {
		level.value.push("low");
		level.value.push("middle");
	} else if (
		/^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z]+$/.test(
			value
		)
	) {
		level.value.push("low");
		level.value.push("middle");
	} else if (
		/^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z\d]+$/.test(
			value
		)
	) {
		level.value.push("low");
		level.value.push("middle");
		level.value.push("high");
	}
	return callback();
};

// 确认密码
function checkConfirmPassword(rule: any, value: any, callback: any) {
	if (!value) {
		return callback("请输入确认密码");
	}
	if (value != form.newPassword) {
		return callback("两次密码输入不一致，请重新输入");
	}
	return callback();
}

const rules = reactive<FormRules>({
	oldPassword: [{ required: true, message: "请填写旧密码", trigger: "blur" }],
	newPassword: [{ required: true, validator: checkPassword, trigger: "change" }],
	confirmPassword: [{ required: true, validator: checkConfirmPassword, trigger: "blur" }]
});

// 保存状态
const loading = ref(false);

const submitForm = (formEl: FormInstance | undefined) => {
	console.log(formEl);
	if (!formEl) return;
	formEl.validate((valid) => {
		console.log(valid);
		if (valid) {
			save();
		} else {
			console.log("error submit!");
			return false;
		}
	});
};

// 保存
async function save() {
	const { oldPassword, newPassword, confirmPassword } = form;
	if (newPassword !== confirmPassword) {
		ElMessage.warning("两次密码输入不一致，请重新输入");
		return;
	}
	loading.value = true;

	await service.base.comm
		.passwordUpdate({ oldPassword, newPassword })
		.then(() => {
			form.password = "";
			ElMessage.success("密码修改成功");
			user.get();
		})
		.catch((err) => {
			ElMessage.error(err.message);
		});

	loading.value = false;
}
</script>

<style lang="scss" scoped>
.view-basic {
	height: 100%;
	box-sizing: border-box;

	.el-form {
		width: 400px;
		max-width: 100%;
	}

	.title {
		margin-bottom: 30px;
		font-size: 18px;
	}

	::v-deep(.el-form-item__label) {
		//font-weight: normal;
	}

	::v-deep(.el-form-item__error) {
		font-weight: normal;
	}
}

.intensity {
	width: 100%;
	margin-top: 5px;
	border-radius: 3px;
	font-weight: normal;
	background: #f5f5f5;
	padding: 0 10px;

	.psdText {
		font-size: 12px;
		margin-right: 10px;
	}
	.line {
		display: inline-block;
		width: 60px;
		height: 4px;
		background: #d8d8d8;
		border-radius: 2px;
		margin-right: 8px;
		&.low {
			background: #f4664a;
		}
		&.middle {
			background: #ffb700;
		}
		&.high {
			background: #2cbb79;
		}
	}
	.level {
		margin: 0 16px 0 8px;
	}
	.warning-text {
		margin-bottom: 8px;
		color: gray;
		font-size: 12px;
		margin-left: 12px;

		ul {
			li {
				line-height: 20px;
			}
		}
	}
}
</style>
