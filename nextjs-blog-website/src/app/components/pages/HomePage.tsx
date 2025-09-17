// src/components/pages/HomePage.tsx
import { client } from '@/client/sanity';
import { POSTS_QUERY } from '@/app/lib/queries';
import { REVALIDATE_TIME, POSTS_PER_PAGE } from '@/app/lib/constants';
import { FeaturedPost } from '@/app/components/posts/FeaturedPost';
import { PostsGrid } from '@/app/components/posts/PostsGrid';

export default async function HomePage() {
  const posts = await client.fetch(POSTS_QUERY, { limit: POSTS_PER_PAGE }, {
    next: { revalidate: REVALIDATE_TIME }
  });
  
  if (!posts || posts.length === 0) {
    return (
      <main className="container mx-auto min-h-screen max-w-6xl p-8">
        <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>
        <p>No posts found.</p>
      </main>
    );
  }

  const [featuredPost, ...remainingPosts] = posts;

  return (
    <main className="container mx-auto min-h-screen max-w-6xl p-8">
      <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>
      
      {featuredPost && <FeaturedPost post={featuredPost} />}
      
      {remainingPosts.length > 0 && (
        <>
          <h2 className="text-2xl font-bold my-8">More Articles</h2>
          <PostsGrid posts={remainingPosts} />
        </>
      )}
    </main>
  );
}