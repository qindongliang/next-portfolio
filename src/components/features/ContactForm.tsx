'use client'; // 客户端组件，处理表单交互

import { useState } from 'react';
import { Mail, User, MessageSquare, Send, Github } from 'lucide-react';
import { submitContactForm } from '@/lib/actions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { toast } from 'sonner';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        toast.success(result.message || '消息发送成功！我会尽快回复您。');
        // 重置表单
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        toast.error(result.message || '发送失败，请稍后重试。');
      }
    } catch {
      toast.error('提交失败，请稍后重试。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>联系我</CardTitle>
        <CardDescription>
          有项目想法或合作机会？欢迎通过下面的表单联系我，我会尽快回复！
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 姓名输入 */}
          <div className="space-y-2">
            <Label htmlFor="name">姓名 *</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="请输入您的姓名"
                className="pl-10"
              />
            </div>
          </div>

          {/* 邮箱输入 */}
          <div className="space-y-2">
            <Label htmlFor="email">邮箱 *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="请输入您的邮箱"
                className="pl-10"
              />
            </div>
          </div>

          {/* 消息输入 */}
          <div className="space-y-2">
            <Label htmlFor="message">消息 *</Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                placeholder="请描述您的项目想法或问题..."
                className="pl-10 resize-none"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              请至少输入 10 个字符
            </p>
          </div>

          {/* 提交按钮 */}
          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            <Send className="h-4 w-4 mr-2" />
            {isLoading ? '发送中...' : '发送消息'}
          </Button>
        </form>

        {/* 其他联系方式 */}
        <div className="border-t pt-6">
          <p className="text-muted-foreground mb-4">
            您也可以通过以下方式联系我：
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="mailto:zhangsan@example.com"
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              suppressHydrationWarning={true}
            >
              <Mail className="h-4 w-4 mr-2" />
              zhangsan@example.com
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              suppressHydrationWarning={true}
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}