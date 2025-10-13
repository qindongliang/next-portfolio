import Link from "next/link";
import SafeLink from "@/components/ui/SafeLink";
import { Github, ExternalLink, Mail, ArrowRight } from "lucide-react";
import { personalInfo, skills, getFeaturedProjectsSync } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import ContactForm from "@/components/features/ContactForm";
import JavaScriptButton from "@/components/ui/JavaScriptButton";
import HydrationDemo from "@/components/ui/HydrationDemo";

// 这是一个服务器组件，展示个人信息
export default function Home() {
  const featuredProjects = getFeaturedProjectsSync();

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            {/* 头像占位符 */}
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {personalInfo.name.charAt(0)}
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            你好，我是 <span className="text-blue-600">{personalInfo.name}</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 mb-8">
            {personalInfo.title}
          </p>

          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            {personalInfo.bio}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="group">
              查看我的项目
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              联系我
            </Button>
          </div>

          {/* Hydration 演示 */}
          <HydrationDemo />
          {/* 四种导航方式演示 */}
          <div className="mt-12 p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
              四种导航方式演示
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. 普通超链接 */}
              <a
                  href="/data"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                  suppressHydrationWarning={true}
              >
                普通超链接跳转
              </a>

              {/* 2. Next.js Link 组件 */}
              <Link
                href="/data"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors w-full"
              >
                Link 组件跳转
              </Link>

              {/* 3. JavaScript 按钮跳转 */}
              <JavaScriptButton />

              {/* 4. 表单提交方式 */}
              <form action="/data">
                <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                >
                  表单提交跳转
                </button>
              </form>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p className="text-center">
                以上四种方式都能跳转到数据页面，但行为略有不同：
              </p>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• 普通超链接：刷新整个页面</li>
                <li>• Link 组件：客户端路由导航（推荐）</li>
                <li>• JavaScript 按钮：通过编程方式跳转</li>
                <li>• 表单提交：通过 HTTP GET 请求跳转</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              suppressHydrationWarning={true}
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              suppressHydrationWarning={true}
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            关于我
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                全栈开发工程师
              </h3>
              <p className="text-gray-700 mb-6">
                我是一名充满激情的全栈开发工程师，拥有丰富的前端和后端开发经验。
                我专注于使用现代技术栈构建高性能、用户友好的 Web 应用程序。
              </p>
              <p className="text-gray-700 mb-6">
                我擅长 React、Next.js、TypeScript 等前端技术，同时也熟悉 Node.js、Express
                等后端技术。我相信代码质量、用户体验和持续学习的重要性。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">技能专长</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{skill.name}</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: skill.level === 'expert' ? '90%' :
                                 skill.level === 'advanced' ? '75%' :
                                 skill.level === 'intermediate' ? '50%' : '25%'
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            精选项目
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* 项目图片占位符 */}
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {project.title}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                        suppressHydrationWarning={true}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        演示
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                        suppressHydrationWarning={true}
                      >
                        <Github className="h-4 w-4 mr-1" />
                        源码
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 text-base border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              suppressHydrationWarning={true}
            >
              查看更多项目
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              联系我
            </h2>
            <p className="text-xl text-gray-600">
              有项目想法或合作机会？欢迎通过下面的表单联系我！
            </p>
          </div>



          <ContactForm />


        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            有项目想法？让我们一起实现它！
          </h2>
          <p className="text-xl mb-8 opacity-90">
            我正在寻找新的机会和有趣的项目。欢迎与我联系讨论合作机会。
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            立即联系
          </Button>
        </div>
      </section>
    </div>
  );
}
