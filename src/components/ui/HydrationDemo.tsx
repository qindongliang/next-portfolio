'use client';

import { useState, useEffect } from 'react';

export default function HydrationDemo() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 组件在客户端激活后执行
    setIsHydrated(true);
    console.log('组件已激活！');
  }, []);

  return (
    <div className="p-4 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50">
      <h4 className="font-semibold text-blue-900 mb-2">Hydration 演示</h4>

      {/* 服务器渲染时显示 */}
      {!isHydrated && (
        <div className="text-sm text-gray-600 mb-2">
          🔄 正在激活组件...
        </div>
      )}

      {/* 客户端激活后显示 */}
      {isHydrated && (
        <div className="text-sm text-green-600 mb-2">
          ✅ 组件已激活，可以交互！
        </div>
      )}

      <button
        onClick={() => setCount(count + 1)}
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
      >
        点击次数: {count}
      </button>

      <div className="mt-2 text-xs text-gray-500">
        {isHydrated ?
          "🌐 客户端渲染：按钮可以点击" :
          "🖥️ 服务端渲染：只有静态HTML"
        }
      </div>
    </div>
  );
}