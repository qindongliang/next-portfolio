# Next.js 15 个人作品集项目

这是一个使用 Next.js 15 构建的个人作品集和博客系统，专门设计用于学习和演示 Next.js 15 的核心特性。

## 🚀 项目特色

### Next.js 15 新特性演示
- ✅ **Server Actions** - 无需 API 路由的服务器端函数
- ✅ **App Router** - 基于文件系统的全新路由系统
- ✅ **Server Components** - 服务器端组件优化性能
- ✅ **Turbopack** - 更快的开发体验
- ✅ **改进的元数据 API** - 更好的 SEO 支持

### 功能模块
- 📱 响应式设计，支持移动端
- 🎨 使用 Tailwind CSS 构建现代 UI
- 📝 博客系统（文章列表、详情页、分类标签）
- 👤 个人信息展示（技能、项目、经历）
- 📮 联系表单（Server Actions 处理）
- 🛠️ 管理后台（文章管理界面）
- 🌙 暗色主题切换支持

## 📁 项目结构

```
next-portfolio/
├── src/
│   ├── app/                    # App Router 路由目录
│   │   ├── layout.tsx         # 根布局组件
│   │   ├── page.tsx           # 首页（服务器组件）
│   │   ├── blog/              # 博客路由
│   │   │   ├── page.tsx       # 博客列表页
│   │   │   └── [slug]/        # 动态路由
│   │   │       └── page.tsx   # 文章详情页
│   │   ├── admin/             # 管理后台
│   │   │   └── page.tsx       # 后台管理页面
│   │   ├── demo/              # 特性演示
│   │   │   └── page.tsx       # Next.js 15 特性演示
│   │   └── api/               # API 路由
│   ├── components/            # 组件目录
│   │   ├── ui/                # 基础 UI 组件
│   │   │   ├── Header.tsx     # 页头组件
│   │   │   ├── Footer.tsx     # 页脚组件
│   │   │   └── Button.tsx     # 按钮组件
│   │   └── features/          # 功能组件
│   │       └── ContactForm.tsx # 联系表单
│   ├── lib/                   # 工具库
│   │   ├── actions.ts         # Server Actions
│   │   ├── data.ts            # 模拟数据
│   │   └── utils.ts           # 工具函数
│   └── types/                 # 类型定义
│       └── index.ts           # 项目类型
├── public/                    # 静态资源
├── package.json               # 项目配置
└── README.md                  # 项目说明
```

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **工具**: ESLint, Prettier

## 🚀 快速开始

### 环境要求
- Node.js 18.0 或更高版本
- npm 或 yarn

### 安装和运行

1. **启动开发服务器**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

2. **访问应用**
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📚 学习要点

### 1. Server Components vs Client Components

**服务器组件** (默认):
- 在服务器端渲染
- 直接访问数据库和 API
- 更好的 SEO 和性能
- 不能使用 useState、useEffect 等 hooks

**客户端组件**:
- 需要标记 `'use client'`
- 可以使用交互功能
- 适合表单、状态管理等

```typescript
// 服务器组件示例
export default function HomePage() {
  const posts = getPosts(); // 直接在服务器获取数据
  return <div>{posts.map(...)}</div>;
}

// 客户端组件示例
'use client';
export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  // 交互逻辑...
}
```

### 2. Server Actions

Server Actions 允许在组件中直接调用服务器端函数：

```typescript
// lib/actions.ts
'use server';

export async function submitContactForm(formData: ContactFormData) {
  // 服务器端逻辑
  revalidatePath('/'); // 重新验证缓存
}

// 组件中使用
<form action={submitContactForm}>
  {/* 表单字段 */}
</form>
```

### 3. App Router

基于文件系统的路由系统：

- `app/page.tsx` → `/`
- `app/blog/page.tsx` → `/blog`
- `app/blog/[slug]/page.tsx` → `/blog/post-title`
- `app/layout.tsx` → 根布局

### 4. 数据获取模式

**静态生成 (SSG)**:
```typescript
export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map(post => ({ slug: post.slug }));
}
```

**服务端渲染 (SSR)**:
```typescript
export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  return <div>{post.content}</div>;
}
```

## 🎯 项目演示页面

访问 `/demo` 页面体验以下 Next.js 15 特性：

1. **Server Actions 演示**
   - 图片上传（服务器端处理）
   - 文章创建（无需 API 路由）

2. **组件模式对比**
   - 服务器组件 vs 客户端组件
   - 数据获取方式对比

3. **性能特性**
   - 静态生成 vs 动态渲染
   - 缓存策略演示

## 🔧 自定义配置

### 修改个人信息
编辑 `src/lib/data.ts` 文件中的 `personalInfo` 对象：

```typescript
export const personalInfo: PersonalInfo = {
  name: "你的名字",
  title: "你的职位",
  bio: "个人简介",
  // ...其他信息
};
```

### 添加项目作品
在 `src/lib/data.ts` 的 `projects` 数组中添加新项目：

```typescript
{
  id: "unique-id",
  title: "项目名称",
  description: "项目描述",
  technologies: ["技术栈"],
  featured: true,
  // ...其他字段
}
```

### 添加博客文章
在 `src/lib/data.ts` 的 `posts` 数组中添加新文章：

```typescript
{
  id: "unique-id",
  title: "文章标题",
  slug: "article-slug",
  content: "文章内容（支持 Markdown）",
  // ...其他字段
}
```

## 📖 进一步学习

### 推荐资源
- [Next.js 15 官方文档](https://nextjs.org/docs)
- [App Router 教程](https://nextjs.org/learn)
- [Server Actions 指南](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)

### 下一步可以添加的功能
- [ ] 数据库集成 (Prisma/Drizzle)
- [ ] 用户认证系统
- [ ] 评论功能
- [ ] 搜索功能
- [ ] 图片优化和 CDN
- [ ] 部署到 Vercel

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

MIT License

---

**Happy Coding with Next.js 15! 🎉**
