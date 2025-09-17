// src/components/ui/PostCard.tsx
import Link from 'next/link';
import { PostCardProps } from '@/app/types/sanity';
import { getImageUrl } from '@/app/lib/image-url';
import { ImageWithFallback } from './ImageWithFallback';
import { AuthorInfo } from './AuthorInfo';
import { CategoryBadge } from './CategoryBadge';

export const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  size = 'small', 
  priority = false 
}) => {
  const isLarge = size === 'large';
  const imageDimensions = isLarge 
    ? { width: 800, height: 400 } 
    : { width: 300, height: 240 };
  
  const imageUrl = getImageUrl(post.image, imageDimensions.width, imageDimensions.height);
  const authorImageUrl = getImageUrl(post.author?.image, 40, 40) || '/images/avatar-placeholder.png';
  
  return (
    <article className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${isLarge ? 'mb-12' : ''}`}>
      <Link href={`/blog/${post.slug.current}`} className="block">
        {imageUrl && (
          <div className={`w-full ${isLarge ? 'h-64 md:h-96' : 'h-48'}`}>
            <ImageWithFallback
              src={imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
              width={imageDimensions.width}
              height={imageDimensions.height}
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
          
          <h2 className={`font-bold mb-3 ${isLarge ? 'text-2xl md:text-3xl' : 'text-xl line-clamp-2'}`}>
            {post.title}
          </h2>
          
          {post.excerpt && (
            <p className={`text-gray-600 mb-4 ${isLarge ? 'text-lg' : 'line-clamp-3'}`}>
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
      </Link>
    </article>
  );
};