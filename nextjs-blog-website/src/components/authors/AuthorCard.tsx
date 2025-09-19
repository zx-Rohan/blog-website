// src/components/authors/AuthorCard.tsx
import Link from 'next/link';
import { Author } from '@/types/sanity';
import { getImageUrl } from '@/lib/image-url';
import { ImageWithFallback } from '@/components/UI/ImageWithFallback';

interface AuthorCardProps {
  author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const authorImageUrl = getImageUrl(author.image, 200, 200);

  return (
    <Link
      href={`/authors/${author.slug.current}`}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
    >
      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
        <ImageWithFallback
          src={authorImageUrl}
          alt={author.name}
          fill
          className="object-cover"
          fallbackSrc="/images/avatar-placeholder.png"
        />
      </div>
      
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {author.name}
      </h2>
      
      {author.bio && (
        <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
          {author.bio}
        </p>
      )}
      
      <div className="mt-auto text-sm text-blue-600 dark:text-blue-400 font-medium">
        {author.postCount || 0} posts
      </div>
    </Link>
  );
}