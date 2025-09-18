// src/components/pages/SearchPage.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '@/client/sanity';
import { SEARCH_SUGGESTIONS_QUERY } from '@/app/lib/queries';
import { PostCard } from '@/app/components/UI/PostCard';

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
        const data = await client.fetch(SEARCH_SUGGESTIONS_QUERY, { query: `*${q}*` });
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
    <div className="container mx-auto min-h-screen max-w-4xl p-8 bg-white dark:bg-gray-900">
      <div className="mb-8">
        <Link 
          href="/" 
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to home
        </Link>
        <h1 className="text-3xl font-bold mt-4 text-gray-900 dark:text-white">
          {query ? `Search results for "${query}"` : 'Search Posts'}
        </h1>
      </div>
      
      {loading ? (
        <p className="text-gray-700 dark:text-gray-300">Searching...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((post) => (
            <PostCard key={post._id} post={post} size="small" />
          ))}
        </div>
      ) : query ? (
        <p className="text-gray-700 dark:text-gray-300">No posts found matching your search.</p>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">Enter a search term to find posts.</p>
      )}
    </div>
  );
}