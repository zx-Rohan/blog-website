// src/components/pages/HomePage.tsx
import { client } from '@/client/sanity';
import { POSTS_QUERY } from '@/lib/queries';
import { REVALIDATE_TIME, POSTS_PER_PAGE } from '@/lib/constants';
import { FeaturedPost } from '@/components/posts/FeaturedPost';
import { PostsGrid } from '@/components/posts/PostsGrid';

export default async function HomePage() {
  const posts = await client.fetch(POSTS_QUERY, { limit: POSTS_PER_PAGE }, {
    next: { revalidate: REVALIDATE_TIME }
  });
  
  if (!posts || posts.length === 0) {
    return (
      <main className=" mx-auto min-h-screen max-w-6xl p-8 bg-white dark:bg-gray-900">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Latest Posts</h1>
        <p className="text-gray-700 dark:text-gray-300">No posts found.</p>
      </main>
    );
  }

  const [featuredPost, ...remainingPosts] = posts;

  return (
    <main className=" mx-auto min-h-screen max-w-6xl p-8 bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Latest Posts</h1>
      
      {featuredPost && <FeaturedPost post={featuredPost} />}
      
      {remainingPosts.length > 0 && (
        <>
          <h2 className="text-2xl font-bold my-8 text-gray-900 dark:text-white">More Articles</h2>
          <PostsGrid posts={remainingPosts} />
        </>
      )}
    </main>
  );
}