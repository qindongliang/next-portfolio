# Next.js 约定俗成用法和规则指南

本文档总结了 Next.js 开发中的约定俗成用法和最佳实践，帮助开发者创建一致、可维护的 Next.js 应用。

## 目录

- [目录结构约定](#目录结构约定)
- [路由约定](#路由约定)
- [组件命名约定](#组件命名约定)
- [文件命名约定](#文件命名约定)
- [代码结构约定](#代码结构约定)
- [样式约定](#样式约定)
- [API 路由约定](#api-路由约定)
- [最佳实践约定](#最佳实践约定)

## 目录结构约定

```
src/
├── app/                  # App Router 页面目录
│   ├── page.tsx         # 首页 (/)
│   ├── layout.tsx       # 根布局
│   ├── blog/
│   │   ├── page.tsx     # 博客列表页 (/blog)
│   │   └── [slug]/
│   │       └── page.tsx # 博客详情页 (/blog/[slug])
│   └── admin/
│       └── page.tsx     # 管理页面 (/admin)
├── components/          # 可复用组件
│   ├── ui/             # 基础 UI 组件
│   │   ├── Button.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── features/       # 功能性组件
│       └── ContactForm.tsx
├── lib/                # 工具函数和配置
│   ├── utils.ts
│   ├── data.ts
│   └── actions.ts
├── types/              # TypeScript 类型定义
│   └── index.ts
├── public/             # 静态资源
└── styles/             # 样式文件
    └── globals.css
```

## 路由约定

### App Router (Next.js 13+)

#### 基础页面路由
```
src/app/page.tsx              → /
src/app/blog/page.tsx         → /blog
src/app/admin/page.tsx        → /admin
src/app/demo/page.tsx         → /demo
```

**规则：**
- 文件名必须为 `page.tsx` 才能表示页面组件
- 文件夹路径自动映射为 URL 路径
- 使用默认导出 (`export default`) 作为页面组件

#### 动态路由
```
src/app/blog/[slug]/page.tsx  → /blog/任何内容
src/app/users/[id]/page.tsx   → /users/:id
src/app/posts/[...slug]/page.tsx → 捕获所有路由
```

**规则：**
- 使用方括号 `[slug]` 表示动态参数
- 组件接收 `params` 参数，包含动态路由值
- `[...slug]` 捕获所有后续路由段

#### 布局路由
```
src/app/layout.tsx            # 根布局
src/app/blog/layout.tsx       # 博客布局
src/app/admin/layout.tsx      # 管理布局
```

**规则：**
- `layout.tsx` 定义共享布局
- 嵌套布局：每个文件夹可以有 `layout.tsx`
- 自动包裹该路由段下的所有页面

#### 特殊路由文件
```
src/app/loading.tsx           # 加载状态组件
src/app/error.tsx             # 错误边界组件
src/app/not-found.tsx         # 404 页面
src/app/route.ts              # API 路由
```

## 组件命名约定

### 页面组件
- 使用 `PascalCase` 命名
- 文件名与组件名保持一致
- 使用默认导出

```typescript
// HomePage.tsx ✅
export default function HomePage() {
  return <div>首页</div>;
}

// BlogPostPage.tsx ✅
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <div>博客文章</div>;
}
```

### 可复用组件
- 使用描述性的 `PascalCase` 名称
- 一个文件主要导出一个组件
- 使用 `forwardRef` 支持 ref 传递

```typescript
// Button.tsx ✅
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(...);
Button.displayName = 'Button';
export default Button;
```

### 工具函数
- 使用 `camelCase` 命名
- 文件名与主要导出函数同名
- 使用命名导出

```typescript
// utils.ts ✅
export function formatDate(date: string) {
  // 格式化日期
}

export function cn(...inputs: ClassValue[]) {
  // 合并类名
}
```

## 文件命名约定

### App 目录 - 遵循 Next.js 约定
```
src/app/
├── page.tsx          # 必须叫 page.tsx
├── layout.tsx        # 必须叫 layout.tsx
├── loading.tsx       # 必须叫 loading.tsx
├── error.tsx         # 必须叫 error.tsx
├── not-found.tsx     # 必须叫 not-found.tsx
├── route.ts          # 必须叫 route.ts (API)
└── blog/
    ├── page.tsx      # 必须叫 page.tsx
    └── [slug]/
        └── page.tsx  # 必须叫 page.tsx
```

### 其他目录 - 完全自由命名
```
src/components/
├── ui/
│   ├── Button.tsx        # ✅ 自定义名称
│   ├── CustomHeader.tsx  # ✅ 自定义名称
│   └── AwesomeFooter.tsx # ✅ 自定义名称
├── features/
│   ├── ContactForm.tsx   # ✅ 自定义名称
│   └── BlogCard.tsx      # ✅ 自定义名称
└── layout/
    ├── Navbar.tsx        # ✅ 自定义名称
    └── Sidebar.tsx       # ✅ 自定义名称
```

### 文件扩展名
- React 组件：`.tsx`
- 纯 TypeScript：`.ts`
- 样式文件：`.css`, `.scss`, `.module.css`
- 配置文件：`.json`, `.js`, `.mjs`

## 代码结构约定

### 导入顺序
```typescript
// 1. React 相关
import { useState, useEffect } from 'react';
import type { NextPage } from 'next';

// 2. Next.js 相关
import Link from 'next/link';
import Image from 'next/image';

// 3. 第三方库
import { Button } from 'antd';
import { User } from 'lucide-react';

// 4. 本地组件
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

// 5. 工具函数
import { formatDate } from '@/lib/utils';
import { getPosts } from '@/lib/data';

// 6. 类型定义
import type { Post } from '@/types';
```

### 导出方式
```typescript
// 默认导出 - 主要组件/功能
export default function HomePage() {
  // 组件内容
}

// 命名导出 - 辅助函数
export function formatTitle(title: string) {
  return title.trim();
}

// 类型导出
export type Post = {
  id: string;
  title: string;
};
```

## 样式约定

### CSS Modules
```typescript
// Button.module.tsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.button}>点击</button>;
}
```

### Tailwind CSS 类名顺序
```typescript
// 推荐的类名顺序：布局 → 排版 → 颜色 → 交互
<div className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
  内容
</div>
```

### 全局样式
```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 自定义基础样式 */
@layer base {
  html {
    font-family: system-ui, sans-serif;
  }
}

/* 自定义组件样式 */
@layer components {
  .btn-primary {
    @apply bg-blue-600 text-white px-4 py-2 rounded-lg;
  }
}
```

## API 路由约定

### App Router API 路由
```typescript
// src/app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

// GET 请求
export async function GET(request: NextRequest) {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

// POST 请求
export async function POST(request: NextRequest) {
  const body = await request.json();
  const post = await createPost(body);
  return NextResponse.json(post, { status: 201 });
}
```

### 动态 API 路由
```typescript
// src/app/api/posts/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await getPostById(params.id);

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}
```

## 最佳实践约定

### TypeScript 使用
```typescript
// 强类型定义
interface BlogPost {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  author: {
    name: string;
    email: string;
  };
}

// 泛型组件
function List<T>({ items, renderItem }: {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
```

### 服务器组件 vs 客户端组件
```typescript
// 服务器组件（默认）
export default async function BlogPage() {
  const posts = await getPosts(); // 直接在服务端获取数据

  return (
    <div>
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
}

// 客户端组件（需要交互）
'use client';
export default function InteractiveComponent() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      点击次数: {count}
    </button>
  );
}
```

### 路由生成约定
```typescript
// 静态路径生成
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 元数据生成
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    },
  };
}
```

### 链接导航
```typescript
import Link from 'next/link';

// 基础用法
<Link href="/blog">博客</Link>

// 动态路由
<Link href={`/blog/${post.slug}`}>
  {post.title}
</Link>

// 外部链接
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  外部链接
</a>
```

### 图片优化
```typescript
import Image from 'next/image';

// 优化图片
<Image
  src="/hero-image.jpg"
  alt="英雄图片"
  width={800}
  height={400}
  priority // 首屏图片优先加载
  className="rounded-lg"
/>
```

### 表单处理
```typescript
'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // 处理成功
      }
    } catch (error) {
      // 处理错误
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单字段 */}
    </form>
  );
}
```

## 性能优化约定

### 代码分割
```typescript
// 动态导入大组件
const AdminDashboard = dynamic(() => import('@/components/AdminDashboard'), {
  loading: () => <div>加载中...</div>,
  ssr: false, // 客户端渲染
});
```

### 数据获取
```typescript
// 使用 Server Actions
import { getPosts, createPost } from '@/lib/actions';

// 在服务器组件中
export default async function BlogPage() {
  const posts = await getPosts();

  return <BlogList posts={posts} />;
}

// 在客户端组件中使用
'use client';
export default function CreatePostForm() {
  const createPostWithId = createPost.bind(null, generateId());

  return (
    <form action={createPostWithId}>
      {/* 表单字段 */}
    </form>
  );
}
```

## 测试约定

### 组件测试
```typescript
// __tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/ui/Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 总结

遵循这些约定可以：

1. **提高代码可读性** - 统一的命名和结构
2. **增强可维护性** - 清晰的文件组织
3. **提升开发效率** - 减少思考时间
4. **改善团队协作** - 统一的开发规范
5. **优化性能** - 利用 Next.js 特性

记住：约定优于配置，但在必要时可以灵活调整！