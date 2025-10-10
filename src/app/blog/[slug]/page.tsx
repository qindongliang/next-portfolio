import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { getPostBySlug, getPosts } from '@/lib/data';
import { formatDate } from '@/lib/utils';

// 生成静态参数（静态生成）
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 生成元数据
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
    },
  };
}

// 这是文章详情页的服务器组件
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 返回按钮 */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回博客列表
          </Link>
        </div>

        {/* 文章头部 */}
        <header className="mb-12">
          {/* 文章标题 */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* 文章元信息 */}
          <div className="flex flex-wrap items-center text-gray-600 mb-8 space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center">
              <Tag className="h-5 w-5 mr-2" />
              <span className="text-sm">{post.category}</span>
            </div>
          </div>

          {/* 文章标签 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 文章封面图占位符 */}
          <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center mb-8">
            <span className="text-white text-2xl font-bold">
              {post.title}
            </span>
          </div>
        </header>

        {/* 文章内容 */}
        <article className="prose prose-lg max-w-none">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            {/* 将 Markdown 内容转换为 HTML */}
            <div
              className="prose prose-lg max-w-none text-gray-800"
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/\n/g, '<br />')
              }}
            />
          </div>
        </article>

        {/* 文章底部 */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              觉得这篇文章有帮助吗？
            </h3>
            <p className="text-gray-600 mb-4">
              欢迎分享给你的朋友，或者在评论区留下你的想法！
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/blog"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                阅读更多文章
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                联系我
              </Link>
            </div>
          </div>
        </footer>

        {/* 相关文章（可选） */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            相关文章
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 这里可以添加相关文章的逻辑 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                暂无相关文章
              </h3>
              <p className="text-gray-600">
                更多精彩内容正在整理中...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}