// src/app/page.tsx

import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/client/sanity";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, image, publishedAt, author}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 items-center">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link href={`/${post.slug.current}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}


// 'use client';

// import Link from "next/link";
// import  ThemeToggle  from "../components/UI/ThemeToggle";
// import SearchBox from "../components/UI/SearchBox";

// export default function Navbar() {
//   return (
//     <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow">
//       <div className="container mx-auto flex items-center justify-between p-4">
//         <Link href="/" className="text-2xl font-bold text-blue-600">
//           MetaBlog
//         </Link>
//         <div className="hidden md:flex items-center gap-6">
//           <Link href="/" className="hover:text-blue-600">
//             Home
//           </Link>
//           <Link href="/authors" className="hover:text-blue-600">
//             Authors
//           </Link>
//           <Link href="/categories" className="hover:text-blue-600">
//             Categories
//           </Link>
//         </div>
//         <div className="flex items-center gap-4">
//           <SearchBox />
//           <ThemeToggle />
//         </div>
//       </div>
//     </nav>
//   );
// }
