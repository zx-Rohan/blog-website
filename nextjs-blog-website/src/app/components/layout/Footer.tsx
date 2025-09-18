// src/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">About</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Email:</strong> info@jstemplate.net
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <strong>Phone:</strong> 880123456789
              </p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Link</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Link href="/" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Home
                </Link>
                <Link href="/about" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  About
                </Link>
                <Link href="/blog" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Blog
                </Link>
                <Link href="/archived" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Archived
                </Link>
                <Link href="/authors" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Author
                </Link>
                <Link href="/contact" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Contact
                </Link>
              </div>
              <div className="space-y-2">
                <Link href="/category/lifestyle" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Lifestyle
                </Link>
                <Link href="/category/technology" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Technology
                </Link>
                <Link href="/category/travel" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Travel
                </Link>
                <Link href="/category/business" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Business
                </Link>
                <Link href="/category/economy" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Economy
                </Link>
                <Link href="/category/sports" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Sports
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Weekly Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get blog articles and offers via email
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="relative w-6 h-6">
              <img
                src="/logo.png"
                alt="MetaBlog Logo"
                className="object-contain dark:bg-white dark:rounded-2xl"
              />
            </div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              MetaBlog
            </span>
          </div>
          <div className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            © JSTemplate 2023. All Rights Reserved.
          </div>
          <div className="flex space-x-4">
            <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Terms of Use
            </Link>
            <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link href="/cookie" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}