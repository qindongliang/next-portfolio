import { Post, Project, Skill, PersonalInfo } from '@/types';

// 模拟个人信息数据
export const personalInfo: PersonalInfo = {
  name: "张三",
  title: "全栈开发工程师",
  bio: "热爱编程，专注于现代 Web 开发技术，擅长 React、Next.js、Node.js 等技术栈。",
  avatar: "/avatar.jpg",
  email: "zhangsan@example.com",
  github: "https://github.com/zhangsan",
  linkedin: "https://linkedin.com/in/zhangsan",
  location: "北京, 中国"
};

// 模拟技能数据
export const skills: Skill[] = [
  { name: "React", level: "advanced", category: "frontend" },
  { name: "Next.js", level: "advanced", category: "frontend" },
  { name: "TypeScript", level: "intermediate", category: "frontend" },
  { name: "Tailwind CSS", level: "advanced", category: "frontend" },
  { name: "Node.js", level: "intermediate", category: "backend" },
  { name: "Express.js", level: "intermediate", category: "backend" },
  { name: "PostgreSQL", level: "beginner", category: "backend" },
  { name: "Docker", level: "beginner", category: "devops" },
  { name: "Git", level: "advanced", category: "devops" },
  { name: "Figma", level: "intermediate", category: "design" }
];

// 模拟项目数据
export const projects: Project[] = [
  {
    id: "1",
    title: "个人博客系统",
    description: "基于 Next.js 15 构建的现代博客系统，支持 Markdown 写作、标签分类、搜索功能等。",
    imageUrl: "/projects/blog.jpg",
    demoUrl: "https://blog-demo.vercel.app",
    githubUrl: "https://github.com/zhangsan/blog",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    featured: true,
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    title: "电商管理后台",
    description: "为中小型电商打造的商品管理、订单处理、数据可视化后台系统。",
    imageUrl: "/projects/ecommerce.jpg",
    demoUrl: "https://ecommerce-admin.vercel.app",
    githubUrl: "https://github.com/zhangsan/ecommerce-admin",
    technologies: ["React", "Node.js", "MongoDB", "Ant Design"],
    featured: true,
    createdAt: "2024-02-20"
  },
  {
    id: "3",
    title: "天气预报应用",
    description: "实时天气信息展示，支持多城市管理、天气预报可视化。",
    imageUrl: "/projects/weather.jpg",
    demoUrl: "https://weather-app.vercel.app",
    githubUrl: "https://github.com/zhangsan/weather-app",
    technologies: ["React Native", "TypeScript", "OpenWeather API"],
    featured: false,
    createdAt: "2024-03-10"
  },
  {
    id: "4",
    title: "任务管理工具",
    description: "简洁高效的任务管理应用，支持团队协作、进度跟踪。",
    imageUrl: "/projects/taskmanager.jpg",
    demoUrl: "https://task-manager.vercel.app",
    githubUrl: "https://github.com/zhangsan/task-manager",
    technologies: ["Vue.js", "Express", "PostgreSQL"],
    featured: false,
    createdAt: "2024-04-05"
  }
];

// 模拟博客文章数据
export const posts: Post[] = [
  {
    id: "1",
    title: "Next.js 15 新特性详解",
    slug: "nextjs-15-features",
    excerpt: "深入了解 Next.js 15 带来的革命性新特性，包括 App Router、Server Actions 等。",
    content: `# Next.js 15 新特性详解

Next.js 15 带来了许多令人兴奋的新特性，让我们一起来了解一下...

## 1. App Router

全新的 App Router 提供了更强大的路由能力...

## 2. Server Actions

服务器操作让表单处理变得前所未有的简单...

## 3. 性能优化

Next.js 15 在性能方面也有显著提升...`,
    coverImage: "/posts/nextjs-15.jpg",
    publishedAt: "2024-10-08",
    updatedAt: "2024-10-09",
    author: {
      name: "张三",
      avatar: "/avatar.jpg"
    },
    tags: ["Next.js", "React", "Web开发"],
    category: "技术分享",
    published: true
  },
  {
    id: "2",
    title: "TypeScript 最佳实践",
    slug: "typescript-best-practices",
    excerpt: "分享 TypeScript 开发中的最佳实践和常见陷阱。",
    content: `# TypeScript 最佳实践

TypeScript 为 JavaScript 开发带来了类型安全...

## 类型定义

良好的类型定义是 TypeScript 开发的基础...

## 工具配置

正确的 tsconfig.json 配置...`,
    coverImage: "/posts/typescript.jpg",
    publishedAt: "2024-10-05",
    updatedAt: "2024-10-05",
    author: {
      name: "张三",
      avatar: "/avatar.jpg"
    },
    tags: ["TypeScript", "JavaScript", "类型系统"],
    category: "技术分享",
    published: true
  },
  {
    id: "3",
    title: "Tailwind CSS 实战技巧",
    slug: "tailwind-css-tips",
    excerpt: "分享使用 Tailwind CSS 的实用技巧和高级用法。",
    content: `# Tailwind CSS 实战技巧

Tailwind CSS 提供了前所未有的开发体验...

## 响应式设计

Tailwind 的响应式系统非常直观...

## 自定义配置

通过 tailwind.config.js 实现个性化配置...`,
    coverImage: "/posts/tailwind.jpg",
    publishedAt: "2024-10-01",
    updatedAt: "2024-10-02",
    author: {
      name: "张三",
      avatar: "/avatar.jpg"
    },
    tags: ["CSS", "Tailwind", "样式"],
    category: "前端开发",
    published: true
  }
];

// 模拟的博客文章数据获取函数
export async function getPosts(): Promise<Post[]> {
  // 在实际应用中，这里会从数据库或 API 获取数据
  return posts.filter(post => post.published);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = posts.find(p => p.slug === slug && p.published);
  return post || null;
}

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return projects.filter(project => project.featured);
}

// 同步版本，用于服务器组件
export function getFeaturedProjectsSync(): Project[] {
  return projects.filter(project => project.featured);
}