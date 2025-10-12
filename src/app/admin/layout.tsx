'use client'; // 客户端组件，包含交互功能

import { useState, useEffect } from 'react';
import { Shield, Settings, LogOut, Menu, X } from 'lucide-react';
import SafeLink from '@/components/ui/SafeLink';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 模拟身份验证
  useEffect(() => {
    const timer = setTimeout(() => {
      setUser({ name: '管理员', role: 'admin' });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p>验证身份中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">访问被拒绝</h2>
          <p className="text-gray-600 mb-4">您没有权限访问管理后台</p>
          <SafeLink href="/" className="text-blue-600 hover:text-blue-800">
            返回首页
          </SafeLink>
        </div>
      </div>
    );
  }

  const navigation = [
    { name: '仪表板', href: '/admin', icon: Shield },
    { name: '项目管理', href: '/admin/projects', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">管理后台</h1>
                  <p className="text-sm text-gray-500">欢迎回来，{user.name}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                角色: <span className="font-medium text-gray-900">{user.role}</span>
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">退出</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* 侧边栏 */}
        <aside className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 fixed md:static inset-y-0 left-0 z-50
          w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        `}>
          <nav className="h-full">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">管理菜单</h2>
            </div>

            <ul className="p-4 space-y-2">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.name}>
                    <SafeLink
                      href={item.href}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700
                        hover:bg-blue-50 hover:text-blue-700 transition-colors
                      `}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span>{item.name}</span>
                    </SafeLink>
                  </li>
                );
              })}
            </ul>

            <div className="p-4 mt-8 border-t border-gray-200">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">系统信息</h3>
                <p className="text-sm text-blue-700">Next.js 15.5.4</p>
                <p className="text-sm text-blue-700">React 18</p>
              </div>
            </div>
          </nav>
        </aside>

        {/* 主内容区域 */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}