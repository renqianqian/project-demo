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

以表格展示用户(仅查看,无增删改):

- `id` 用户 ID
- `name` 姓名
- `role` 角色
- `department` 部门
- `status` 状态(在职 / 停用)

不含 CRUD。

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
    ├── index.css         # 样式
    └── data/
        ├── projects.js   # 项目 mock 数据
        └── users.js      # 用户 mock 数据
```