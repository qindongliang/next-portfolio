'use client'; // 客户端组件，用于演示交互功能

import { useState } from 'react';
import {
  Server,
  Database,
  Zap,
  Code,
  Upload,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { uploadImage, createPost } from '@/lib/actions';
import { Button } from '@/components/ui/Button';

export default function DemoPage() {
  const [isServerActionLoading, setIsServerActionLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success: boolean;
    message: string;
    imageUrl?: string;
  } | null>(null);
  const [postResult, setPostResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 演示图片上传
  const handleImageUpload = async (formData: FormData) => {
    setIsServerActionLoading(true);
    setUploadResult(null);

    try {
      const result = await uploadImage(formData);
      setUploadResult(result);
    } catch {
      setUploadResult({
        success: false,
        message: '上传失败，请稍后重试。'
      });
    } finally {
      setIsServerActionLoading(false);
    }
  };

  // 演示文章创建
  const handleCreatePost = async () => {
    setIsServerActionLoading(true);
    setPostResult(null);

    try {
      const result = await createPost({
        title: 'Next.js 15 演示文章',
        content: '这是一篇通过 Server Actions 创建的演示文章，展示了 Next.js 15 的新特性。',
        excerpt: 'Next.js 15 Server Actions 演示',
        category: '技术分享',
        tags: ['Next.js', 'Server Actions', '演示']
      });
      setPostResult(result);
    } catch {
      setPostResult({
        success: false,
        message: '创建失败，请稍后重试。'
      });
    } finally {
      setIsServerActionLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const nextjs15Features = [
    {
      icon: Server,
      title: 'Server Actions',
      description: '在组件中直接调用服务器端函数，简化数据操作和表单处理',
      example: 'actions.ts 文件中的 submitContactForm 函数',
      highlight: true
    },
    {
      icon: Database,
      title: 'App Router',
      description: '基于文件系统的新路由，支持布局、并行路由和拦截路由',
      example: 'app/ 目录结构展示了新的路由系统',
      highlight: true
    },
    {
      icon: Zap,
      title: '性能优化',
      description: '更快的冷启动、改进的缓存策略和优化的打包',
      example: 'Turbopack 提供更快的开发体验',
      highlight: false
    },
    {
      icon: Code,
      title: '改进的组件模式',
      description: '更好的 Server/Client 组件区分，更清晰的数据流',
      example: '页面组件使用服务器组件，交互组件使用客户端组件',
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Next.js 15 特性演示
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            这个页面演示了 Next.js 15 的核心新特性，包括 Server Actions、
            App Router、性能优化等。
          </p>
        </div>

        {/* 特性展示 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            核心特性
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {nextjs15Features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-lg shadow-md p-6 ${
                    feature.highlight ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                  }`}
                >
                  <div className="flex items-start mb-4">
                    <div className={`p-3 rounded-lg ${
                      feature.highlight ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`h-6 w-6 ${
                        feature.highlight ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                        {feature.highlight && (
                          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            新特性
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {feature.description}
                      </p>
                      <div className="bg-gray-50 rounded p-3 text-sm text-gray-700">
                        <code className="text-xs">
                          {feature.example}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Server Actions 演示 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Server Actions 演示
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 图片上传演示 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <Upload className="h-5 w-5 inline mr-2" />
                图片上传
              </h3>

              <form
                action={handleImageUpload}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    选择图片文件
                  </label>
                  <input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <Button
                  type="submit"
                  isLoading={isServerActionLoading}
                  disabled={!selectedFile || isServerActionLoading}
                  className="w-full"
                >
                  上传图片
                </Button>
              </form>

              {uploadResult && (
                <div
                  className={`mt-4 p-4 rounded-lg flex items-center ${
                    uploadResult.success
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  }`}
                >
                  {uploadResult.success ? (
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  )}
                  <span className="text-sm">{uploadResult.message}</span>
                </div>
              )}

              {uploadResult?.success && uploadResult.imageUrl && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">上传的图片：</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {uploadResult.imageUrl}
                  </code>
                </div>
              )}
            </div>

            {/* 文章创建演示 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <Code className="h-5 w-5 inline mr-2" />
                创建文章
              </h3>

              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  点击下面的按钮，通过 Server Actions 创建一篇演示文章。
                  这个操作完全在服务器端执行，无需编写 API 路由。
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">文章信息：</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li><strong>标题：</strong>Next.js 15 演示文章</li>
                    <li><strong>分类：</strong>技术分享</li>
                    <li><strong>标签：</strong>Next.js, Server Actions, 演示</li>
                  </ul>
                </div>

                <Button
                  onClick={handleCreatePost}
                  isLoading={isServerActionLoading}
                  disabled={isServerActionLoading}
                  className="w-full"
                >
                  创建演示文章
                </Button>
              </div>

              {postResult && (
                <div
                  className={`p-4 rounded-lg flex items-center ${
                    postResult.success
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  }`}
                >
                  {postResult.success ? (
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  )}
                  <span className="text-sm">{postResult.message}</span>
                </div>
              )}

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Server Actions 优势：</p>
                    <ul className="space-y-1 text-xs">
                      <li>• 无需创建 API 路由</li>
                      <li>• 自动处理表单状态</li>
                      <li>• 类型安全的函数调用</li>
                      <li>• 支持渐进式增强</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 代码示例 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            代码示例
          </h2>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-800 text-white px-4 py-3">
              <h3 className="font-mono text-sm">lib/actions.ts - Server Actions 示例</h3>
            </div>
            <div className="p-6 bg-gray-900 text-gray-100 overflow-x-auto">
              <pre className="text-sm">
                <code>{`'use server'; // 声明为服务器代码

import { revalidatePath } from 'next/cache';

export async function submitContactForm(formData: ContactFormData) {
  // 数据验证
  if (!formData.name.trim() || !formData.email.trim()) {
    return { success: false, message: '请填写必填字段' };
  }

  // 模拟保存到数据库
  console.log('新的联系表单提交:', formData);

  // 重新验证缓存
  revalidatePath('/');

  return { success: true, message: '提交成功！' };
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* 返回首页 */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            返回首页
          </Button>
        </div>
      </div>
    </div>
  );
}