// src/app/authors/[slug]/page.tsx
import AuthorPostsPage from '@/app/components/pages/AuthorPostPage';

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <AuthorPostsPage params={params} />;
}