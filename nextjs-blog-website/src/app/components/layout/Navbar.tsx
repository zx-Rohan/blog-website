// src/components/layout/Navbar.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Search, Sun, Moon, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // 300ms debounce time

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle search submission
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }, [searchQuery, router]);

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [router]);

  // Get current search query from URL
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
  }, [searchParams]);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 ">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <Image
                src="/logo.png"
                alt="Blog Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-gray-900 ">
              My Blog
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Authors link */}
            <Link
              href="/authors"
              className="text-gray-700 hover:text-blue-600 dark:hover:text-blue-400 flex items-center space-x-1"
            >
              <User size={18} />
              <span>Authors</span>
            </Link>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100  text-gray-700  hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 "
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 "
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link
                href="/authors"
                className="text-gray-700  hover:text-blue-600 dark:hover:text-blue-400 flex items-center space-x-2"
              >
                <User size={18} />
                <span>Authors</span>
              </Link>

              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}