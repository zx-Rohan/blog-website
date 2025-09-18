// src/types/sanity.d.ts
export interface SanityDocument {
  _id: string;
  _type: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;
}

export interface Category extends SanityDocument {
  title: string;
  slug: {
    current: string;
  };
  description?: string;
}

export interface Author extends SanityDocument {
  name: string;
  slug: {
    current: string;
  };
  image?: any;
  bio?: string;
  postCount?: number;
}

export interface Post {
  _id: string;
  title: string;
  slug: string; 
  publishedAt: string;
  excerpt?: string;
  image?: any;
  body: any[];
  author: Author;
  categories: Category[];
}

export interface PostCardProps {
  post: Post;
  size?: 'small' | 'large';
  priority?: boolean;
}

export interface AuthorInfoProps {
  author: Author;
  date?: string;
  authorImageUrl?: string | null;
  showImage?: boolean;
}

export interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

export interface PostSuggestion {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
}
