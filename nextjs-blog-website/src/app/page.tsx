// // app/page.tsx
// import Link from "next/link";
// import { type SanityDocument } from "next-sanity";
// import { client } from "@/client/sanity";
// import imageUrlBuilder from "@sanity/image-url";
// 
// const builder = imageUrlBuilder(client);
// const urlFor = (source: any) => builder.image(source);
// 
// const POSTS_QUERY = `*[
//   _type == "post"
//   && defined(slug.current)
// ]|order(publishedAt desc)[0...10]{
//   _id, 
//   title, 
//   slug, 
//   publishedAt,
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
// 
// const options = { next: { revalidate: 30 } };
// 
// export default async function IndexPage() {
//   const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
//   
//   // Separate the first post as the featured post
//   const featuredPost = posts[0];
//   const remainingPosts = posts.slice(1);
// 
//   const featuredImageUrl = featuredPost.image ? urlFor(featuredPost.image).width(800).height(400).url() : null;
//   const featuredAuthorImageUrl = featuredPost.author?.image ? urlFor(featuredPost.author.image).width(40).height(40).url() : null;

  // return (
    // <main className="container mx-auto min-h-screen max-w-6xl p-8">
      // {/* <h1 className="text-4xl font-bold mb-8 text-center">Latest Posts</h1>
      //  */}
      // Featured Post (Large)
      {/* {featuredPost && (
        <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow mb-12"> */}
          // {/* <Link href={`/blog/${featuredPost.slug.current}`} className="block">
            {/* {featuredImageUrl && ( */}
              // <div className="w-full h-64 md:h-96"> */}
                // {/* <img
                  // src={featuredImageUrl} */}
                  // alt={featuredPost.title}
                  // className="w-full h-full object-cover"
                // />
              // {/* </div>
            // )} */}
            // {/* <div className="p-6">
              {/* {featuredPost.categories && featuredPost.categories.length > 0 && ( */}
                // <div className="flex flex-wrap gap-2 mb-3"> */}
                  // {/* {featuredPost.categories.map((category: any) => (
                    // <span  */}
                      // key={category._id}
                      // className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                    // >
                      // {/* {category.title}
                    {/* </span> */}
                  // ))} */}
                // {/* </div>
//               )} */}
// {/*               
              {/* <h2 className="text-2xl md:text-3xl font-bold mb-3">{featuredPost.title}</h2> */}
{/*                */}
              {/* {featuredPost.excerpt && ( */}
                // <p className="text-gray-600 mb-4 text-lg"> */}
                  // {/* {featuredPost.excerpt}
                {/* </p> */}
//               )} */}
// {/*               
              {/* <div className="flex items-center justify-between text-sm text-gray-500"> */}
                {/* <div className="flex items-center gap-2"> */}
                  {/* {featuredAuthorImageUrl && ( */}
                    // <img */}
                      // src={featuredAuthorImageUrl}
                      // alt={featuredPost.author.name}
                      // className="w-6 h-6 rounded-full object-cover"
                    // />
                  // )}
                  // {/* <span>{featuredPost.author?.name || "Unknown Author"}</span>
                {/* </div> */}
                {/* <span>{new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {  */}
                  // year: 'numeric',  */}
                  // month: 'long', 
                  // day: 'numeric' 
                // })}</span>
              // {/* </div>
            {/* </div> */}
          {/* </Link> */}
        {/* </article> */}
//       )} */}
//       
      // Grid of Remaining Posts
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* {remainingPosts.map((post) => { */}
          // const postImageUrl = post.image ? urlFor(post.image).width(300).height(240).url() : null; */}
//           // const authorImageUrl = post.author?.image ? urlFor(post.author.image).width(40).height(40).url() : null;
//           
          // return (
            // <article key={post._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              // {/* <Link href={`/blog/${post.slug.current}`} className="block">
                {/* {postImageUrl && ( */}
                  // <div className="w-full h-48 overflow-hidden"> */}
                    // {/* <img
                      // src={postImageUrl} */}
                      // alt={post.title}
                      // className="w-full h-full object-cover"
                    // />
                  // {/* </div>
                // )} */}
                // {/* <div className="p-6">
                  {/* {post.categories && post.categories.length > 0 && ( */}
                    // <div className="flex flex-wrap gap-2 mb-3"> */}
                      // {/* {post.categories.map((category: any) => (
                        // <span  */}
                          // key={category._id}
                          // className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                        // >
                          // {/* {category.title}
                        {/* </span> */}
                      // ))} */}
                    // {/* </div>
//                   )} */}
// {/*                   
                  {/* <h2 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h2> */}
{/*                    */}
                  {/* {post.excerpt && ( */}
                    // <p className="text-gray-600 mb-4 line-clamp-3"> */}
                      // {/* {post.excerpt}
                    {/* </p> */}
//                   )} */}
// {/*                   
                  {/* <div className="flex items-center justify-between text-sm text-gray-500"> */}
                    {/* <div className="flex items-center gap-2"> */}
                      {/* {authorImageUrl && ( */}
                        // <img */}
                          // src={authorImageUrl}
                          // alt={post.author.name}
                          // className="w-6 h-6 rounded-full object-cover"
                        // />
                      // )}
                      // {/* <span>{post.author?.name || "Unknown Author"}</span>
                    {/* </div> */}
                    {/* <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {  */}
                      // year: 'numeric',  */}
                      // month: 'long', 
                      // day: 'numeric' 
                    // })}</span>
                  // {/* </div>
                {/* </div> */}
              {/* </Link> */}
            {/* </article> */}
          // ); */}
        // })}
      // {/* </div>
    {/* </main> */}
  // ); */}
// // }

// src/app/page.tsx
import HomePage from '@/app/components/pages/HomePage';

export default function Home() {
  return <HomePage />;
}