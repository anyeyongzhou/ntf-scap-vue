<template>
	<el-form-item label="图片" prop="photos">
		<el-upload
			action="#"
			list-type="picture-card"
			:file-list="options.photos"
			:on-change="onChangeUpload"
			:auto-upload="false"
			:on-remove="handlerRemoveImage"
			:before-remove="handlerBeforeRemove"
			:on-exceed="onUpdateExceed"
			multiple
			:limit="9"
		>
			<i class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
	</el-form-item>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import {
	ElUpload,
	ElDialog,
	ElRow,
	ElButton,
	ElMessage,
	UploadFile,
	UploadFiles,
} from "element-plus";

interface ImageUpType {
	photos: string;
}

const options: Ref<Array<ImageUpType>> = ref([
	{
		photos: "",
	},
]);

//文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
const onChangeUpload = (file: UploadFile, fileList: UploadFiles) => {
	const self = this;
	const reader = new FileReader();
	reader.onload = function (e) {
		self.beforeUpdateImg.push({
			uid: file.uid,
			photo: reader.result,
		});
	};
	reader.readAsDataURL(file.raw);
};

//文件列表移除文件时的钩子
const handlerRemoveImage = () => {};

//删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 false 或者返回 Promise 且被 reject，则停止删除。
const handlerBeforeRemove = (
	uploadFile: UploadFile,
	uploadFiles: UploadFiles
): any => {};

//当超出限制时，执行的钩子函数
const onUpdateExceed = () => {};
</script>
<style lang="scss" scoped></style>
