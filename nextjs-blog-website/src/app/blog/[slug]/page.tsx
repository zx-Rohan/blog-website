// app/blog/[slug]/page.tsx
// import { PortableText, type SanityDocument } from "next-sanity";
// import imageUrlBuilder from "@sanity/image-url";
// import { client } from "@/client/sanity";
// import Link from "next/link";
// // import Image from "next/image";

// const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
//   _id,
//   title,
//   slug,
//   publishedAt,
//   body,
//   excerpt,
//   image,
//   author->{
//     _id,
//     name,
//     "slug": slug.current,
//     image
//   },
//   categories[]->{
//     _id,
//     title,
//     "slug": slug.current
//   }
// }`;

// const builder = imageUrlBuilder(client);
// const urlFor = (source: any) => builder.image(source);

// const options = { next: { revalidate: 30 } };

// export default async function PostPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const slug = (await params).slug;
//   const post = await client.fetch<SanityDocument>(POST_QUERY, { slug }, options);
  
//   if (!post) {
//     return (
//       <main className="container mx-auto min-h-screen max-w-3xl p-8">
//         <Link href="/" className="hover:underline">
//           ← Back to posts
//         </Link>
//         <h1 className="text-4xl font-bold mb-8">Post not found</h1>
//         <p>The post you're looking for doesn't exist.</p>
//       </main>
//     );
//   }

//   const postImageUrl = post.image ? urlFor(post.image).width(800).height(400).url() : null;
//   const authorImageUrl = post.author?.image ? urlFor(post.author.image).width(100).height(100).url() : null;

//   return (
//     <main className="container mx-auto min-h-screen max-w-4xl p-8">
//       <Link href="/" className="inline-flex items-center text-blue-600 hover:underline mb-8">
//         ← Back to posts
//       </Link>
      
//       <article className="bg-white rounded-lg shadow-md overflow-hidden">
//         {postImageUrl && (
//           <div className="relative w-full h-64 md:h-96">
//             <img
//               src={postImageUrl}
//               alt={post.title}
//               fill
//               className="object-cover"
//             />
//           </div>
//         )}
        
//         <div className="p-8">
//           {post.categories && post.categories.length > 0 && (
//             <div className="flex flex-wrap gap-2 mb-4">
//               {post.categories.map((category: any) => (
//                 <span 
//                   key={category._id}
//                   className="category-badge"
//                 >
//                   {category.title}
//                 </span>
//               ))}
//             </div>
//           )}
          
//           <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
//           <div className="flex items-center gap-4 text-gray-600 mb-6">
//             {post.author && (
//               <div className="flex items-center gap-2">
//                 {authorImageUrl && (
//                   <div className="relative w-8 h-8 rounded-full overflow-hidden">
//                     <img
//                       src={authorImageUrl}
//                       alt={post.author.name}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                 )}
//                 <span>{post.author.name}</span>
//               </div>
//             )}
            
//             <span>•</span>
            
//             <span>
//               {new Date(post.publishedAt).toLocaleDateString('en-US', { 
//                 year: 'numeric', 
//                 month: 'long', 
//                 day: 'numeric' 
//               })}
//             </span>
//           </div>
          
//           {post.excerpt && (
//             <p className="text-xl italic text-gray-700 mb-8 border-l-4 border-blue-500 pl-4 py-2">
//               {post.excerpt}
//             </p>
//           )}
          
//           <div className="prose max-w-none">
//             {Array.isArray(post.body) && <PortableText value={post.body} />}
//           </div>
//         </div>
//       </article>
//     </main>
//   );
// }


// src/app/blog/[slug]/page.tsx
import BlogPostPage from '@/app/components/pages/BlogPostPage';

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogPostPage params={params} />;
}