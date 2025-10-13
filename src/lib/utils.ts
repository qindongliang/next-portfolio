import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 格式化日期
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// 格式化日期为 ISO 格式
export function formatDateISO(date: string): string {
  return new Date(date).toISOString();
}

// 生成文章摘要
export function generateExcerpt(content: string, maxLength: number = 150): string {
  // 移除 Markdown 语法
  const plainText = content
    .replace(/[#*`_~\[\]()]/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

// 延迟函数（用于加载状态）
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 生成唯一 ID
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// 检查 URL 是否有效
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// 截断文本
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}

// 生成文章 URL 路径
export function getPostUrl(slug: string): string {
  return `/blog/${slug}`;
}

// 生成项目卡片的 alt 文本
export function getProjectImageAlt(title: string): string {
  return `${title} 项目截图`;
}

// 生成文章卡片的 alt 文本
export function getPostImageAlt(title: string): string {
  return `${title} 文章封面图`;
}
