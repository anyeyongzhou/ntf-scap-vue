declare namespace Eps {
	interface BaseSysDepartmentEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 部门名称
		 */
		name?: string;
		/**
		 * 上级部门ID
		 */
		parentId?: BigInt;
		/**
		 * 排序
		 */
		orderNum?: number;
		/**
		 * YMS分组ID
		 */
		groupId?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysLogEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: BigInt;
		/**
		 * 行为
		 */
		action?: string;
		/**
		 * 请求方式
		 */
		method?: string;
		/**
		 * ip
		 */
		ip?: string;
		/**
		 * ip地址
		 */
		ipAddr?: string;
		/**
		 * 参数
		 */
		params?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysMenuEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 父菜单ID
		 */
		parentId?: BigInt;
		/**
		 * 菜单名称
		 */
		name?: string;
		/**
		 * 菜单地址
		 */
		router?: string;
		/**
		 * 权限标识
		 */
		perms?: string;
		/**
		 * 类型 0：目录 1：菜单 2：按钮
		 */
		type?: number;
		/**
		 * 图标
		 */
		icon?: string;
		/**
		 * 排序
		 */
		orderNum?: number;
		/**
		 * 视图地址
		 */
		viewPath?: string;
		/**
		 * 路由缓存
		 */
		keepAlive?: boolean;
		/**
		 * 是否显示
		 */
		isShow?: boolean;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysParamEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 键位
		 */
		keyName?: string;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 数据
		 */
		data?: string;
		/**
		 * 数据类型 0:字符串 1：数组 2：键值对
		 */
		dataType?: number;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysRoleEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: string;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 角色标签
		 */
		label?: string;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 数据权限是否关联上下级
		 */
		relevance?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface BaseSysUserEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 部门ID
		 */
		departmentId?: BigInt;
		/**
		 * 姓名
		 */
		name?: string;
		/**
		 * 用户名
		 */
		username?: string;
		/**
		 * 密码
		 */
		password?: string;
		/**
		 * 密码版本, 作用是改完密码，让原来的token失效
		 */
		passwordV?: number;
		/**
		 * 昵称
		 */
		nickName?: string;
		/**
		 * 头像
		 */
		headImg?: string;
		/**
		 * 手机
		 */
		phone?: string;
		/**
		 * 邮箱
		 */
		email?: string;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 状态 0:禁用 1：启用
		 */
		status?: boolean;
		/**
		 * socketId
		 */
		socketId?: string;
		/**
		 * YMS用户ID
		 */
		userId?: string;
		/**
		 * YMS用户号码
		 */
		userNumber?: string;
		/**
		 * 分机号, 0000-9999
		 */
		extension?: string;
		/**
		 * IP电话
		 */
		callNum?: string;
		/**
		 * 推送通知DeviceToken
		 */
		deviceToken?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DemoGoodsEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 标题
		 */
		title?: string;
		/**
		 * 图片
		 */
		pic?: string;
		/**
		 * 价格
		 */
		price?: number;
		/**
		 * 分类 0-衣服 1-鞋子 2-裤子
		 */
		type?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DictInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 类型ID
		 */
		typeId?: number;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 排序
		 */
		orderNum?: number;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 父ID
		 */
		parentId?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface DictTypeEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 标识
		 */
		key?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface EhhAisEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 船舶的MMSI
		 */
		shipId?: string;
		/**
		 * 时间戳，数据发送时间，秒
		 */
		timestamp?: Date;
		/**
		 * AIS动态数据列表的size
		 */
		listDynamicSize?: number;
		/**
		 * AIS静态数据列表的size
		 */
		listStaticSize?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface EhhAlarmEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 船舶的MMSI
		 */
		shipId?: string;
		/**
		 * 时间戳，数据发送时间，秒
		 */
		timestamp?: number;
		/**
		 * 告警类型，0-取消报警，1-人员落水，2-船舶触礁，3-机舱着火
		 */
		alarmType?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface EhhRadarEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 船舶的MMSI
		 */
		shipId?: string;
		/**
		 * 时间戳，数据发送时间，秒
		 */
		timestamp?: number;
		/**
		 * 雷达数据数组的size
		 */
		listSize?: number;
		/**
		 * 原数据
		 */
		rawData?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface EnforcementDeviceEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 船舶ID
		 */
		shipId?: BigInt;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * 邮箱，长度<64
		 */
		email?: string;
		/**
		 * 分机号，必须符合企业号码段规则，默认4位数字
		 */
		extension?: string;
		/**
		 * 密码，最小长度8，最大长度64
		 */
		password?: string;
		/**
		 * YMS设备ID
		 */
		deviceId?: string;
		/**
		 * YMS设备号码
		 */
		deviceNumber?: string;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface EnforcementPhotoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: BigInt;
		/**
		 * 执法主题
		 */
		subject?: string;
		/**
		 * 拍照Urls
		 */
		urls?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface LayerInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 图层名称
		 */
		name?: string;
		/**
		 * 颜色
		 */
		color?: string;
		/**
		 * 分类ID
		 */
		classifyId?: BigInt;
		/**
		 * 类型 0-点，1-线，2-面
		 */
		type?: number;
		/**
		 * 图层边界
		 */
		boundary?: string;
		/**
		 * 图层描述
		 */
		description?: string;
		/**
		 * 是否加载 0:否 1：是
		 */
		status?: boolean;
		/**
		 * 图层备注
		 */
		remark?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface LayerTypeEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 类别名称
		 */
		name?: string;
		/**
		 * 分组描述
		 */
		description?: string;
		/**
		 * 状态 0:否 1：是
		 */
		status?: boolean;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface MonitorDeviceEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 船舶ID
		 */
		shipId?: BigInt;
		/**
		 * 摄像头名称
		 */
		name?: string;
		/**
		 * 摄像头编号
		 */
		identifier?: string;
		/**
		 * 通道号
		 */
		channelNo?: string;
		/**
		 * 惟一标识号
		 */
		uniqueId?: string;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ShipFleetEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 部门ID
		 */
		departmentId?: BigInt;
		/**
		 * 船队名称
		 */
		name?: string;
		/**
		 * 船队编号
		 */
		code?: string;
		/**
		 * 负责人
		 */
		personName?: string;
		/**
		 * 负责人手机号
		 */
		personTel?: string;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ShipInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 船舶名称
		 */
		name?: string;
		/**
		 * 船舶编号
		 */
		code?: string;
		/**
		 * 船队ID
		 */
		fleetId?: BigInt;
		/**
		 * 港口ID
		 */
		portId?: BigInt;
		/**
		 * MMSI编号
		 */
		mmsi?: string;
		/**
		 * IMO编号
		 */
		imo?: string;
		/**
		 * 呼号
		 */
		callNumber?: string;
		/**
		 * 船籍
		 */
		nationality?: string;
		/**
		 * 船长(米)
		 */
		captain?: number;
		/**
		 * 船宽(米)
		 */
		width?: number;
		/**
		 * 吃水深度(米)
		 */
		draft?: number;
		/**
		 * 建造年份
		 */
		builtYear?: Date;
		/**
		 * 载重(吨)
		 */
		deadweight?: number;
		/**
		 * 总吨位(吨)
		 */
		grossTonnage?: number;
		/**
		 * 最大航速(节)
		 */
		maxSpeed?: number;
		/**
		 * 经济船速(节)
		 */
		economicSpeed?: number;
		/**
		 * 联系电话
		 */
		contactTel?: string;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 船舶类型 0-渔船 1-执法船
		 */
		type?: number;
		/**
		 * 通讯方式 0-IP电话 1-视频会议 2-卫星电话 3-视频监控
		 */
		contactTypes?: string;
		/**
		 * 排序
		 */
		orderNum?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ShipPortEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 港口名称
		 */
		name?: string;
		/**
		 * 港口编号
		 */
		code?: string;
		/**
		 * 颜色
		 */
		color?: string;
		/**
		 * 港口边界
		 */
		boundary?: string;
		/**
		 * 港口描述
		 */
		description?: string;
		/**
		 * 负责人
		 */
		personName?: string;
		/**
		 * 负责人手机号
		 */
		personTel?: string;
		/**
		 * 省份编码
		 */
		provinceCode?: string;
		/**
		 * 省份名称
		 */
		provinceName?: string;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ShipRegistryEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 编码
		 */
		mid?: BigInt;
		/**
		 * 国家名
		 */
		eCountry?: string;
		/**
		 * 国家名（中文）
		 */
		cCountry?: string;
		/**
		 * 缩写
		 */
		abbreviate?: string;
		/**
		 * 国旗
		 */
		flagImg?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SpaceInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 地址
		 */
		url?: string;
		/**
		 * 类型
		 */
		type?: string;
		/**
		 * 分类ID
		 */
		classifyId?: BigInt;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SpaceTypeEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 类别名称
		 */
		name?: string;
		/**
		 * 父分类ID
		 */
		parentId?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SuperviseFenceEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 围栏名称
		 */
		name?: string;
		/**
		 * 围栏颜色
		 */
		color?: string;
		/**
		 * 类型 0-矩形 1-多边形
		 */
		type?: number;
		/**
		 * 围栏边界
		 */
		boundary?: string;
		/**
		 * 围栏描述
		 */
		description?: string;
		/**
		 * 围栏备注
		 */
		remark?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SuperviseRouteEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 航线名称
		 */
		name?: string;
		/**
		 * 航线颜色
		 */
		color?: string;
		/**
		 * 航线数据
		 */
		boundary?: string;
		/**
		 * 航线描述
		 */
		description?: string;
		/**
		 * 航线备注
		 */
		remark?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface SuperviseWaypointEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 航点名称
		 */
		name?: string;
		/**
		 * 航点颜色
		 */
		color?: string;
		/**
		 * 航点数据
		 */
		boundary?: string;
		/**
		 * 航点描述
		 */
		description?: string;
		/**
		 * 航点备注
		 */
		remark?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface TaskInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 任务ID
		 */
		jobId?: string;
		/**
		 * 任务配置
		 */
		repeatConf?: string;
		/**
		 * 名称
		 */
		name?: string;
		/**
		 * cron
		 */
		cron?: string;
		/**
		 * 最大执行次数 不传为无限次
		 */
		limit?: number;
		/**
		 * 每间隔多少毫秒执行一次 如果cron设置了 这项设置就无效
		 */
		every?: number;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 状态 0:停止 1：运行
		 */
		status?: boolean;
		/**
		 * 开始时间
		 */
		startDate?: Date;
		/**
		 * 结束时间
		 */
		endDate?: Date;
		/**
		 * 数据
		 */
		data?: string;
		/**
		 * 执行的service实例ID
		 */
		service?: string;
		/**
		 * 状态 0:系统 1：用户
		 */
		type?: number;
		/**
		 * 下一次执行时间
		 */
		nextRunTime?: Date;
		/**
		 * 状态 0:cron 1：时间间隔
		 */
		taskType?: number;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface VersionInfoEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: BigInt;
		/**
		 * 版本名
		 */
		name?: string;
		/**
		 * 版本号
		 */
		code?: number;
		/**
		 * 是否强制更新 0:否 1：是
		 */
		isForce?: number;
		/**
		 * 下载链接
		 */
		downloadUrl?: string;
		/**
		 * 更新内容
		 */
		content?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface WarningDataEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 规则ID
		 */
		ruleId?: BigInt;
		/**
		 * 船舶ID
		 */
		shipId?: BigInt;
		/**
		 * 报警时间
		 */
		alarmTime?: Date;
		/**
		 * 经度
		 */
		longitude?: double;
		/**
		 * 纬度
		 */
		latitude?: double;
		/**
		 * 对地航向，单位度
		 */
		cog?: float;
		/**
		 * 对地航速，单位节
		 */
		sog?: float;
		/**
		 * 船艏向，单位度
		 */
		heading?: float;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface WarningRuleEntity {
		/**
		 * ID
		 */
		id?: number;
		/**
		 * 用户ID
		 */
		userId?: string;
		/**
		 * 规则名称
		 */
		name?: string;
		/**
		 * 规则类型 0-超速报警 1-低速报警 2-驶入围栏 3-驶出围栏
		 */
		type?: number;
		/**
		 * 规则描述
		 */
		description?: string;
		/**
		 * 速度限值
		 */
		speed?: double;
		/**
		 * 状态 0:停用 1：启用
		 */
		status?: boolean;
		/**
		 * 适用时段 0-所有时段 1-具体时段
		 */
		enableTimeType?: number;
		/**
		 * 适用时间-起
		 */
		beginTime?: Date;
		/**
		 * 适用时间-止
		 */
		endTime?: Date;
		/**
		 * 适用船舶 0-所有船舶 1-具体船舶
		 */
		enableShipType?: number;
		/**
		 * 备注
		 */
		remark?: string;
		/**
		 * 创建时间
		 */
		createTime?: Date;
		/**
		 * 更新时间
		 */
		updateTime?: Date;
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}
	interface ChatMessage {
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface ChatSession {
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface Test {
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseComm {
		/**
		 * 修改密码信息
		 */
		passwordUpdate(data?: any): Promise<any>;
		/**
		 * 修改个人信息
		 */
		personUpdate(data?: any): Promise<any>;
		/**
		 * 文件上传模式
		 */
		uploadMode(data?: any): Promise<any>;
		/**
		 * 权限与菜单
		 */
		permmenu(data?: any): Promise<any>;
		/**
		 * 个人信息
		 */
		person(data?: any): Promise<any>;
		/**
		 * 文件上传
		 */
		upload(data?: any): Promise<any>;
		/**
		 * 退出
		 */
		logout(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			passwordUpdate: string;
			personUpdate: string;
			uploadMode: string;
			permmenu: string;
			person: string;
			upload: string;
			logout: string;
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			passwordUpdate: boolean;
			personUpdate: boolean;
			uploadMode: boolean;
			permmenu: boolean;
			person: boolean;
			upload: boolean;
			logout: boolean;
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseOpen {
		/**
		 * 刷新token
		 */
		refreshToken(data?: any): Promise<any>;
		/**
		 * 验证码
		 */
		captcha(data?: any): Promise<any>;
		/**
		 * 登录
		 */
		login(data?: any): Promise<any>;
		/**
		 * 获得网页内容的参数值
		 */
		html(data?: any): Promise<any>;
		/**
		 * 实体信息与路径
		 */
		eps(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			refreshToken: string;
			captcha: string;
			login: string;
			html: string;
			eps: string;
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			refreshToken: boolean;
			captcha: boolean;
			login: boolean;
			html: boolean;
			eps: boolean;
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysDepartment {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 排序
		 */
		order(data?: any): Promise<any>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysDepartmentEntity[]>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysDepartmentEntity[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<BaseSysDepartmentEntity>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			order: string;
			list: string;
			add: string;
			page: string;
			info: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			order: boolean;
			list: boolean;
			add: boolean;
			page: boolean;
			info: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysLog {
		/**
		 * 日志保存时间
		 */
		setKeep(data?: any): Promise<any>;
		/**
		 * 获得日志保存时间
		 */
		getKeep(data?: any): Promise<any>;
		/**
		 * 清理
		 */
		clear(data?: any): Promise<any>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysLogEntity[];
			[key: string]: any;
		}>;
		/**
		 * list
		 */
		list(data?: any): Promise<BaseSysLogEntity[]>;
		/**
		 * info
		 */
		info(data?: any): Promise<BaseSysLogEntity>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			setKeep: string;
			getKeep: string;
			clear: string;
			page: string;
			list: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			setKeep: boolean;
			getKeep: boolean;
			clear: boolean;
			page: boolean;
			list: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysMenu {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysMenuEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysMenuEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysMenuEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysParam {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 获得网页内容的参数值
		 */
		html(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysParamEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysParamEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<BaseSysParamEntity[]>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			html: string;
			info: string;
			page: string;
			add: string;
			list: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			html: boolean;
			info: boolean;
			page: boolean;
			add: boolean;
			list: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysRole {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysRoleEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysRoleEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysRoleEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseSysUser {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 移动部门
		 */
		move(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<BaseSysUserEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<BaseSysUserEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: BaseSysUserEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			move: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			move: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface ConferenceInfo {
		/**
		 * getState
		 */
		getState(data?: any): Promise<any>;
		/**
		 * invite
		 */
		invite(data?: any): Promise<any>;
		/**
		 * hangUp
		 */
		hangUp(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			getState: string;
			invite: string;
			hangUp: string;
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			getState: boolean;
			invite: boolean;
			hangUp: boolean;
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface DemoGoods {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DemoGoodsEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: DemoGoodsEntity[];
			[key: string]: any;
		}>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DemoGoodsEntity[]>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			page: string;
			list: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			page: boolean;
			list: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface DictInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 获得字典数据
		 */
		data(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DictInfoEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DictInfoEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: DictInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			data: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			data: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface DictType {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<DictTypeEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<DictTypeEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: DictTypeEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface EhhAis {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<EhhAisEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<EhhAisEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: EhhAisEntity[];
			[key: string]: any;
		}>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			info: string;
			list: string;
			page: string;
			update: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			update: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface EhhAlarm {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<EhhAlarmEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<EhhAlarmEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: EhhAlarmEntity[];
			[key: string]: any;
		}>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			info: string;
			list: string;
			page: string;
			update: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			update: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface EhhData {
		/**
		 * 查询船只AIS、雷达数据
		 */
		query(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			query: string;
			list: string;
			page: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			query: boolean;
			list: boolean;
			page: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface EhhRadar {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<EhhRadarEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<EhhRadarEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: EhhRadarEntity[];
			[key: string]: any;
		}>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			info: string;
			list: string;
			page: string;
			update: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			update: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface EnforcementDevice {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<EnforcementDeviceEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<EnforcementDeviceEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: EnforcementDeviceEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface EnforcementPhoto {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<EnforcementPhotoEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<EnforcementPhotoEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: EnforcementPhotoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface EnforcementRecording {
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: any[];
			[key: string]: any;
		}>;
		/**
		 * list
		 */
		list(data?: any): Promise<any[]>;
		/**
		 * info
		 */
		info(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			page: string;
			list: string;
			info: string;
			update: string;
			delete: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			page: boolean;
			list: boolean;
			info: boolean;
			update: boolean;
			delete: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface LayerInfo {
		/**
		 * allLayers
		 */
		allLayers(data?: any): Promise<any>;
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<LayerInfoEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<LayerInfoEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: LayerInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			allLayers: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			allLayers: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface LayerType {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<LayerTypeEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<LayerTypeEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: LayerTypeEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface MonitorDevice {
		/**
		 * liveUrl
		 */
		liveUrl(data?: any): Promise<any>;
		/**
		 * 根据船舶ID获取摄像头列表
		 */
		devices(data?: any): Promise<any>;
		/**
		 * control
		 */
		control(data?: any): Promise<any>;
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * tree
		 */
		tree(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<MonitorDeviceEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<MonitorDeviceEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: MonitorDeviceEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			liveUrl: string;
			devices: string;
			control: string;
			delete: string;
			update: string;
			tree: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			liveUrl: boolean;
			devices: boolean;
			control: boolean;
			delete: boolean;
			update: boolean;
			tree: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface ShipFleet {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ShipFleetEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: ShipFleetEntity[];
			[key: string]: any;
		}>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<ShipFleetEntity[]>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			page: string;
			list: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			page: boolean;
			list: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface ShipInfo {
		/**
		 * 获取船舶位置
		 */
		getLocation(data?: any): Promise<any>;
		/**
		 * 目标数据统计
		 */
		statistics(data?: any): Promise<any>;
		/**
		 * 获得船舶列表
		 */
		getList(data?: any): Promise<any>;
		/**
		 * 根据关键字查询船舶
		 */
		search(data?: any): Promise<any>;
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 船舶轨迹查询
		 */
		track(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ShipInfoEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: ShipInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<ShipInfoEntity[]>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			getLocation: string;
			statistics: string;
			getList: string;
			search: string;
			delete: string;
			update: string;
			track: string;
			info: string;
			page: string;
			list: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			getLocation: boolean;
			statistics: boolean;
			getList: boolean;
			search: boolean;
			delete: boolean;
			update: boolean;
			track: boolean;
			info: boolean;
			page: boolean;
			list: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface ShipPort {
		/**
		 * 根据关键字查询港口
		 */
		search(data?: any): Promise<any>;
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ShipPortEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: ShipPortEntity[];
			[key: string]: any;
		}>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<ShipPortEntity[]>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			search: string;
			delete: string;
			update: string;
			info: string;
			page: string;
			list: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			search: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			page: boolean;
			list: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface ShipRegistry {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<ShipRegistryEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: ShipRegistryEntity[];
			[key: string]: any;
		}>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<ShipRegistryEntity[]>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			page: string;
			list: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			page: boolean;
			list: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface SpaceInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SpaceInfoEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SpaceInfoEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: SpaceInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface SpaceType {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SpaceTypeEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SpaceTypeEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: SpaceTypeEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface SuperviseFence {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SuperviseFenceEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: SuperviseFenceEntity[];
			[key: string]: any;
		}>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SuperviseFenceEntity[]>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			page: string;
			list: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			page: boolean;
			list: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface SuperviseRoute {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SuperviseRouteEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: SuperviseRouteEntity[];
			[key: string]: any;
		}>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SuperviseRouteEntity[]>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			page: string;
			list: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			page: boolean;
			list: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface SuperviseWaypoint {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<SuperviseWaypointEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: SuperviseWaypointEntity[];
			[key: string]: any;
		}>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<SuperviseWaypointEntity[]>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			page: string;
			list: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			page: boolean;
			list: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface TaskInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 开始
		 */
		start(data?: any): Promise<any>;
		/**
		 * 执行一次
		 */
		once(data?: any): Promise<any>;
		/**
		 * 停止
		 */
		stop(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<TaskInfoEntity>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: TaskInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 日志
		 */
		log(data?: any): Promise<any>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * list
		 */
		list(data?: any): Promise<TaskInfoEntity[]>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			start: string;
			once: string;
			stop: string;
			info: string;
			page: string;
			log: string;
			add: string;
			list: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			start: boolean;
			once: boolean;
			stop: boolean;
			info: boolean;
			page: boolean;
			log: boolean;
			add: boolean;
			list: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface VersionInfo {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<VersionInfoEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<VersionInfoEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: VersionInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface WarningData {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<WarningDataEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<WarningDataEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: WarningDataEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface WarningRule {
		/**
		 * 删除
		 */
		delete(data?: any): Promise<any>;
		/**
		 * 修改
		 */
		update(data?: any): Promise<any>;
		/**
		 * 单个信息
		 */
		info(data?: any): Promise<WarningRuleEntity>;
		/**
		 * 列表查询
		 */
		list(data?: any): Promise<WarningRuleEntity[]>;
		/**
		 * 分页查询
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number };
			list: WarningRuleEntity[];
			[key: string]: any;
		}>;
		/**
		 * 新增
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	type Service = {
		request(options?: {
			url: string;
			method?: "POST" | "GET" | string;
			data?: any;
			params?: any;
			proxy?: boolean;
			[key: string]: any;
		}): Promise<any>;
		chat: { message: ChatMessage; session: ChatSession };
		test: Test;
		base: {
			comm: BaseComm;
			open: BaseOpen;
			sys: {
				department: BaseSysDepartment;
				log: BaseSysLog;
				menu: BaseSysMenu;
				param: BaseSysParam;
				role: BaseSysRole;
				user: BaseSysUser;
			};
		};
		conference: { info: ConferenceInfo };
		demo: { goods: DemoGoods };
		dict: { info: DictInfo; type: DictType };
		ehh: { ais: EhhAis; alarm: EhhAlarm; data: EhhData; radar: EhhRadar };
		enforcement: {
			device: EnforcementDevice;
			photo: EnforcementPhoto;
			recording: EnforcementRecording;
		};
		layer: { info: LayerInfo; type: LayerType };
		monitor: { device: MonitorDevice };
		ship: { fleet: ShipFleet; info: ShipInfo; port: ShipPort; registry: ShipRegistry };
		space: { info: SpaceInfo; type: SpaceType };
		supervise: { fence: SuperviseFence; route: SuperviseRoute; waypoint: SuperviseWaypoint };
		task: { info: TaskInfo };
		version: { info: VersionInfo };
		warning: { data: WarningData; rule: WarningRule };
	};
}
