'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Clock, Target, Zap, AlertCircle } from 'lucide-react';

export default function AnalyticsPage() {
  const [selectedMetric, setSelectedMetric] = useState('performance');
  const [analyticsData, setAnalyticsData] = useState({
    avgLoadTime: 0,
    bounceRate: 0,
    sessionDuration: 0,
    goalCompletion: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        avgLoadTime: Math.max(0.5, Math.min(5, prev.avgLoadTime + (Math.random() - 0.5) * 0.5)),
        bounceRate: Math.max(20, Math.min(80, prev.bounceRate + (Math.random() - 0.5) * 5)),
        sessionDuration: Math.max(30, Math.min(300, prev.sessionDuration + Math.floor((Math.random() - 0.5) * 20))),
        goalCompletion: Math.max(10, Math.min(100, prev.goalCompletion + (Math.random() - 0.5) * 8))
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const performanceMetrics = [
    {
      name: 'Page Load Time',
      value: analyticsData.avgLoadTime.toFixed(2) + 's',
      status: analyticsData.avgLoadTime < 2 ? 'good' : analyticsData.avgLoadTime < 3 ? 'warning' : 'critical',
      icon: Clock,
      description: 'Average time to fully load the page'
    },
    {
      name: 'Bounce Rate',
      value: analyticsData.bounceRate.toFixed(1) + '%',
      status: analyticsData.bounceRate < 40 ? 'good' : analyticsData.bounceRate < 60 ? 'warning' : 'critical',
      icon: BarChart3,
      description: 'Percentage of single-page sessions'
    },
    {
      name: 'Session Duration',
      value: Math.floor(analyticsData.sessionDuration) + 's',
      status: analyticsData.sessionDuration > 120 ? 'good' : analyticsData.sessionDuration > 60 ? 'warning' : 'critical',
      icon: Clock,
      description: 'Average time users spend on site'
    },
    {
      name: 'Goal Completion',
      value: analyticsData.goalCompletion.toFixed(1) + '%',
      status: analyticsData.goalCompletion > 70 ? 'good' : analyticsData.goalCompletion > 40 ? 'warning' : 'critical',
      icon: Target,
      description: 'Conversion rate for main goals'
    }
  ];

  const userBehaviorData = [
    { path: '/home', views: 15420, avgTime: 45, bounceRate: 25 },
    { path: '/products', views: 12300, avgTime: 120, bounceRate: 35 },
    { path: '/about', views: 8900, avgTime: 65, bounceRate: 20 },
    { path: '/blog', views: 6700, avgTime: 180, bounceRate: 42 },
    { path: '/contact', views: 3400, avgTime: 95, bounceRate: 15 },
  ];

  const conversionEvents = [
    { event: 'Sign Up', conversions: 234, rate: 3.2, revenue: 4680 },
    { event: 'Purchase', conversions: 89, rate: 1.2, revenue: 17800 },
    { event: 'Download', conversions: 456, rate: 6.2, revenue: 0 },
    { event: 'Contact Form', conversions: 123, rate: 1.7, revenue: 3690 },
    { event: 'Newsletter', conversions: 789, rate: 10.8, revenue: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <TrendingUp className="h-4 w-4" />;
      case 'warning': return <AlertCircle className="h-4 w-4" />;
      case 'critical': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Deep insights into your website performance and user behavior</p>
        </div>
        <div className="flex space-x-2">
          {['performance', 'behavior', 'conversion'].map((metric) => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                selectedMetric === metric
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {metric}
            </button>
          ))}
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                  {getStatusIcon(metric.status)}
                  <span className="ml-1">{metric.status}</span>
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-sm font-medium text-gray-900 mb-1">{metric.name}</p>
              <p className="text-xs text-gray-500">{metric.description}</p>
            </div>
          );
        })}
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Behavior by Page */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">User Behavior by Page</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {userBehaviorData.map((page, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{page.path}</span>
                  <span className="text-sm text-gray-500">{page.views.toLocaleString()} views</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Avg: {page.avgTime}s</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Bounce: {page.bounceRate}%</span>
                  </div>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(page.views / 15420) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Events */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Conversion Events</h3>
            <Target className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {conversionEvents.map((event, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{event.event}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    event.rate > 5 ? 'bg-green-100 text-green-800' :
                    event.rate > 2 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {event.rate}% rate
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>{event.conversions.toLocaleString()} conversions</span>
                  {event.revenue > 0 && (
                    <span className="font-medium text-green-600">${event.revenue.toLocaleString()}</span>
                  )}
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                    style={{ width: `${Math.min(event.rate * 10, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Performance Insights</h3>
          <Zap className="h-5 w-5 text-yellow-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900">Top Performing Page</h4>
            </div>
            <p className="text-sm text-gray-600 mb-1">Your homepage is performing well</p>
            <p className="text-xs text-gray-500">25% bounce rate, 45s avg session</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <h4 className="font-medium text-gray-900">Needs Attention</h4>
            </div>
            <p className="text-sm text-gray-600 mb-1">Blog page has high bounce rate</p>
            <p className="text-xs text-gray-500">42% bounce rate, consider improving content</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900">Best Conversion</h4>
            </div>
            <p className="text-sm text-gray-600 mb-1">Newsletter signups performing best</p>
            <p className="text-xs text-gray-500">10.8% conversion rate, 789 total</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
            <div>
              <p className="text-sm font-medium text-gray-900">Optimize page load speed</p>
              <p className="text-xs text-gray-600">Compress images and enable caching to improve load times</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
            <div>
              <p className="text-sm font-medium text-gray-900">Improve blog engagement</p>
              <p className="text-xs text-gray-600">Add related content and better navigation to reduce bounce rate</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
            <div>
              <p className="text-sm font-medium text-gray-900">Focus on newsletter growth</p>
              <p className="text-xs text-gray-600">Your newsletter has the best conversion rate, consider promoting it more</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}