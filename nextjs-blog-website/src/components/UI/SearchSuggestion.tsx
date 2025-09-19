// src/components/ui/SearchSuggestions.tsx
'use client';

import Link from 'next/link';
import { Post } from '@/types/sanity';

interface SearchSuggestionsProps {
  suggestions: Post[];
  onSelect: () => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ 
  suggestions, 
  onSelect 
}) => {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-b-lg shadow-lg z-50 mt-1">
      <div className="py-2">
        {suggestions.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            onClick={onSelect}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >
            <div className="font-medium">{post.title}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};