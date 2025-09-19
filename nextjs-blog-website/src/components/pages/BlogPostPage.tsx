// src/components/pages/BlogPostPage.tsx
import Link from 'next/link';
import { PortableText } from 'next-sanity';
import { client } from '@/client/sanity';
import { POST_QUERY } from '@/lib/queries';
import { REVALIDATE_TIME } from '@/lib/constants';
import { getImageUrl } from '@/lib/image-url';
import { ImageWithFallback } from '@/components/UI/ImageWithFallback';
import { AuthorInfo } from '@/components/UI/AuthorInfo';
import { CategoryBadge } from '@/components/UI/CategoryBadge';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const slug = (await params).slug;
  const post = await client.fetch(POST_QUERY, { slug }, {
    next: { revalidate: REVALIDATE_TIME }
  });
  
  if (!post) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8 bg-white dark:bg-gray-900">
        <Link href="/" className="hover:underline text-blue-600 dark:text-blue-400">
          ← Back to posts
        </Link>
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Post not found</h1>
        <p className="text-gray-700 dark:text-gray-300">The post you're looking for doesn't exist.</p>
      </main>
    );
  }

  const postImageUrl = getImageUrl(post.image, 800, 400);
  const authorImageUrl = getImageUrl(post.author?.image, 100, 100);

  return (
    <main className="container mx-auto min-h-screen max-w-4xl p-8 bg-white dark:bg-gray-900">
      <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8">
        ← Back to posts
      </Link>
      
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {postImageUrl && (
          <div className="w-full h-64 md:h-96">
            <ImageWithFallback
              src={postImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
              width={800}
              height={400}
            />
          </div>
        )}
        
        <div className="p-8">
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category: any) => (
                <CategoryBadge key={category._id} category={category} />
              ))}
            </div>
          )}
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{post.title}</h1>          
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
          {post.excerpt && (
            <p className="text-xl italic text-gray-700 dark:text-gray-300 mb-8 border-l-4 border-blue-500 pl-4 py-2">
              {post.excerpt}
            </p>
          )}
          
          <div className="prose dark:prose-invert max-w-none">
            {Array.isArray(post.body) && <PortableText value={post.body} />}
          </div>
        </div>
      </article>
    </main>
  );
}