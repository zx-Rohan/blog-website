// src/components/pages/BlogPostPage.tsx
import Link from 'next/link';
import { PortableText } from 'next-sanity';
import { client } from '@/client/sanity';
import { POST_QUERY } from '@/app/lib/queries';
import { REVALIDATE_TIME } from '@/app/lib/constants';
import { getImageUrl } from '@/app/lib/image-url';
import { ImageWithFallback } from '@/app/components/UI/ImageWithFallback';
import { AuthorInfo } from '@/app/components/UI/AuthorInfo';
import { CategoryBadge } from '@/app/components/UI/CategoryBadge';

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
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <Link href="/" className="hover:underline">
          ← Back to posts
        </Link>
        <h1 className="text-4xl font-bold mb-8">Post not found</h1>
        <p>The post you're looking for doesn't exist.</p>
      </main>
    );
  }

  const postImageUrl = getImageUrl(post.image, 800, 400);
  const authorImageUrl = getImageUrl(post.author?.image, 100, 100);

  return (
    <main className="container mx-auto min-h-screen max-w-4xl p-8">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:underline mb-8">
        ← Back to posts
      </Link>
      
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
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
            <p className="text-xl italic text-gray-700 mb-8 border-l-4 border-blue-500 pl-4 py-2">
              {post.excerpt}
            </p>
          )}
          
          <div className="prose max-w-none">
            {Array.isArray(post.body) && <PortableText value={post.body} />}
          </div>
        </div>
      </article>
    </main>
  );
}