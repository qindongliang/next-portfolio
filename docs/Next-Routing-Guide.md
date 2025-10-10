# Next.js 路由系统完全指南

> 基于 Next.js 15 App Router 的实际项目示例

## 📚 目录

- [路由基础](#路由基础)
- [文件系统路由](#文件系统路由)
- [动态路由](#动态路由)
- [导航实现](#导航实现)
- [特殊函数](#特殊函数)
- [路由模式对比](#路由模式对比)

## 🎯 路由基础

### 什么是路由？
路由是将 URL 路径映射到页面组件的机制。当用户访问特定 URL 时，Next.js 会渲染对应的页面组件。

### Next.js 15 App Router

基于文件系统的路由系统，文件结构直接决定路由结构。

## 📁 文件系统路由

### 基本映射规则

```
src/app/
├── layout.tsx         # 根布局 (/)
├── page.tsx           # 首页 (/)
├── blog/
│   ├── page.tsx       # 博客列表 (/blog)
│   └── [slug]/        # 动态路由 (/blog/:slug)
│       └── page.tsx   # 文章详情页
├── admin/
│   └── page.tsx       # 管理后台 (/admin)
└── demo/
    └── page.tsx       # 演示页面 (/demo)
```

### 路径映射关系

| 文件路径 | URL 路径 | 说明 |
|---------|----------|------|
| `src/app/page.tsx` | `/` | 网站首页 |
| `src/app/blog/page.tsx` | `/blog` | 博客列表页 |
| `src/app/admin/page.tsx` | `/admin` | 管理后台 |
| `src/app/demo/page.tsx` | `/demo` | 演示页面 |
| `src/app/blog/[slug]/page.tsx` | `/blog/:slug` | 动态文章页 |

## 🎯 动态路由详解

### 动态段语法

使用方括号 `[paramName]` 创建动态段：

```typescript
// src/app/blog/[slug]/page.tsx
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
```

### 多种动态路由模式

#### 1. 单个动态参数
```bash
src/app/blog/[slug]/page.tsx
# /blog/nextjs-15-features → { slug: "nextjs-15-features" }
# /blog/typescript-tips → { slug: "typescript-tips" }
```

#### 2. 多个动态参数
```bash
src/app/users/[id]/posts/[postId]/page.tsx
# /users/123/posts/456 → { id: "123", postId: "456" }
```

#### 3. 可选参数
```bash
src/app/blog/[slug]/edit/page.tsx
# /blog/nextjs-15-features/edit → { slug: "nextjs-15-features" }
```

### 我们项目中的动态路由实现

#### 数据定义 (`src/lib/data.ts`)
```typescript
export const posts: Post[] = [
  {
    id: "1",
    title: "Next.js 15 新特性详解",
    slug: "nextjs-15-features",  // 🎯 这就是动态参数！
    excerpt: "深入了解 Next.js 15 带来的革命性新特性...",
    content: "文章内容...",
    // ...
  },
  {
    id: "2",
    title: "TypeScript 最佳实践",
    slug: "typescript-best-practices",  // 🎯 这就是动态参数！
    excerpt: "分享 TypeScript 开发中的最佳实践...",
    // ...
  },
  {
    id: "3",
    title: "Tailwind CSS 实战技巧",
    slug: "tailwind-css-tips",        // 🎯 这就是动态参数！
    excerpt: "分享使用 Tailwind CSS 的实用技巧...",
    // ...
  }
];
```

#### 页面组件 (`src/app/blog/[slug]/page.tsx`)
```typescript
// 🎯 这是文章详情页的服务器组件
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // 🔍 从 URL 参数中提取 slug
  const post = await getPostBySlug(params.slug);

  // 🚫 如果文章不存在，返回 404
  if (!post) {
    notFound();
  }

  // ✅ 渲染文章内容
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {post.title}
        </h1>

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{
            __html: post.content.replace(/\n/g, '<br />')
          }} />
        </div>
      </div>
    </div>
  );
}
```

#### 数据获取函数 (`src/lib/data.ts`)
```typescript
export async function getPostBySlug(slug: string): Promise<Post | null> {
  // 🔍 根据 slug 查找文章
  const post = posts.find(p => p.slug === slug && p.published);
  return post || null;
}
```

## 🧭 导航系统实现

### 导航配置 (`src/components/ui/Header.tsx`)
```typescript
const Header = () => {
  // 🎯 导航配置数组
  const navigation = [
    { name: '首页', href: '/' },           // ✅ 页面路由
    { name: '博客', href: '/blog' },       // ✅ 页面路由
    { name: '项目', href: '#projects' },   // ⚓️ 锚点链接
    { name: '关于', href: '#about' },      // ⚓️ 锚点链接
    { name: '联系', href: '#contact' },   // ⚓️ 锚点链接
    { name: '演示', href: '/demo' }       // ✅ 页面路由
  ];

  return (
    <header>
      <nav>
        {/* 桌面端导航 */}
        <div className="hidden md:block">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* 移动端导航 */}
        <div className="md:hidden">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};
```

### 页面路由 vs 锚点链接

#### 📍 页面路由 - 跳转到新页面
```jsx
<Link href="/blog">博客</Link>
```
- **效果**: 整个页面切换
- **URL变化**: `/` → `/blog`
- **组件**: 渲染 `src/app/blog/page.tsx`

#### ⚓️ 锚点链接 - 页面内滚动
```jsx
<Link href="#projects">项目</Link>
```
- **效果**: 页面内滚动到指定位置
- **URL变化**: `/` → `/` + `#projects`
- **组件**: 仍在当前页面

### 我们项目中的锚点实现

#### 首页结构 (`src/app/page.tsx`)
```jsx
// 🏠 页面结构 - 一个长页面包含多个部分
return (
  <div>
    {/* Hero Section */}
    <section className="min-h-screen">
      {/* 个人介绍内容 */}
    </section>

    {/* About Section */}
    <section id="about" className="py-20">
      {/* 关于我的内容 */}
    </section>

    {/* Projects Section */}
    <section id="projects" className="py-20">
      {/* 项目展示内容 */}
    </section>

    {/* Contact Section */}
    <section id="contact" className="py-20">
      {/* 联系表单内容 */}
    </section>
  </div>
);
```

#### 博客列表页面的链接 (`src/app/blog/page.tsx`)
```tsx
// 📝 博客文章卡片中的链接
{posts.map((post) => (
  <article key={post.id}>
    {/* 文章标题链接到详情页 */}
    <Link href={`/blog/${post.slug}`}>
      {post.title}
    </Link>

    {/* 阅读更多链接 */}
    <Link href={`/blog/${post.slug}`}>
      阅读全文
    </Link>
  </article>
))}
```

## 🎯 特殊函数：约定俗成的用法

这些函数虽然没有显式调用，但 Next.js 会在特定时机自动调用。

### 1. `generateStaticParams()` - 静态生成

#### 🔍 何时调用？
- **构建时** (`npm run build`)
- **开发时** (路由首次访问)
- **增量更新时** (ISR)

#### 📝 实现示例
```typescript
// src/app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  // 🔍 获取所有文章
  const posts = await getPosts();

  // 📋 返回所有可能的 slug 参数
  return posts.map((post) => ({
    slug: post.slug,
  }));
  // 返回: [
  //   { slug: "nextjs-15-features" },
  //   { slug: "typescript-best-practices" },
  //   { slug: "tailwind-css-tips" }
  // ]
}
```

#### 🏗️ 内部处理流程
```typescript
// Next.js 内部逻辑（简化版）
class NextJSInternal {
  async function handleRequest(req) {
    const pathname = req.nextUrl.pathname;

    // 1. 检查是否是动态路由
    if (this.isDynamicRoute(pathname)) {
      // 2. 检查是否已预生成
      const isPrebuilt = await this.isPagePrebuilt(pathname);

      if (!isPrebuilt) {
        // 3. 调用 generateStaticParams 预生成
        if (this.hasGenerateStaticParams(pathname)) {
          await this.callGenerateStaticParams(pathname);
        }
      }
    }

    // 4. 渲染页面
    return this.renderPage(req);
  }
}
```

### 2. `generateMetadata()` - 元数据生成

#### 🔍 何时调用？
- **页面渲染前**
- **SEO 优化时**
- **动态路由参数变化时**

#### 📝 实现示例
```typescript
// src/app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  // 🔍 根据参数获取文章
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  // 🏷️ 返回页面元数据
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, ...post.tags],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      locale: "zh_CN",
    },
  };
}
```

#### 🔧 内部处理流程
```typescript
// Next.js 内部逻辑（简化版）
class NextJSInternal {
  async function renderPage(req, pageComponent) {
    // 1. 检查是否有 generateMetadata
    if (pageComponent.generateMetadata) {
      // 2. 调用函数生成元数据
      const metadata = await pageComponent.generateMetadata(params);

      // 3. 注入到 HTML <head> 中
      this.injectMetadataToHead(metadata);
    }

    // 4. 渲染页面组件
    const pageHtml = await pageComponent(params);

    return pageHtml;
  }
}
```

## 🔗 路由模式对比

### React Router vs Next.js Router

#### React Router (需要额外配置)
```jsx
// 1. 安装依赖
npm install react-router-dom

// 2. 配置路由
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/blog">博客</Link>
        <Link to="/blog/:slug">文章详情</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}

// 动态参数获取
function BlogPost() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then(res => res.json())
      .then(setPost);
  }, [slug]);

  if (!post) return <div>加载中...</div>;

  return <h1>{post.title}</h1>;
}
```

#### Next.js Router (内置配置)
```tsx
// 1. 无需安装额外依赖

// 2. 文件系统自动配置路由
// src/app/page.tsx → /
// src/app/blog/page.tsx → /blog
// src/app/blog/[slug]/page.tsx → /blog/:slug

// 3. 使用 Link 组件
import Link from 'next/link';

function App() {
  return (
    <div>
      <nav>
        <Link href="/">首页</Link>
        <Link href="/blog">博客</Link>
        <Link href="/blog/nextjs-15-features">文章详情</Link>
      </nav>

      {/* Next.js 会根据 URL 自动渲染对应组件 */}
    </div>
  );
}

// 动态参数获取（服务器组件）
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // 直接获取参数，无需 useState 和 useEffect
  const post = await getPostBySlug(params.slug);

  if (!post) notFound();

  return <h1>{post.title}</h1>;
}
```

## 📊 功能对比表

| 特性 | React Router | Next.js Router |
|------|-------------|--------------|
| **安装配置** | 需要安装 react-router-dom | 内置，无需额外配置 |
| **路由定义** | 手动配置 Route 组件 | 文件系统自动映射 |
| **动态参数** | useParams() Hook | 函数参数传递 |
| **数据获取** | 客户端 useEffect | 服务器端 + 客户端 |
| **代码分割** | 手动实现 React.lazy | 自动代码分割 |
| **SEO** | 需要额外工具 | 内置 SEO 优化 |
| **预渲染** | 手动实现 | 内置 SSG/SSR |
| **类型安全** | 需要额外配置 | 内置 TypeScript |

## 🎯 学习要点总结

### 1. **文件系统路由**
- 文件路径直接映射 URL 路径
- `page.tsx` 文件自动成为页面组件
- 支持嵌套目录结构

### 2. **动态路由**
- 使用 `[paramName]` 语法创建动态段
- 通过函数参数获取 URL 参数
- 支持多层嵌套的动态参数

### 3. **约定俗成的函数**
- `generateStaticParams()` - 静态生成动态路由
- `generateMetadata()` - 生成页面元数据
- Next.js 在特定时机自动调用

### 4. **导航实现**
- 使用 Next.js `Link` 组件
- 区分页面路由和锚点链接
- 支持响应式设计

### 5. **性能优化**
- 自动代码分割
- 静态生成提升性能
- 预加载和缓存优化

## 🚀 实践建议

### 1. 优先使用文件系统路由
```typescript
// ✅ 推荐：清晰的文件结构
src/app/
├── blog/
│   ├── page.tsx           # /blog
│   └── [slug]/page.tsx    # /blog/:slug
│   └── category/[cat]/page.tsx  # /blog/:cat
```

### 2. 合理使用动态路由
```typescript
// ✅ 合理：文章详情页
src/app/blog/[slug]/page.tsx

// ✅ 合理：用户资料页
src/app/users/[id]/page.tsx

// ❌ 避免：过于复杂的动态路径
src/app/a/b/c/[param]/page.tsx
```

### 3. 充分利用约定俗成函数
```typescript
// ✅ 使用 generateStaticParams 提升性能
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

// ✅ 使用 generateMetadata 优化 SEO
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return { title: post.title, description: post.excerpt };
}
```

## 🔗 实际项目演示

我们的 Next.js 15 个人作品集项目完美展示了：

1. **📁 清晰的文件结构**
2. **🎯 动态路由实现** - 博客文章详情页
3. **🧭 完整的导航系统** - 页面路由 + 锚点链接
4. **⚡ 特殊函数应用** - 静态生成和元数据优化
5. **🎯 类型安全** - 完整的 TypeScript 支持

这个路由系统展示了 Next.js 15 App Router 的强大功能：简洁的配置、强大的功能、优秀的性能！🚀

---

**总结**: Next.js 的文件系统路由让路由配置变得简单直观，约定俗成的特殊函数进一步简化了复杂功能的实现，这就是为什么 Next.js 被称为"生产就绪的 React 框架"！