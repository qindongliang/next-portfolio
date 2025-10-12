'use client'; // 客户端组件，用于演示交互功能

import { useState } from "react";

// 提前定义 MyButton 组件
function MyButton() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <button
            onClick={handleClick}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
            点了 {count} 次
        </button>
    );
}

export default function DataPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">数据页面</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">独立更新的计数器</h2>
                <div className="p-6 bg-white rounded-lg shadow-lg max-w-md">
                    <MyButton />
                </div>
            </div>
        </main>
    );
}