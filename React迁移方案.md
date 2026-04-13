# ft-ctrl-ui Vue 2 迁移 React 技术方案

## 一、项目现状分析

### 1.1 技术栈清单

| 类别 | 技术 | 版本 | 文件数 |
|------|------|------|--------|
| 框架 | Vue | 2.6.10 | 233+ |
| UI组件库 | Ant Design Vue | 1.7.2 | 58组件 |
| 表格组件 | vxe-table + JVxeTable | 2.9.13 | 30+文件 |
| 图表 | @antv/g2 + viser-vue | 4.1.48 | 6文件 |
| 流程图 | @antv/x6 + @antv/x6-vue-shape | 1.28.1 | 20+文件 |
| 状态管理 | Vuex | 3.1.0 | 6模块 |
| 路由 | Vue Router | 3.0.7 | 2文件 |
| 存储 | vue-ls | 3.2.0 | 2文件 |
| 日期 | moment.js | 2.29.1 | 27文件 |

### 1.2 核心复杂度 - JVxeTable 组件架构

```
ft-ctrl-ui/src/components/jeecg/JVxeTable/
├── install.js                 # VXETable 全局注册
├── index.js                   # 导出入口
├── jvxeTypes.js               # 类型常量定义
├── components/
│   ├── JVxeTable.js          # 主组件 (750+ 行)
│   ├── JVxeToolbar.js        # 工具栏
│   ├── JVxeSubPopover.js     # 弹出层
│   ├── JVxeDetailsModal.js   # 详情弹窗
│   ├── JVxePagination.js     # 分页
│   └── cells/                 # 10种自定义单元格组件
│       ├── JVxeInputCell.vue
│       ├── JVxeSelectCell.vue
│       ├── JVxeUserSelectCell.vue
│       ├── JVxeDepartSelectCell.vue
│       └── JVxeUploadCell.vue
├── mixins/
│   ├── JVxeCellMixins.js     # 单元格增强 mixin
│   └── vxe.web.socket.mixins.js  # WebSocket 实时更新
└── utils/
    ├── cellUtils.js           # 单元格工具
    └── vxeUtils.js            # vxe-table 工具
```

### 1.3 Mixins 使用情况

| Mixin | 用途 | 使用文件数 |
|-------|------|-----------|
| JeecgListMixin | 列表页通用逻辑 | 40+ |
| JEditableTableMixin | 可编辑表格逻辑 | 20+ |
| JVxeTableModelMixin | JVxeTable 状态管理 | 15+ |
| JVxeTableMixin | JVxeTable 交互 | 10+ |
| mixinDevice | 设备相关 | 5+ |

---

## 二、技术选型建议

### 2.1 核心框架
- **React 18** + **TypeScript**

### 2.2 UI 组件库映射

| Vue 技术 | React 技术 | 说明 |
|----------|------------|------|
| ant-design-vue 1.7.2 | antd 5.x | 功能类似 |
| a-form-model | antd Form | API 类似 |
| vxe-table | **AG Grid** (推荐) | 功能最接近 |

### 2.3 状态管理
- **推荐**: Zustand + zustand-persist
- **备选**: Redux Toolkit

### 2.4 路由
Vue Router 3.0.7 -> **React Router 6**

### 2.5 图表
@antv/g2 -> **Apache ECharts** (React 支持好)

### 2.6 流程图
@antv/x6 + @antv/x6-vue-shape -> @antv/x6 + @antv/x6-react-shape

---

## 三、组件迁移映射

### 3.1 表格组件 (JVxeTable)

推荐使用 **AG Grid** 重写:

```tsx
import { AgGridReact } from 'ag-grid-react';

// 自定义单元格通过 cellRenderer 实现
const UserSelectCellRenderer = (props) => (
  <UserSelectPopover value={props.value} onChange={v => props.onChange(v)} />
);

// 配置映射
const gridOptions = {
  columnDefs: columns.map(col => ({
    field: col.key,
    headerName: col.title,
    cellRenderer: CellRenderers[col.type],
    editable: !col.disabled,
  })),
  rowData: dataSource,
};
```

| JVxeTable 功能 | React 实现 |
|----------------|------------|
| 单元格类型 | cellRenderer 映射表 |
| 校验规则 | Yup / Zod |
| WebSocket 实时 | useWebSocket hook |
| 弹窗编辑 | Modal + Form |

### 3.2 表单组件

```tsx
// Vue -> React
<a-form-model> -> <Form>
<a-form-model-item> -> <Form.Item>
v-model -> value + onChange
```

### 3.3 Mixin 到 Hooks 转换

| Vue Mixin | React Hook |
|-----------|------------|
| JeecgListMixin | useListPage |
| JEditableTableMixin | useEditableTable |
| JVxeTableMixin | useJVxeTable |
| VxeWebSocketMixins | useWebSocket |

---

## 四、工作量估算

| 模块 | 文件数 | 复杂度 | 工作量 | 优先级 |
|------|--------|--------|--------|--------|
| JVxeTable 组件 | 30+ | 极高 | 15-20人日 | P0 |
| 系统管理 | 40+ | 高 | 12-15人日 | P0 |
| 申请管理 | 50+ | 高 | 10-12人日 | P0 |
| 表单验证 | 20+ | 中 | 5-8人日 | P1 |
| 图表页面 | 6 | 中 | 3-5人日 | P1 |
| 路由/权限 | 10 | 中 | 3-5人日 | P1 |
| 登录/认证 | 5 | 低 | 2-3人日 | P1 |
| 其他页面 | 80+ | 中 | 15-20人日 | P2 |

**总计: 90-120人日**

---

## 五、风险评估

### 高风险
| 风险 | 应对 |
|------|------|
| JVxeTable 750+行，10种单元格 | 预留buffer，考虑AG Grid成熟方案 |
| 表单 API 差异 | 制定Vue/React对照表 |
| Mixin 1500+行逻辑 | 提取为 React Hooks |

### 中风险
| 风险 | 应对 |
|------|------|
| Element UI 残留 | 替换为 antd |
| vue-ls 存储 | 迁移到 zustand-persist |
| provide/inject | 使用 React Context |

---

## 六、分批实施建议

### 第一批 (P0): 脚手架 + 核心组件
- 项目脚手架搭建 (Vite + React 18 + TypeScript)
- 路由系统 (React Router 6)
- 状态管理 (Zustand)
- JVxeTable 重写 (AG Grid)
- 权限系统迁移

### 第二批 (P1): 核心业务
- 用户管理
- 登录/认证
- 表单体系
- 流程编排器

### 第三批 (P2): 完善优化
- 图表页面
- 其他业务页面
- 性能优化

---

## 七、推荐技术栈

```json
{
  "framework": "React 18 + TypeScript",
  "build": "Vite 5",
  "ui": "Ant Design 5.x",
  "table": "AG Grid Enterprise",
  "chart": "Apache ECharts",
  "flow": "@antv/x6 + @antv/x6-react-shape",
  "state": "Zustand + zustand-persist",
  "router": "React Router 6",
  "validation": "Zod",
  "http": "axios + react-query",
  "i18n": "react-i18next"
}
```

---

## 八、结论

迁移核心挑战:
1. **JVxeTable** - 最大难点，建议专项攻克
2. **表单体系差异** - 需全面梳理
3. **Mixin模式消除** - 重新设计组件组合

建议分批迭代迁移，总工期 90-120 人日。
