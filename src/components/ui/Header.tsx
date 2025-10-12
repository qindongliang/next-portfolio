'use client'; // 这是客户端组件，因为有交互功能

import SafeLink from './SafeLink';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun } from 'lucide-react';
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  // 处理锚点点击的函数
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    if (pathname !== '/') {
      // 如果不在首页，先导航到首页，然后再滚动到锚点
      e.preventDefault();
      window.location.href = '/' + anchor;
    }
    // 如果已经在首页，让默认的锚点行为处理
  };

  const navigation = [
    { name: '首页', href: '/' },
    { name: '博客', href: '/blog' },
    { name: '项目', href: '#projects', isAnchor: true },
    { name: '关于', href: '#about', isAnchor: true },
    { name: 'CSR', href: '/data' },
    { name: '联系', href: '#contact', isAnchor: true },
    { name: '演示', href: '/demo' },
    { name: '仪表板', href: '/dashboard' },
    { name: '管理', href: '/admin' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // 这里可以添加主题切换逻辑
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Portfolio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => {
                if (item.isAnchor) {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                      onClick={(e) => handleAnchorClick(e, item.href)}
                      suppressHydrationWarning={true}
                    >
                      {item.name}
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="切换主题"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-700" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                aria-expanded="false"
              >
                <span className="sr-only">打开主菜单</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => {
                if (item.isAnchor) {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors"
                      onClick={(e) => {
                        handleAnchorClick(e, item.href);
                        setIsMenuOpen(false);
                      }}
                      suppressHydrationWarning={true}
                    >
                      {item.name}
                    </a>
                  );
                }
                return (
                  <SafeLink
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </SafeLink>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;