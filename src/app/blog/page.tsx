import Link from 'next/link';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { getPosts } from '@/lib/data';
import { formatDate } from '@/lib/utils';

// 这是一个服务器组件，展示博客文章列表
export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            技术博客
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            分享我的技术学习心得、开发经验和行业见解
          </p>
        </div>

        {/* 博客文章网格 */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* 文章封面图占位符 */}
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold px-4 text-center">
                    {post.title}
                  </span>
                </div>

                <div className="p-6">
                  {/* 文章元信息 */}
                  <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(post.publishedAt)}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author.name}
                    </div>
                  </div>

                  {/* 文章标题 */}
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {/* 文章摘要 */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* 标签 */}
                  <div className="flex items-center mb-4">
                    <Tag className="h-4 w-4 mr-2 text-gray-400" />
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 阅读更多 */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    阅读全文
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-8">
              暂时还没有发布的文章
            </p>
            <div className="text-gray-400">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
        )}

        {/* 返回首页 */}
        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}