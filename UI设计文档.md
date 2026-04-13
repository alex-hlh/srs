# UI设计文档.md

## 1. 页面结构ASCII图

### 1.1 主布局结构 (TabLayout + GlobalLayout)

```
+------------------------------------------------------------------+
|  Header (GlobalHeader)                                           |
|  [Logo] [菜单导航] [搜索] [通知] [用户头像/下拉] [设置]            |
+------------------------------------------------------------------+
| Sidebar   |  Tab Bar (多页签模式)                                 |
| (SideMenu)|  [首页] [角色管理] [用户管理] [x]                      |
|           |------------------------------------------------------|
| 200px/    |  Breadcrumb 面包屑                                   |
| 80px      |------------------------------------------------------|
| (折叠)    |  Page Content (router-view)                          |
|           |  +------------------------------------------------+  |
|           |  | 搜索区域 (table-page-search-wrapper)            |  |
|           |  | [表单字段...] [查询] [重置]                      |  |
|           |  +------------------------------------------------+  |
|           |  | 操作按钮区 (table-operator)                      |  |
|           |  | [添加] [批量删除] [其他操作]                     |  |
|           |  +------------------------------------------------+  |
|           |  | 表格区域 (a-table)                               |  |
|           |  | [勾选框] 字段1 | 字段2 | 字段3 | 操作            |  |
|           |  |------------------------------------------------|  |
|           |  | 数据行1...                                      |  |
|           |  | 数据行2...                                      |  |
|           |  +------------------------------------------------+  |
|           |  | 分页 (pagination)                               |  |
|           |  | [总共X条] [< 1 2 3 ... >] [每页条数]             |  |
|           |  +------------------------------------------------+  |
+----------+------------------------------------------------------+
```

### 1.2 流程编排器页面 (processComposer)

```
+------------------------------------------------------------------+
| Sidebar  |  Toolbar: [保存] [发布] [撤销] [重做] [放大] [缩小]    |
| (流程    |--------------------------------------------------------|
| 列表)   |  Canvas 画布区域 (节点拖拽编辑)                        |
|          |                                                         |
| [开始]   |    +------+     +------+     +------+                 |
| [服务A]  |    | 开始 | --> | 服务A| --> | 结束 |                 |
| [服务B]  |    +------+     +------+     +------+                 |
| [判断]   |                                                         |
| [路由]   |  节点类型: [开始] [服务节点] [判断] [路由] [多服务]    |
| [多服务] |--------------------------------------------------------|
| [结束]   |  属性面板 (右侧)                                       |
|          |  [节点名称] [服务配置] [参数映射] [返回值配置]         |
+----------+------------------------------------------------------+
```

## 2. 主要页面清单

### 系统管理模块 (system/)

| 页面 | 路径 | 功能描述 |
|------|------|----------|
| UserList | /system/users | 用户管理 - CRUD、冻结/解冻 |
| RoleList | /system/roles | 角色管理 - CRUD、授权 |
| PermissionList | /system/permission | 菜单权限管理 - 树形结构 |
| DepartList | /system/department | 部门管理 - 树形结构 |
| DictList | /system/dict | 字典管理 |
| LogSearch | /system/logs/search | 日志搜索 |
| QuartzJobList | /system/quartz | 定时任务 |
| SysAnnouncementList | /system/announcement | 系统通告 |
| SysGatewayRouteList | /system/gateway/route | 网关路由 |

### 业务功能模块 (apply/)

| 页面 | 路径 | 功能描述 |
|------|------|----------|
| applyList | /apply/list | 应用管理 |
| serviceLists | /apply/service | 服务列表 |
| processComposer | /apply/processComposer | 流程编排器 |
| processManage | /apply/process/manage | 流程管理 |
| ServiceStatistics | /apply/statistics | 服务统计 |

### 文档管理模块 (document/)

| 页面 | 路径 | 功能描述 |
|------|------|----------|
| Manage | /document/manage | 文档管理 |
| Authorizat | /document/authorize | 文档授权 |
| Preview | /document/preview | 文档预览 |

### 网关管理模块 (gateway/)

| 页面 | 路径 | 功能描述 |
|------|------|----------|
| flow/index | /gateway/flow | 流量控制 |
| serviceLog | /gateway/service/log | 服务日志 |

## 3. 组件层级

```
Root
├── TabLayout (多页签布局)
│   ├── GlobalLayout
│   │   ├── SideMenu
│   │   ├── GlobalHeader
│   │   └── router-view
│   └── Tab Bar (a-tabs)
├── UserLayout (登录布局)
└── BlankLayout
```

**图表组件**: Bar.vue, Pie.vue, LineChartMultid.vue, AreaChartTy.vue, Radar.vue 等

## 4. 布局特点

- 经典后台管理布局 (侧边栏200px + 顶部栏64px + 内容区)
- 响应式: desktop/mobile/tablet
- 多页签Tab模式
- 表格页面标准结构: 查询区 + 操作按钮 + 表格 + 分页
