<template>
	<el-upload
		class="avatar-uploader"
		action="#"
		multiple
		:auto-upload="false"
		:show-file-list="false"
		:before-upload="beforeUpload"
		@change="changeHandler"
	>
		<img v-if="imageUrl" :src="imageUrl" class="avatar" />
		<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
	</el-upload>
</template>

<script setup lang="ts" name="upload-image">
import { ref } from "vue";
import { ElMessage, UploadFile, UploadFiles, ElUpload } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";

const imageUrl = ref("");

const handleAvatarSuccess: UploadProps["onSuccess"] = (
	response,
	uploadFile
) => {
	imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = rawFile => {
	if (rawFile.type !== "image/jpeg") {
		ElMessage.error("Avatar picture must be JPG format!");
		return false;
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error("Avatar picture size can not exceed 2MB!");
		return false;
	}
	return true;
};

const uploadUrl = "your_upload_url";
const headers = { Authorization: "Bearer " + localStorage.getItem("token") };
const fileList = ref<string[]>([]);
const uploadRef = ref<InstanceType<typeof ElUpload> | null>(null);

const changeHandler = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
	if (uploadFile.status === "success") {
		ElMessage.success(`文件 ${uploadFile.name} 上传成功`);
	} else if (uploadFile.status === "fail") {
		ElMessage.error(`文件 ${uploadFile.name} 上传失败`);
	}
	// const reader = new FileReader();
	// const blob = new Blob([uploadFile.raw], { type: uploadFile.type });
	// reader.readAsDataURL(blob);
	// reader.onload = () => {
	// 	fileList.value.push(reader.result as string);
	// };
};

const beforeUpload = (file: any): any => {
	console.log("进入 beforeUpload");
	const isJPG = file.type === "image/jpeg" || file.type === "image/png";
	const isLt2M = file.size / 1024 / 1024 < 2;

	if (!isJPG) {
		ElMessage.error("只能上传 JPG/PNG 文件！");
		return Promise.reject();
	}
	if (!isLt2M) {
		ElMessage.error("每个文件大小不超过 2MB！");
		return Promise.reject();
	}

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("beforeUpload 校验通过");
			//resolve();
		}, 0);
	});
};

const handleExceed = (files: any) => {
	ElMessage.warning(
		`当前限制选择 ${files.length} 个文件，本次选择了 ${files.length} 个文件`
	);
};

const handleUpload = () => {
	// 将 fileList 数组中的图片转为 Base64 格式
	const base64List = fileList.value.map((file: any) => {
		const arr = file.split(",");
		return arr[1];
	});

	// 发送上传请求
	// axios.post(uploadUrl, { images: base64List }, { headers })
	//   .then(response => {
	//     // 处理上传成功的响应
	//   })
	//   .catch(error => {
	//     // 处理上传失败的响应
	//   });

	fileList.value.splice(0);
	uploadRef.value!.clearFiles();
};
</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
</style>
