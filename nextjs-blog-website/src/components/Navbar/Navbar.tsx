"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SunIcon, MoonIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [searchQuery, setSearchQuery] = useState("");

  // Load initial theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search for:", searchQuery);
    // Integrate Redux Toolkit or router navigation here
  };

  return (
    <nav className="bg-white shadow-md py-4 items-center">
      <div className="container mx-auto flex items-center justify-around">
        {/* Logo & MetaData */}
        <div className="flex items-center space-x-2">
          <Image
          src="/logo.png" // replace with your logo path
          alt="Logo"
          width={36}
          height={36} 
          className="object-contain"
          />
          <span className="text-darkgrey-900 text-2xl">Meta<span className="text-darkgrey-900 font-extrabold">Blog</span></span>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6">
          <li>
            <Link href="/" className="text-darkgrey-900 hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link href="/author" className="text-darkgrey-900 hover:text-blue-500">
              Author
            </Link>
          </li>
          <li>
            <Link href="/categories" className="text-darkgrey-900 hover:text-blue-500">
              Categories
            </Link>
          </li>
        </ul>

        {/* Search Bar & Theme Toggle */}
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-gray-100  text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          </form>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-gray-200 text-gray-800"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
