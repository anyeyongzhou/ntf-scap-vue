import { ModuleConfig } from "/@/cool";

export default (): ModuleConfig => {
	return {
		//注册到全局
		components: [
			() => import("./component/upload-image.vue"),
			() => import("./component/upload-images.vue"),
		],
	};
};
