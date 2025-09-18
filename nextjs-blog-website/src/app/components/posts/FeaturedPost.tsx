// src/components/posts/FeaturedPost.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Post } from '@/app/types/sanity';
import { getImageUrl } from '@/app/lib/image-url';
import { ImageWithFallback } from '@/app/components/UI/ImageWithFallback';
import { AuthorInfo } from '@/app/components/UI/AuthorInfo';
import { CategoryBadge } from '@/app/components/UI/CategoryBadge';

interface FeaturedPostProps {
  post: Post;
}

export const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  const router = useRouter();
  const imageUrl = getImageUrl(post.image, 800, 400);
  const authorImageUrl = getImageUrl(post.author?.image, 40, 40);

  const handleCardClick = () => {
    router.push(`/blog/${post.slug}`);
  };

  return (
    <article 
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer mb-12"
    >
      {imageUrl && (
        <div className="w-full h-64 md:h-96">
          <ImageWithFallback
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
            width={800}
            height={400}
          />
        </div>
      )}
      <div className="p-6">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((category) => (
              <CategoryBadge key={category._id} category={category} />
            ))}
          </div>
        )}
        
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
          {post.title}
        </h2>
        
        {post.excerpt && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
            {post.excerpt}
          </p>
        )}
        
        <AuthorInfo 
          author={post.author} 
          date={new Date(post.publishedAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
          authorImageUrl={authorImageUrl}
          showImage={true}
        />
      </div>
    </article>
  );
};