// src/components/posts/FeaturedPost.tsx
import Link from 'next/link';
import { Post } from '@/app/types/sanity';
import { getImageUrl } from '@/app/lib/image-url';
import { AuthorInfo } from '@/app/components/UI/AuthorInfo';
import { CategoryBadge } from '@/app/components/UI/CategoryBadge';

interface FeaturedPostProps {
  post: Post;
}

export const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  const imageUrl = getImageUrl(post.image, 1200, 600);
  const authorImageUrl = getImageUrl(post.author?.image, 40, 40);

  return (
        <article 
        className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow mb-12 bg-gray-200"
        style={{
            backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
        >
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Content */}
      <Link href={`/blog/${post.slug.current}`} className="block h-full">
        <div className="relative z-10 flex flex-col justify-end h-full p-8 text-white">
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <CategoryBadge 
                  key={category._id} 
                  category={category}
                  className="bg-white bg-opacity-90 text-blue-800"
                />
              ))}
            </div>
          )}
          
          <h2 className="text-2xl md:text-4xl font-bold mb-4 drop-shadow-md">
            {post.title}
          </h2>
          
          {post.excerpt && (
            <p className="text-lg md:text-xl mb-6 drop-shadow-md line-clamp-2">
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
            className="text-white drop-shadow-md"
          />
        </div>
      </Link>
    </article>
  );
};