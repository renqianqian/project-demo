# project-demo

REQ-14 · 项目管理界面 · mock 数据只读演示

## 技术栈

- React 18
- Vite 5
- 原生 CSS(无 UI 库)

## 功能

页面通过顶部标签切换两个只读界面:

### 项目管理

每张项目卡片显示两个字段:

- `id` 项目 ID
- `name` 项目名称

### 用户管理

以表格展示用户,支持增删改查(mock,不落库):

- `id` 用户 ID(新增时自动生成)
- `name` 姓名
- `role` 角色
- `department` 部门
- `status` 状态(在职 / 停用)

操作:

- 新增:顶部表单填写姓名/角色/部门/状态后提交
- 搜索:按用户 ID / 姓名 / 角色 / 部门模糊筛选
- 编辑:行内「编辑」修改后保存
- 删除:「删除」二次确认后移除

## 本地启动

```bash
npm install
npm run dev
# → http://localhost:5173
```

构建:

```bash
npm run build
npm run preview
```

## 目录

```
.
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx          # 入口
    ├── App.jsx           # 项目管理 + 用户管理渲染
    ├── UsersTab.jsx      # 用户管理(增删改查)
    ├── index.css         # 样式
    └── data/
        ├── projects.js   # 项目 mock 数据
        └── users.js      # 用户初始 mock 数据
```