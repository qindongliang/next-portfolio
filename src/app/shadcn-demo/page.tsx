'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { toast } from 'sonner';
import { User, Settings, LogOut, Mail, Github, Heart } from 'lucide-react';

export default function ShadcnDemo() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const showToast = () => {
    toast.success('这是一个成功的 toast 通知！');
  };

  const showErrorToast = () => {
    toast.error('这是一个错误的 toast 通知！');
  };

  const showInfoToast = () => {
    toast.info('这是一个信息的 toast 通知！');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">shadcn/ui 组件演示</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          这个页面展示了 shadcn/ui 组件库的各个组件。shadcn/ui 提供了现代化、可访问且美观的 React 组件。
        </p>
      </div>

      {/* 按钮组件演示 */}
      <Card>
        <CardHeader>
          <CardTitle>按钮组件</CardTitle>
          <CardDescription>不同样式和大小的按钮组件</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button variant="default">默认按钮</Button>
            <Button variant="secondary">次要按钮</Button>
            <Button variant="outline">边框按钮</Button>
            <Button variant="ghost">幽灵按钮</Button>
            <Button variant="destructive">危险按钮</Button>
            <Button variant="link">链接按钮</Button>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="sm">小按钮</Button>
            <Button size="default">默认大小</Button>
            <Button size="lg">大按钮</Button>
            <Button size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Toast 通知演示 */}
      <Card>
        <CardHeader>
          <CardTitle>Toast 通知</CardTitle>
          <CardDescription>使用 Sonner 的 toast 通知组件</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={showToast}>成功通知</Button>
            <Button variant="destructive" onClick={showErrorToast}>错误通知</Button>
            <Button variant="outline" onClick={showInfoToast}>信息通知</Button>
          </div>
        </CardContent>
      </Card>

      {/* 表单组件演示 */}
      <Card>
        <CardHeader>
          <CardTitle>表单组件</CardTitle>
          <CardDescription>输入框、文本域和标签组件</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="demo-input">输入框</Label>
            <Input
              id="demo-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="请输入内容..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="demo-textarea">文本域</Label>
            <Textarea
              id="demo-textarea"
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              placeholder="请输入多行文本..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* 徽章和分隔符演示 */}
      <Card>
        <CardHeader>
          <CardTitle>徽章和分隔符</CardTitle>
          <CardDescription>徽章组件和分隔符组件</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge>默认徽章</Badge>
            <Badge variant="secondary">次要徽章</Badge>
            <Badge variant="outline">边框徽章</Badge>
            <Badge variant="destructive">危险徽章</Badge>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground">分隔符上方的文本</p>
            <Separator className="my-2" />
            <p className="text-sm text-muted-foreground">分隔符下方的文本</p>
          </div>
        </CardContent>
      </Card>

      {/* 头像组件演示 */}
      <Card>
        <CardHeader>
          <CardTitle>头像组件</CardTitle>
          <CardDescription>不同状态的头像组件</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>用户</AvatarFallback>
            </Avatar>
            <Avatar className="w-16 h-16">
              <AvatarFallback>大</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>

      {/* 下拉菜单演示 */}
      <Card>
        <CardHeader>
          <CardTitle>下拉菜单</CardTitle>
          <CardDescription>基于 Radix UI 的下拉菜单组件</CardDescription>
        </CardHeader>
        <CardContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">用户菜单</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>我的账户</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                个人资料
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                设置
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      {/* 组合示例 */}
      <Card>
        <CardHeader>
          <CardTitle>组合示例</CardTitle>
          <CardDescription>结合多个组件的复杂示例</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>张三</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">张三</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">开发者</Badge>
                  <Badge variant="outline">在线</Badge>
                </div>
              </div>
              <div className="ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>编辑资料</DropdownMenuItem>
                    <DropdownMenuItem>发送消息</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>屏蔽用户</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">zhangsan@example.com</span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Github className="h-4 w-4 mr-1" />
                  GitHub
                </Button>
                <Button size="sm" onClick={showToast}>
                  发送消息
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}