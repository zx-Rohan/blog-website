
// src/app/blog/[slug]/page.tsx
import BlogPostPage from '@/components/pages/BlogPostPage';

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogPostPage params={params} />;
}