<template>
	<el-upload
		ref="upload"
		class="upload-demo"
		:action="uploadUrl"
		:headers="headers"
		:multiple="true"
		:on-change="handleChange"
		:before-upload="beforeUpload"
		:on-exceed="handleExceed"
		:auto-upload="false"
	>
		<el-button size="small" type="primary" @click="handleUpload"
			>点击上传</el-button
		>
		<div slot="tip" class="el-upload__tip">
			只能上传 jpg/png 文件，且不超过 2MB
		</div>
	</el-upload>
</template>

<script setup lang="ts" name="upload-image">
import { ref } from "vue";
import { ElMessage, UploadFile, UploadFiles, ElUpload } from "element-plus";

const uploadUrl = "your_upload_url";
const headers = { Authorization: "Bearer " + localStorage.getItem("token") };
const fileList = ref<string[]>([]);
const uploadRef = ref<InstanceType<typeof ElUpload> | null>(null);

const handleChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
	if (uploadFile.status === "success") {
		ElMessage.success(`文件 ${uploadFile.name} 上传成功`);
	} else if (uploadFile.status === "fail") {
		ElMessage.error(`文件 ${uploadFile.name} 上传失败`);
	}
};

const beforeUpload = (file: any) => {
	const isJPG = file.type === "image/jpeg" || file.type === "image/png";
	const isLt2M = file.size / 1024 / 1024 < 2;

	if (!isJPG) {
		ElMessage.error("只能上传 JPG/PNG 文件！");
		return false;
	}
	if (!isLt2M) {
		ElMessage.error("每个文件大小不超过 2MB！");
		return false;
	}

	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => {
		fileList.value.push(reader.result as string);
	};

	return false;
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

<style scoped>
.upload-demo {
	margin-top: 10px;
}
</style>
