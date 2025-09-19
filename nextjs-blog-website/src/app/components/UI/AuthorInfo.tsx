// src/components/ui/AuthorInfo.tsx
'use client';

import Link from 'next/link';
import { AuthorInfoProps } from '@/app/types/sanity';
import { Avatar } from './Avatar';

export const AuthorInfo: React.FC<AuthorInfoProps> = ({ 
  author, 
  date, 
  authorImageUrl,
  showImage = true 
}) => {
  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the parent
  };

  // Safely get the author slug
  const authorSlug = author.slug?.current || author.slug;
  
  if (!authorSlug) {
    console.error('Author slug is missing:', author);
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        {showImage && (
          <Avatar
            src={authorImageUrl}
            alt={author.name}
            size="sm"
          />
        )}
        <span>{author.name}</span>
        {date && (
          <>
            <span>•</span>
            <span>{date}</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      {showImage && (
        <Link 
          href={`/authors/${authorSlug}`}
          onClick={handleAuthorClick}
        >
          <Avatar
            src={authorImageUrl}
            alt={author.name}
            size="sm"
          />
        </Link>
      )}
      <Link 
        href={`/authors/${authorSlug}`}
        onClick={handleAuthorClick}
        className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
      >
        {author.name}
      </Link>
      {date && (
        <>
          <span>•</span>
          <span>{date}</span>
        </>
      )}
    </div>
  );
};