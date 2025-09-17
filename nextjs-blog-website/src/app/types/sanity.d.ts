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
}

export interface Post extends SanityDocument {
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  image?: any;
  excerpt?: string;
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
