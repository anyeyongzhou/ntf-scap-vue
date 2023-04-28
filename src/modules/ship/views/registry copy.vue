<template>
	<cl-crud ref="Crud">
		<el-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<!-- el-upload组件实现文件上传 -->
			<el-upload
				:auto-upload="false"
				:show-file-list="false"
				multiple
				@change="handleChange"
			>
				<template #trigger>
					<el-button type="primary">批量上传图片</el-button>
				</template>
			</el-upload>
			<!-- 弹框展示选择的图片 -->
			<el-dialog
				title="上传文件列表"
				v-model="dialogVisible"
				class="dialog_class"
			>
				<div
					v-for="(item, index) in fileListDialog"
					:key="index"
					class="dialog_div_class"
				>
					<div class="file-name">{{ item.name }}</div>
					<el-button
						type="danger"
						icon="el-icon-delete"
						@click="handleDelete(index)"
						>删除</el-button
					>
				</div>
				<!-- 确认上传按钮 -->
				<span slot="footer" class="dialog-footer">
					<el-button
						type="primary"
						:loading="uploading"
						@click="handleUpload"
						>确定上传</el-button
					>
					<el-button @click="dialogVisible = false">取消</el-button>
				</span>
			</el-dialog>
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key />
		</el-row>

		<el-row>
			<!-- 数据表格 -->
			<cl-table ref="Table">
				<template #column-flagImg="{ scope }">
					<div class="flex items-center justify-center">
						<el-image
							class="h-9 min-w-12"
							:src="scope.row.flagImg"
							fit="cover"
						/>
					</div>
				</template>
			</cl-table>
		</el-row>

		<el-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</el-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" name="ship-registry" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
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

defineEmits(["uploadSuccess"]);

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{
			label: "编码",
			prop: "mid",
			required: true,
			component: { name: "el-input" },
		},
		{
			label: "国家名",
			prop: "eCountry",
			required: true,
			component: { name: "el-input" },
		},
		{
			label: "中文名",
			prop: "cCountry",
			required: true,
			component: { name: "el-input" },
		},
		{ label: "缩写", prop: "abbreviate", component: { name: "el-input" } },
		{ label: "国旗", prop: "flagImg", component: { name: "cl-upload" } },
	],
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "国旗", prop: "flagImg" },
		{ label: "编码", prop: "mid" },
		{ label: "国家名", prop: "eCountry" },
		{ label: "中文名", prop: "cCountry" },
		{ label: "缩写", prop: "abbreviate" },
		{ type: "op", buttons: ["edit", "delete"] },
	],
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.ship.registry,
	},
	app => {
		app.refresh();
	}
);

//控制弹窗是否出现
const dialogVisible = ref(false);
//选择所有待传图片handleChange执行完毕，存储所有图片的数组
const fileList: Ref<Array<UploadFile>> = ref([]);
//
const fileListDialog: Ref<Array<UploadFile>> = ref([]);
//控制进度条展示
const uploading = ref(false);

//是否再次进入handleChange方法
let isHandlingChange = false;
//选择完所有需要上传的图片之后，进行检查，检查通过弹出弹窗
const handleChange = (
	uploadFile: UploadFile,
	uploadFiles: UploadFiles
): void => {
	fileList.value.push(uploadFile);
	if (isHandlingChange) {
		return;
	}
	isHandlingChange = true;
	let fileType = uploadFile.name.split(".").pop()?.toLowerCase();
	const isJPG = fileType === "jpg" || fileType === "png";
	const isLt2M = uploadFile.size! / 1024 / 1024 < 2;

	if (!isJPG) {
		ElMessage.error("只能上传JPG/PNG文件！");
	}

	if (!isLt2M) {
		ElMessage.error("每个文件大小不超过2MB！");
	} else {
		setTimeout(() => {
			handleShowDialog();
			isHandlingChange = false;
		}, 2000);
	}
};

//图片检查通过触发弹窗出现
const handleShowDialog = (): void => {
	fileListDialog.value = fileList.value;
	dialogVisible.value = true; // 展开弹框
	fileList.value = [];
};

//上传结束：成功/失败 弹窗消失
const handleUploadCancel = (): void => {
	dialogVisible.value = false;
	fileList.value = [];
	fileListDialog.value = [];
};

//手动删除图片列表中不需要上传的图片
const handleDelete = (index: number): void => {
	fileListDialog.value.splice(index, 1);
};

//上传图片到后台
const handleUpload = (): void => {
	if (!fileListDialog.value.length) {
		return;
	}
	uploading.value = true;

	const formData = new FormData();
	console.log(fileListDialog);
	fileListDialog.value.forEach((file: any) => {
		formData.append("files", file);
	});

	console.log(formData);

	// 这里需要调用后端接口完成文件上传，请结合实际情况进行修改

	setTimeout(() => {
		ElMessage.success("上传成功！");
		handleUploadCancel();
	}, 2000);
};
</script>

<style lang="scss">
.dialog_class {
	position: absolute;
}
.dialog_div_class {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 0;
}
</style>
