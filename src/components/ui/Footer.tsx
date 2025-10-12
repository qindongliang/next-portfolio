import SafeLink from './SafeLink';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: Github,
      color: 'hover:text-gray-900'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: Linkedin,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Email',
      href: 'mailto:example@email.com',
      icon: Mail,
      color: 'hover:text-red-600'
    }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 关于部分 */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              关于我
            </h3>
            <p className="text-gray-600 mb-4">
              热爱编程的全栈开发工程师，专注于现代 Web 开发技术，
              致力于创造优秀的用户体验和高质量的代码。
            </p>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>北京，中国</span>
            </div>
          </div>

          {/* 快速链接 */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              快速链接
            </h3>
            <ul className="space-y-2">
              <li>
                <SafeLink href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  首页
                </SafeLink>
              </li>
              <li>
                <SafeLink href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                  博客
                </SafeLink>
              </li>
              <li>
                <SafeLink href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">
                  管理后台
                </SafeLink>
              </li>
              <li>
                <SafeLink href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  联系我
                </SafeLink>
              </li>
            </ul>
          </div>

          {/* 社交媒体 */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              联系方式
            </h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-gray-600 ${link.color} transition-colors`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    suppressHydrationWarning={true}
                  >
                    <IconComponent className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
            <p className="text-gray-600">
              欢迎通过邮件或社交媒体联系我！
            </p>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {currentYear} 张三. 保留所有权利.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-600 text-sm">
                使用 Next.js 15 & Tailwind CSS 构建
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;