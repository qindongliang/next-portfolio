'use client'; // 客户端组件，处理 JavaScript 跳转

import { useRouter } from 'next/navigation';

export default function JavaScriptButton() {
  const router = useRouter();

  const handleJump = () => {
    // 使用 Next.js 路由进行客户端导航
    router.push('/data');
  };

  return (
    <button
      onClick={handleJump}
      className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
    >
      JavaScript 按钮跳转
    </button>
  );
}