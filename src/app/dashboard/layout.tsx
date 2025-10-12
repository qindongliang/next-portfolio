'use client'; // 客户端组件，包含交互功能

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Activity, Calendar, Settings } from 'lucide-react';
import SafeLink from '@/components/ui/SafeLink';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    revenue: 0,
    orders: 0,
    pageViews: 0
  });

  // 模拟数据加载
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 5),
        revenue: prev.revenue + Math.floor(Math.random() * 1000),
        orders: prev.orders + Math.floor(Math.random() * 3),
        pageViews: prev.pageViews + Math.floor(Math.random() * 20)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const navigation = [
    { name: '概览', href: '/dashboard', icon: BarChart3, id: 'overview' },
    { name: '分析', href: '/dashboard/analytics', icon: TrendingUp, id: 'analytics' },
    { name: '用户', href: '/dashboard/users', icon: Users, id: 'users' },
    { name: '活动', href: '/dashboard/activity', icon: Activity, id: 'activity' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 仪表板头部 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">仪表板</h1>
              <p className="text-sm text-gray-500">实时数据监控</p>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Calendar className="h-4 w-4" />
                <span>选择时间范围</span>
              </button>

              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="px-6 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">总用户数</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600">↑ 12% 较上月</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">总收入</p>
                  <p className="text-2xl font-bold text-gray-900">¥{stats.revenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">↑ 8% 较上月</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">订单数</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.orders.toLocaleString()}</p>
                  <p className="text-xs text-red-600">↓ 3% 较上月</p>
                </div>
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">页面浏览量</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pageViews.toLocaleString()}</p>
                  <p className="text-xs text-green-600">↑ 15% 较上月</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-full">
        {/* 侧边导航 */}
        <aside className="w-64 bg-white shadow-md">
          <nav className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">仪表板导航</h2>

            <ul className="space-y-2">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <li key={item.id}>
                    <SafeLink
                      href={item.href}
                      onClick={() => setActiveTab(item.id)}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                        ${isActive
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span>{item.name}</span>
                    </SafeLink>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">快速操作</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm bg-white rounded hover:bg-gray-100">
                  导出报告
                </button>
                <button className="w-full text-left px-3 py-2 text-sm bg-white rounded hover:bg-gray-100">
                  刷新数据
                </button>
              </div>
            </div>
          </nav>
        </aside>

        {/* 主内容区域 */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}