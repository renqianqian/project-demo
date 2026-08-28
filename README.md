# project-demo

REQ-14 · 项目管理界面 · mock 数据只读演示

## 技术栈

- React 18
- Vite 5
- 原生 CSS(无 UI 库)

## 字段(只读 mock)

每张项目卡片只显示两个字段:

- `id` 项目 ID
- `name` 项目名称

不含人员信息、无 CRUD。

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
    ├── App.jsx           # 项目列表渲染
    ├── index.css         # 样式
    └── data/
        └── projects.js   # mock 数据
```