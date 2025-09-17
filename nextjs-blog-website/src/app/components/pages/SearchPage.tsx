// src/components/pages/SearchPage.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '@/client/sanity';
import { getImageUrl } from '@/app/lib/image-url';
import { ImageWithFallback } from '@/app/components/UI/ImageWithFallback';
import { PostCard } from '@/app/components/UI/PostCard';

const SEARCH_QUERY = `*[_type == "post" && (title match $query || excerpt match $query)]{
  _id, 
  title, 
  slug, 
  publishedAt,
  excerpt,
  image,
  author->{
    _id,
    name,
    slug,
    image
  },
  categories[]->{
    _id,
    title,
    slug
  }
}`;

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const { q } = await searchParams;
      if (!q) return;
      
      setQuery(q);
      setLoading(true);
      
      try {
        const data = await client.fetch(SEARCH_QUERY, { query: `*${q}*` });
        setResults(data);
      } catch (error) {
        console.error('Error searching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchParams]);

  return (
    <div className="container mx-auto min-h-screen max-w-4xl p-8">
      <h1 className="text-3xl font-bold mb-8">
        {query ? `Search results for "${query}"` : 'Search Posts'}
      </h1>
      
      {loading ? (
        <p>Searching...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((post) => (
            <PostCard key={post._id} post={post} size="small" />
          ))}
        </div>
      ) : query ? (
        <p>No posts found matching your search.</p>
      ) : (
        <p>Enter a search term to find posts.</p>
      )}
    </div>
  );
}