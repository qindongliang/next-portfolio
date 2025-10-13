'use client'; // 这是客户端组件，因为有交互功能

import SafeLink from './SafeLink';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun } from 'lucide-react';
import Link from "next/link";
import { Button } from '@/components/ui/Button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/NavigationMenu"

const Header = () => {
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
    { name: 'shadcn/ui', href: '/shadcn-demo' },
    { name: '仪表板', href: '/dashboard' },
    { name: '管理', href: '/admin' }
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // 这里可以添加主题切换逻辑
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              Portfolio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="space-x-8">
                {navigation.map((item) => {
                  if (item.isAnchor) {
                    return (
                      <NavigationMenuItem key={item.name}>
                        <NavigationMenuLink
                          href={item.href}
                          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                          onClick={(e) => handleAnchorClick(e, item.href)}
                          suppressHydrationWarning={true}
                        >
                          {item.name}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  }
                  return (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        >
                          {item.name}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="切换主题"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">打开主菜单</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {navigation.map((item) => {
                    if (item.isAnchor) {
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          className="text-lg font-medium transition-colors hover:text-accent-foreground"
                          onClick={(e) => handleAnchorClick(e, item.href)}
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
                        className="text-lg font-medium transition-colors hover:text-accent-foreground"
                      >
                        {item.name}
                      </SafeLink>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;