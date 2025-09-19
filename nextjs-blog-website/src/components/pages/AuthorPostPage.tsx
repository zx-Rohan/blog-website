// src/components/pages/AuthorPostsPage.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '@/client/sanity';
import { AUTHOR_QUERY, AUTHOR_POSTS_QUERY } from '@/lib/queries';
import { getImageUrl } from '@/lib/image-url';
import { PostCard } from '@/components/UI/PostCard';
import { ImageWithFallback } from '@/components/UI/ImageWithFallback';

interface AuthorPostsPageProps {
  params: Promise<{ slug: string }>;
}

export default function AuthorPostsPage({ params }: AuthorPostsPageProps) {
  const [author, setAuthor] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
      

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const { slug } = await params;
        console.log('Fetching author with slug:', slug);
        
        if (!slug) {
          setError('Author slug is missing');
          setLoading(false);
          return;
        }
        
        const authorData = await client.fetch(AUTHOR_QUERY, { slug });
        console.log('Author data:', authorData);
        
        if (authorData) {
          setAuthor(authorData);
          
          const authorPosts = await client.fetch(AUTHOR_POSTS_QUERY, { 
            authorId: authorData._id 
          });
          console.log('Author posts:', authorPosts);
          setPosts(authorPosts);
        } else {
          setError('Author not found');
        }
      } catch (err) {
        console.error('Error fetching author data:', err);
        setError('Failed to fetch author data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [params]);

  if (loading) {
    return (
      <div className="container mx-auto min-h-screen max-w-6xl p-8 bg-white dark:bg-gray-900">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-8"></div>
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-600 mr-4"></div>
            <div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-64"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="h-48 bg-gray-300 dark:bg-gray-600 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto min-h-screen max-w-4xl p-8 bg-white dark:bg-gray-900">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">
          ← Back to home
        </Link>
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Error</h1>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="container mx-auto min-h-screen max-w-4xl p-8 bg-white dark:bg-gray-900">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">
          ← Back to home
        </Link>
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Author not found</h1>
        <p className="text-gray-600 dark:text-gray-400">The author you're looking for doesn't exist.</p>
      </div>
    );
  }

  const authorImageUrl = getImageUrl(author.image, 200, 200);

  return (
    <div className="container mx-auto min-h-screen max-w-6xl p-8 bg-white dark:bg-gray-900">
      <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">
        ← Back to home
      </Link>
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
          <ImageWithFallback
            src={authorImageUrl}
            alt={author.name}
            fill
            className="object-cover"
            fallbackSrc="/images/avatar-placeholder.png"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{author.name}</h1>
          {author.bio && (
            <p className="text-gray-600 dark:text-gray-400">{author.bio}</p>
          )}
          <p className="text-gray-500 dark:text-gray-500 mt-2">
            {posts.length} post{posts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
      
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} size="small" />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 text-center py-12">
          No posts found by this author.
        </p>
      )}
    </div>
  );
}
