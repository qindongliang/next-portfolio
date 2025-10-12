'use client';

import { useState, useEffect } from 'react';
import { Users, FileText, TrendingUp, Activity, AlertCircle, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalContacts: 0,
    systemHealth: 'good'
  });
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'user', action: '新用户注册', time: '2分钟前', status: 'success' },
    { id: 2, type: 'post', action: '新文章发布', time: '5分钟前', status: 'success' },
    { id: 3, type: 'contact', action: '收到联系表单', time: '10分钟前', status: 'info' },
    { id: 4, type: 'system', action: '系统备份完成', time: '1小时前', status: 'success' },
    { id: 5, type: 'alert', action: 'CPU使用率过高', time: '2小时前', status: 'warning' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        totalPosts: prev.totalPosts + Math.floor(Math.random() * 2),
        totalContacts: prev.totalContacts + Math.floor(Math.random() * 5),
        systemHealth: Math.random() > 0.1 ? 'good' : 'warning'
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Activity className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">管理后台概览</h1>
        <p className="text-gray-600">系统运行状态和最近活动</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-blue-600" />
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
              +12%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
          <p className="text-gray-600 text-sm">总用户数</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <FileText className="h-8 w-8 text-green-600" />
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
              +8%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalPosts}</h3>
          <p className="text-gray-600 text-sm">文章总数</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <span className="text-sm font-medium text-red-600 bg-red-100 px-2 py-1 rounded">
              -3%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalContacts}</h3>
          <p className="text-gray-600 text-sm">联系表单</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Activity className="h-8 w-8 text-orange-600" />
            <span className={`text-sm font-medium px-2 py-1 rounded ${
              stats.systemHealth === 'good' 
                ? 'text-green-600 bg-green-100' 
                : 'text-yellow-600 bg-yellow-100'
            }`}>
              {stats.systemHealth === 'good' ? '正常' : '警告'}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {stats.systemHealth === 'good' ? '98%' : '85%'}
          </h3>
          <p className="text-gray-600 text-sm">系统健康度</p>
        </div>
      </div>

      {/* 最近活动 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">最近活动</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                {getStatusIcon(activity.status)}
                <div>
                  <p className="text-gray-900 font-medium">{activity.action}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  activity.type === 'user' ? 'bg-blue-100 text-blue-800' :
                  activity.type === 'post' ? 'bg-green-100 text-green-800' :
                  activity.type === 'contact' ? 'bg-purple-100 text-purple-800' :
                  activity.type === 'system' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {activity.type === 'user' ? '用户' :
                   activity.type === 'post' ? '文章' :
                   activity.type === 'contact' ? '联系' :
                   activity.type === 'system' ? '系统' : '警告'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 快速操作 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">用户管理</h3>
          <p className="text-gray-600 text-sm mb-4">管理系统用户和权限</p>
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            管理用户
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">内容管理</h3>
          <p className="text-gray-600 text-sm mb-4">编辑和管理文章内容</p>
          <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            管理内容
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">系统设置</h3>
          <p className="text-gray-600 text-sm mb-4">配置系统参数和选项</p>
          <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            系统设置
          </button>
        </div>
      </div>
    </div>
  );
}
