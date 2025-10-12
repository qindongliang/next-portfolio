'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';

export default function DashboardOverview() {
  const [timeRange, setTimeRange] = useState('7d');
  const [realTimeStats, setRealTimeStats] = useState({
    activeUsers: 0,
    pageViews: 0,
    conversionRate: 0,
    revenue: 0
  });
  const [pageTrends, setPageTrends] = useState([5.2, 12.8, 8.5, 15.3, 9.7]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        activeUsers: Math.max(0, prev.activeUsers + Math.floor(Math.random() * 21) - 10),
        pageViews: prev.pageViews + Math.floor(Math.random() * 15),
        conversionRate: Math.min(100, Math.max(0, prev.conversionRate + (Math.random() - 0.5) * 2)),
        revenue: prev.revenue + Math.floor(Math.random() * 500)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Traffic trend data
  const trafficData = [
    { name: 'Mon', visits: 4000, uniqueVisitors: 2400, conversionRate: 2.4 },
    { name: 'Tue', visits: 3000, uniqueVisitors: 1398, conversionRate: 2.2 },
    { name: 'Wed', visits: 2000, uniqueVisitors: 9800, conversionRate: 2.9 },
    { name: 'Thu', visits: 2780, uniqueVisitors: 3908, conversionRate: 3.1 },
    { name: 'Fri', visits: 1890, uniqueVisitors: 4800, conversionRate: 2.8 },
    { name: 'Sat', visits: 2390, uniqueVisitors: 3800, conversionRate: 3.2 },
    { name: 'Sun', visits: 3490, uniqueVisitors: 4300, conversionRate: 3.5 },
  ];

  // Device distribution data
  const deviceData = [
    { name: 'Desktop', value: 45, color: '#3B82F6' },
    { name: 'Mobile', value: 40, color: '#10B981' },
    { name: 'Tablet', value: 15, color: '#F59E0B' },
  ];

  // Page access data
  const pageData = [
    { page: '/Home', views: 12500, bounceRate: 25 },
    { page: '/Products', views: 8700, bounceRate: 32 },
    { page: '/About', views: 6200, bounceRate: 18 },
    { page: '/Blog', views: 5400, bounceRate: 45 },
    { page: '/Contact', views: 3100, bounceRate: 12 },
  ];

  // Conversion funnel data
  const funnelData = [
    { stage: 'Visit', users: 10000, conversion: 100 },
    { stage: 'Register', users: 2500, conversion: 25 },
    { stage: 'Activate', users: 1500, conversion: 15 },
    { stage: 'Retain', users: 900, conversion: 9 },
    { stage: 'Purchase', users: 450, conversion: 4.5 },
  ];

  return (
    <div className="space-y-6">
      {/* Page title and time range selector */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Monitor your business data in real-time</p>
        </div>
        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
              +12.5%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{realTimeStats.activeUsers.toLocaleString()}</h3>
          <p className="text-gray-600 text-sm">Active Users</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
              +8.2%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{realTimeStats.pageViews.toLocaleString()}</h3>
          <p className="text-gray-600 text-sm">Page Views</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded">
              -2.1%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{realTimeStats.conversionRate.toFixed(1)}%</h3>
          <p className="text-gray-600 text-sm">Conversion Rate</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
              +18.7%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${realTimeStats.revenue.toLocaleString()}</h3>
          <p className="text-gray-600 text-sm">Total Revenue</p>
        </div>
      </div>

      {/* Traffic trend chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Trends</h3>
        <div className="space-y-4">
          {trafficData.map((day, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">{day.name}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                <div
                  className="bg-blue-500 h-8 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${(day.visits / 10000) * 100}%` }}
                >
                  <span className="text-xs text-white font-medium">{day.visits.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-sm text-gray-500 w-16 text-right">{day.conversionRate}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Device distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Distribution</h3>
          <div className="space-y-3">
            {deviceData.map((device, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: device.color }}
                  />
                  <span className="text-sm font-medium text-gray-700">{device.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${device.value}%`,
                        backgroundColor: device.color
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-10">{device.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion funnel */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
          <div className="space-y-3">
            {funnelData.map((stage, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-16 text-sm font-medium text-gray-600">{stage.stage}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-6 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${stage.conversion}%` }}
                  >
                    <span className="text-xs text-white font-medium">{stage.users.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 w-12 text-right">{stage.conversion}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page access table */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Page Access Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bounce Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pageData.map((page, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {page.page}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {page.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {page.bounceRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-600">+{pageTrends[index]}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}