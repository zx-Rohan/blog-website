// src/components/pages/AuthorsPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { client } from '@/client/sanity';
import { AUTHOR_QUERY } from '@/app/lib/queries';
import AuthorCard from '@/app/components/authors/AuthorCard';

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const data = await client.fetch(AUTHOR_QUERY);
        setAuthors(data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto min-h-screen max-w-6xl p-8 bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Authors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md animate-pulse">
              <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-1"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen max-w-6xl p-8 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Authors</h1>
      
      {authors.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center py-12">
          No authors found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author._id} author={author} />
          ))}
        </div>
      )}
    </div>
  );
}