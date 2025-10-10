// 项目类型定义

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    avatar?: string;
  };
  tags: string[];
  category: string;
  published: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
  createdAt: string;
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'frontend' | 'backend' | 'devops' | 'design';
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}