// src/components/layout/Navbar.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/app/hooks/useTheme';
import { client } from '@/client/sanity';
import { SEARCH_SUGGESTIONS_QUERY } from '@/app/lib/queries';
import { SearchSuggestions } from '@/app/components/UI/SearchSuggestion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { theme, setTheme, mounted } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchSuggestions(searchQuery.trim());
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchSuggestions = async (query: string) => {
    try {
      const data = await client.fetch(SEARCH_SUGGESTIONS_QUERY, { query: `*${query}*` });
      setSuggestions(data || []);
      setShowSuggestions(data && data.length > 0);
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  }, [searchQuery, router]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [router]);

  useEffect(() => {
    setShowSuggestions(false);
  }, [pathname]);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <Image
                src="/logo.png"
                alt="Blog Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              MetaBlog
            </span>
          </Link>

          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <Link 
                href="/" 
                className={`${pathname === '/' ? 'text-blue-600' : 'text-gray-700 dark:text-gray-300'} hover:text-blue-600 dark:hover:text-blue-400`}
              >
                Home
              </Link>
              <Link 
                href="/blog" 
                className={`${pathname === '/blog' ? 'text-blue-600' : 'text-gray-700 dark:text-gray-300'} hover:text-blue-600 dark:hover:text-blue-400`}
              >
                Blog
              </Link>
              <Link 
                href="/authors" 
                className={`${pathname === '/authors' ? 'text-blue-600' : 'text-gray-700 dark:text-gray-300'} hover:text-blue-600 dark:hover:text-blue-400`}
              >
                Authors
              </Link>
              <Link 
                href="/contact" 
                className={`${pathname === '/contact' ? 'text-blue-600' : 'text-gray-700 dark:text-gray-300'} hover:text-blue-600 dark:hover:text-blue-400`}
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">

            <div ref={searchRef} className="relative">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(suggestions.length > 0)}
                    className="pl-10 pr-4 py-2 w-48 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSuggestions([]);
                        setShowSuggestions(false);
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </form>
              
              {showSuggestions && (
                <SearchSuggestions 
                  suggestions={suggestions} 
                  onSelect={() => {
                    setShowSuggestions(false);
                    setSearchQuery('');
                  }}
                />
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/authors"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                Authors
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}