// src/app/search/page.tsx
import SearchPage from '@/app/components/pages/SearchPage';

export default function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return <SearchPage searchParams={searchParams} />;
}