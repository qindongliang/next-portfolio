# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 项目概述

这是一个使用 Next.js 15 构建的个人作品集和博客系统，专门用于演示 Next.js 15 的核心特性。项目使用 TypeScript、Tailwind CSS 构建，并采用 App Router 架构。

## 开发命令

```bash
# 使用 Turbopack 启动开发服务器
npm run dev

# 使用 Turbopack 构建生产版本
npm run build

# 启动生产服务器
npm start

# 运行代码检查
npm run lint
```

## 架构与核心概念

### Next.js 15 特性演示
- **Server Actions**：所有表单提交和数据变更都使用 Server Actions（见 `src/lib/actions.ts`）
- **App Router**：基于文件系统的路由，默认使用 React Server Components
- **Server Components**：大多数页面默认是 Server Components（无需 `'use client'` 指令）
- **Turbopack**：在开发和构建脚本中使用以提升性能

### 数据管理
- 所有数据目前都在 `src/lib/data.ts` 中模拟
- Server Actions 处理表单提交和数据变更
- 目前未连接数据库 - 使用内存存储用于演示目的

### 组件架构
- **UI 组件**：位于 `src/components/ui/`（Header、Footer、Button）
- **功能组件**：位于 `src/components/features/`（ContactForm）
- **Server Components**：所有页面默认都是，除非标记为 `'use client'`
- **Client Components**：只有需要交互性的组件使用 `'use client'`

### 关键文件结构
- `src/app/layout.tsx`：根布局组件，包含元数据配置
- `src/lib/actions.ts`：所有用于表单处理的 Server Actions
- `src/lib/data.ts`：模拟数据和数据获取函数
- `src/types/index.ts`：TypeScript 类型定义
- `README.md`：中文的详细项目文档

### 数据流模式
1. **静态数据**：在 Server Components 中直接从 `src/lib/data.ts` 导入
2. **表单提交**：由 Server Actions 处理，包含验证和错误处理
3. **文件上传**：`actions.ts` 中的 Server Action 处理文件验证（Next.js 15 特性）

### 样式方案
- 使用 Tailwind CSS 进行样式设计
- 使用 `clsx` 和 `tailwind-merge` 工具处理条件类名
- 移动优先的响应式设计
- 在布局中配置了 Google Fonts 的 Geist 字体

### 内容管理
- 博客文章和项目以模拟数据形式存储
- 博客文章支持 Markdown 内容
- 博客路由具有静态站点生成能力
- `/admin` 管理界面用于内容管理

### 开发注意事项
- 目前未配置测试套件
- 使用 ESLint 进行代码质量检查
- 严格类型的 TypeScript
- 中文内容（README.md 和示例数据）
- `/demo` 页面展示 Next.js 15 特性

### Server Actions 使用
所有交互式表单都使用 Server Actions：
- 联系表单提交（`submitContactForm`）
- 文章创建（`createPost`）
- 图片上传（`uploadImage`）
- 联系记录管理（`deleteContact`、`getContacts`）

这些直接通过表单的 `action` 属性调用，无需客户端 JavaScript。