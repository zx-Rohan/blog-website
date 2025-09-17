// sanity/lib/queries.ts
import { groq } from "next-sanity";

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "image": image.asset->url,
    author->{
      _id,
      name,
      "slug": slug.current,
      "image": image.asset->url
    },
    categories[]->{
      _id,
      title,
      "slug": slug.current
    }
  }
`;
