// src/components/pages/AuthorsPage.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '@/client/sanity';
import { getImageUrl } from '@/app/lib/image-url';
import { ImageWithFallback } from '@/app/components/UI/ImageWithFallback';

const AUTHORS_QUERY = `*[_type == "author"]{
  _id,
  name,
  slug,
  image,
  bio
}`;

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const data = await client.fetch(AUTHORS_QUERY);
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
      <div className="container mx-auto min-h-screen max-w-4xl p-8">
        <h1 className="text-3xl font-bold mb-8">Authors</h1>
        <p>Loading authors...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen max-w-4xl p-8">
      <h1 className="text-3xl font-bold mb-8">Authors</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => {
          const authorImageUrl = getImageUrl(author.image, 200, 200);
          
          return (
            <Link
              key={author._id}
              href={`/authors/${author.slug.current}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                {authorImageUrl && (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                    <ImageWithFallback
                      src={authorImageUrl}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h2 className="text-xl font-semibold mb-2">{author.name}</h2>
                {author.bio && (
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                    {author.bio}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}