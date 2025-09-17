// sanity/lib/fetch.ts
import { client } from "@/client/sanity";
import { allPostsQuery } from "./queries";
import type { Post } from "@/types";

export async function getAllPosts(): Promise<Post[]> {
  const options = { next: { revalidate: 30 } }; // ISR
  return client.fetch<Post[]>(allPostsQuery, {}, options);
}
