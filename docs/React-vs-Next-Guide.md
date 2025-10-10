# React vs Next.js 完全指南

> 基于 Next.js 15 个人作品集项目的实际代码示例

## 📚 目录

- [基本概念](#基本概念)
- [核心区别](#核心区别)
- [实际代码对比](#实际代码对比)
- [性能对比](#性能对比)
- [开发体验](#开发体验)
- [选择建议](#选择建议)

## 🎯 基本概念

### React
- **定义**: JavaScript 库，用于构建用户界面
- **核心**: 组件化开发
- **定位**: UI 层的解决方案

### Next.js
- **定义**: React 框架，构建在 React 之上
- **核心**: 全栈开发平台
- **定位**: 生产就绪的应用框架

## 🔍 核心区别

### 1. 渲染模式

#### React (客户端渲染)
```jsx
// 所有组件都在客户端渲染
import { useState, useEffect } from 'react';

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 客户端获取数据
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {posts.map(post => <PostItem key={post.id} post={post} />)}
    </div>
  );
}
```

#### Next.js (服务器组件 + 客户端组件)

**服务器组件** (我们的项目 `src/app/page.tsx`):
```tsx
// 服务器组件，在服务器端渲染
export default function Home() {
  // 直接在服务器端获取数据
  const featuredProjects = getFeaturedProjectsSync();

  return (
    <div>
      {featuredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

**客户端组件** (我们的项目 `src/components/features/ContactForm.tsx`):
```tsx
'use client'; // 标记为客户端组件

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // 处理用户交互
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return <form>{/* 表单内容 */}</form>;
}
```

**关键区别**:
- ✅ Next.js 支持服务器组件，在服务器端渲染
- ✅ 客户端组件处理交互功能
- ✅ 更好的首次加载性能和 SEO

### 2. 路由系统

#### React (需要额外配置)
```jsx
// 需要安装 react-router-dom
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/blog">博客</Link>
        <Link to="/blog/post-title">文章详情</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}
```

#### Next.js (内置文件系统路由)

**项目结构**:
```
src/app/
├── layout.tsx         # 根布局
├── page.tsx           # 首页 (/)
├── blog/
│   ├── page.tsx       # 博客列表 (/blog)
│   └── [slug]/        # 动态路由
│       └── page.tsx   # 文章详情 (/blog/:slug)
├── admin/
│   └── page.tsx       # 管理后台 (/admin)
└── demo/
    └── page.tsx       # 演示页面 (/demo)
```

**路由使用** (我们的项目):
```tsx
import Link from 'next/link';

// 导航链接
<Link href="/blog">博客</Link>
<Link href={`/blog/${post.slug}`}>阅读更多</Link>
```

**关键区别**:
- ✅ Next.js 使用文件系统路由，无需额外配置
- ✅ 自动代码分割，提升性能
- ✅ 内置 SEO 优化

### 3. 数据获取方式

#### React (客户端获取)
```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('获取用户失败:', error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>加载中...</div>;
  if (!user) return <div>用户不存在</div>;

  return <div>{user.name}</div>;
}
```

#### Next.js (服务器端获取)

**博客页面** (我们的项目 `src/app/blog/page.tsx`):
```tsx
// 服务器组件，直接获取数据
export default async function BlogPage() {
  const posts = await getPosts(); // 服务器端获取

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">技术博客</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`}>阅读更多</Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**关键区别**:
- ✅ Next.js 在服务器端获取数据，页面加载更快
- ✅ 更好的 SEO，搜索引擎可以看到完整内容
- ✅ 用户无需等待加载状态

### 4. 元数据和 SEO

#### React (需要额外库)
```jsx
import { Helmet } from 'react-helmet';

function BlogPost({ post }) {
  return (
    <div>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
      </Helmet>

      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
```

#### Next.js (内置 SEO 配置)

**元数据配置** (我们的项目 `src/app/layout.tsx`):
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "个人作品集 - 全栈开发工程师",
  description: "展示我的项目作品、技术博客和职业经历的个人网站",
  keywords: ["全栈开发", "React", "Next.js", "TypeScript", "Web开发"],
  authors: [{ name: "张三" }],
  openGraph: {
    title: "个人作品集 - 全栈开发工程师",
    description: "展示我的项目作品、技术博客和职业经历的个人网站",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  );
}
```

**动态元数据** (我们的项目 `src/app/blog/[slug]/page.tsx`):
```tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return { title: "文章未找到" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
    },
  };
}
```

**关键区别**:
- ✅ Next.js 内置元数据 API，无需额外库
- ✅ 自动生成 SEO 友好的 HTML
- ✅ 支持动态元数据

### 5. Server Actions (Next.js 15 新特性)

#### React (需要 API 路由)
```jsx
// 需要创建 API 端点
// pages/api/contact.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, message } = req.body;

      // 数据验证
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: '请填写所有必填字段'
        });
      }

      // 保存数据
      await saveContact({ name, email, message });

      res.json({ success: true, message: '提交成功' });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: '提交失败'
      });
    }
  }
}

// 客户端组件
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // 处理成功
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      // 处理错误
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单字段 */}
    </form>
  );
}
```

#### Next.js (Server Actions)

**Server Actions 定义** (我们的项目 `src/lib/actions.ts`):
```tsx
'use server'; // 标记为服务器端代码

import { revalidatePath } from 'next/cache';

export async function submitContactForm(formData: ContactFormData) {
  try {
    // 数据验证
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return {
        success: false,
        message: '请填写所有必填字段'
      };
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: '请输入有效的邮箱地址'
      };
    }

    // 保存到数据库
    const newContact = {
      ...formData,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString()
    };

    // 这里会连接真实数据库
    console.log('新的联系表单提交:', newContact);

    // 重新验证缓存
    revalidatePath('/');

    return {
      success: true,
      message: '感谢您的留言！我会尽快回复您。'
    };

  } catch (error) {
    console.error('提交联系表单时出错:', error);
    return {
      success: false,
      message: '提交失败，请稍后重试。'
    };
  }
}
```

**组件中使用** (我们的项目 `src/components/features/ContactForm.tsx`):
```tsx
'use client';

import { submitContactForm } from '@/lib/actions';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const result = await submitContactForm(formData);
      setResult(result);

      if (result.success) {
        // 重置表单
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: '提交失败，请稍后重试。'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 表单字段 */}
      <input
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="请输入您的姓名"
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? '发送中...' : '发送消息'}
      </button>
    </form>
  );
}
```

**关键区别**:
- ✅ Next.js 15 的 Server Actions 无需创建 API 路由
- ✅ 类型安全，直接调用函数
- ✅ 自动处理表单状态和错误
- ✅ 支持渐进式增强

## ⚡ 性能对比

### React (客户端渲染)
```
用户请求 → 下载 HTML → 下载 JS → 执行 JS → 获取数据 → 渲染页面
```

**缺点**:
- 首次加载时间长
- SEO 效果差
- 用户体验有延迟

### Next.js (服务器渲染)
```
用户请求 → 服务器渲染 → 返回 HTML → 客户端激活 → 交互可用
```

**优点**:
- ✅ 首次加载速度快
- ✅ SEO 友好
- ✅ 更好的用户体验

## 🛠️ 开发体验对比

### React
```bash
# 创建项目
npx create-react-app my-app
cd my-app

# 需要手动配置
npm install react-router-dom axios
npm install -D tailwindcss postcss autoprefixer
```

**配置需求**:
- 路由配置
- 构建工具配置
- CSS 预处理器配置
- 开发服务器配置

### Next.js
```bash
# 创建项目
npx create-next-app@latest my-app --typescript --tailwind --eslint --app

# 开箱即用
npm run dev
```

**内置功能**:
- ✅ 路由系统
- ✅ CSS 预处理器
- ✅ TypeScript 支持
- ✅ ESLint 配置
- ✅ 图片优化
- ✅ API 路由
- ✅ 中间件

## 📊 功能对比表

| 特性 | React | Next.js |
|------|-------|---------|
| **渲染模式** | 客户端渲染 | 服务器组件 + 客户端组件 |
| **路由** | 需要 react-router | 文件系统路由 (App Router) |
| **数据获取** | 客户端 useEffect | 服务器端 + 客户端 |
| **SEO** | 需要额外配置 | 内置 SEO 优化 |
| **API** | 需要创建路由 | Server Actions |
| **性能** | 客户端运行时 | 预渲染 + 优化 |
| **开发体验** | 需要配置多个工具 | 开箱即用 |
| **类型安全** | 需要额外配置 | 内置 TypeScript |
| **图片优化** | 需要第三方库 | 内置 next/image |
| **代码分割** | 手动配置 | 自动分割 |
| **缓存策略** | 手动实现 | 内置缓存 |

## 🎯 选择建议

### 选择 React 如果你:
- 🔥 构建纯前端应用 (SPA)
- 🔧 需要最大化的灵活性
- 📱 开发移动应用或桌面应用
- 🎮 开发游戏或交互式应用
- 🏗️ 需要与其他框架深度集成

### 选择 Next.js 如果你:
- 🌐 需要优秀的 SEO 优化
- 📝 构建内容网站、博客、电商
- ⚡ 重视性能和用户体验
- 🚀 想要完整的开发体验
- 📱 构建企业级应用
- 🔒 需要服务器端功能

## 📚 学习路径建议

### 1. 先学 React
```typescript
// 掌握基础概念
function Component() {
  const [state, setState] = useState(0);

  useEffect(() => {
    // 副作用
  }, []);

  return <div>{state}</div>;
}
```

### 2. 再学 Next.js
```typescript
// 理解服务器组件
export default function ServerComponent() {
  const data = await fetchData(); // 服务器端

  return <div>{data}</div>;
}

// 理解客户端组件
'use client';
function ClientComponent() {
  const [state, setState] = useState(0);

  return <div>{state}</div>;
}
```

## 🚀 实践项目

我们创建的 Next.js 15 个人作品集项目完美展示了：

- ✅ **服务器组件**: 首页、博客页面
- ✅ **客户端组件**: Header、ContactForm
- ✅ **Server Actions**: 联系表单、文章创建
- ✅ **App Router**: 文件系统路由
- ✅ **SEO 优化**: 元数据配置
- ✅ **类型安全**: TypeScript 配置

这个项目是学习 Next.js 15 最佳实践的完美起点！

## 🔗 有用资源

- [React 官方文档](https://react.dev/)
- [Next.js 官方文档](https://nextjs.org/docs)
- [App Router 教程](https://nextjs.org/learn)
- [Server Actions 指南](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)

---

**总结**: Next.js 是 React 的超集，提供了开箱即用的全栈开发体验。如果你已经了解 React，学习 Next.js 将让你能够构建更强大、更高效的 Web 应用！