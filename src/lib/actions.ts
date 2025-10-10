'use server'; // 这是服务器端代码

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ContactFormData } from '@/types';

// 模拟的数据库操作（在实际应用中，这里会连接真实的数据库）
let contacts: Array<ContactFormData & { id: string; createdAt: string }> = [];

// 联系表单提交的 Server Action
export async function submitContactForm(formData: ContactFormData) {
  try {
    // 模拟数据验证
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return {
        success: false,
        message: '请填写所有必填字段'
      };
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: '请输入有效的邮箱地址'
      };
    }

    // 模拟保存数据到数据库
    const newContact = {
      ...formData,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString()
    };

    contacts.push(newContact);

    // 在实际应用中，这里会发送邮件通知
    console.log('新的联系表单提交:', newContact);

    // 重新验证缓存（如果有相关页面）
    revalidatePath('/');

    return {
      success: true,
      message: '感谢您的留言！我会尽快回复您。'
    };

  } catch (error) {
    console.error('提交联系表单时出错:', error);
    return {
      success: false,
      message: '提交失败，请稍后重试。'
    };
  }
}

// 获取所有联系记录的管理函数
export async function getContacts() {
  // 在实际应用中，这里会从数据库获取数据
  return contacts;
}

// 删除联系记录的 Server Action
export async function deleteContact(id: string) {
  try {
    contacts = contacts.filter(contact => contact.id !== id);

    // 重新验证缓存
    revalidatePath('/admin');

    return {
      success: true,
      message: '联系记录已删除'
    };
  } catch (error) {
    console.error('删除联系记录时出错:', error);
    return {
      success: false,
      message: '删除失败，请稍后重试。'
    };
  }
}

// 文章相关的 Server Actions
export async function createPost(postData: {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
}) {
  try {
    // 模拟数据验证
    if (!postData.title.trim() || !postData.content.trim()) {
      return {
        success: false,
        message: '标题和内容不能为空'
      };
    }

    // 在实际应用中，这里会保存到数据库
    console.log('创建新文章:', postData);

    // 重新验证缓存
    revalidatePath('/blog');
    revalidatePath('/admin');

    return {
      success: true,
      message: '文章创建成功！',
      postId: Math.random().toString(36).substring(7)
    };
  } catch (error) {
    console.error('创建文章时出错:', error);
    return {
      success: false,
      message: '创建失败，请稍后重试。'
    };
  }
}

// 文件上传的 Server Action（Next.js 15 特性）
export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get('file') as File;

    if (!file) {
      return {
        success: false,
        message: '请选择要上传的文件'
      };
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        message: '只支持 JPG、PNG、GIF、WebP 格式的图片'
      };
    }

    // 验证文件大小（5MB）
    if (file.size > 5 * 1024 * 1024) {
      return {
        success: false,
        message: '图片大小不能超过 5MB'
      };
    }

    // 在实际应用中，这里会上传到云存储
    // const bytes = await file.arrayBuffer();
    // const buffer = Buffer.from(bytes);
    // 保存到文件系统或云服务

    // 模拟上传延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 返回模拟的图片 URL
    const imageUrl = `/uploads/${Date.now()}-${file.name}`;

    return {
      success: true,
      message: '图片上传成功！',
      imageUrl
    };
  } catch (error) {
    console.error('上传图片时出错:', error);
    return {
      success: false,
      message: '上传失败，请稍后重试。'
    };
  }
}