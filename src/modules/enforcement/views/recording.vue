<template>
	<cl-crud ref="Crud">
		<el-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key />
		</el-row>

		<el-row>
			<!-- 数据表格 -->
			<cl-table ref="Table">
				<template #column-video="{ scope }">
					<div
						class="player-item"
						@mouseover="onMouseover(scope.row.id)"
						@mouseleave="onMouseleave()"
					>
						<div
							:class="['closes']"
							v-if="hoverId === scope.row.id"
							@click="onPlay(scope.row)"
						>
							<cl-svg name="icon-play" :size="32"></cl-svg>
							<span>{{ scope.row.duration }}</span>
						</div>
						<el-image
							style="width: 120px; height: 67.5px"
							:src="scope.row?.coverUrl"
							:zoom-rate="1.2"
							fit="cover"
						/>
					</div>
				</template>
				<template #column-videoSize="{ scope }">
					{{ formatFileSize(scope.row?.videoSize) }}
				</template>
				<template #slot-download="{ scope }">
					<el-button size="small" :icon="Download" @click="downFile(scope.row)" plain>
						下载
					</el-button>
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

		<cl-dialog
			title="视频查看"
			v-model="visible"
			:before-close="beforeVideoClose"
			:destroy-on-close="true"
			:close-on-click-modal="false"
		>
			<v3-dplayer ref="dplayerRef" :video="dplayerObj.video" />
		</cl-dialog>
	</cl-crud>
</template>

<script lang="ts" name="enforcement-recording" setup>
import { useCrud, useTable } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { Download } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { formatFileSize } from "/@/cool/utils";
import V3Dplayer from "/$/enforcement/components/v3-dplayer.vue";

const { service } = useCool();
const hoverId = ref();
const visible = ref(false);
const dplayerRef = ref();

const dplayerObj = reactive({
	video: {
		url: "" // 视频地址
	}
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ label: "视频录像", prop: "video", minWidth: 100 },
		{ label: "执法主题", prop: "subject", minWidth: 120 },
		{ label: "执法时间", prop: "startTime", minWidth: 120 },
		{ label: "文件大小", prop: "videoSize", minWidth: 100 },
		{ type: "op", buttons: ["slot-download"], hidden: true }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.enforcement.recording
	},
	(app) => {
		app.refresh({ size: 10 });
	}
);

const onMouseover = (id: any) => {
	hoverId.value = id;
};

const onMouseleave = () => {
	hoverId.value = null;
};

const onPlay = (item: any) => {
	visible.value = true;
	dplayerObj.video.url = item.videoUrl;
};

const beforeVideoClose = (done: () => void) => {
	dplayerRef.value.onDestroy();
	done();
};
</script>

<style lang="scss" scoped>
.player-item {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}

.closes {
	position: absolute;
	cursor: pointer;
	z-index: 999;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 100px;
	height: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	//background-color: red;

	span {
		color: white;
		font-size: 12px;
	}
}
</style>
