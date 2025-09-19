// src/app/layout.tsx
'use client';

import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    if (!storedTheme) {
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else if (storedTheme === 'system') {
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else {
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar/>
        <main className = "bg-white dark:bg-gray-900">{children}</main>
        <Footer />
      </body>
    </html>
  );
}