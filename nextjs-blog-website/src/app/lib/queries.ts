// src/lib/queries.ts
export const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...$limit]{
  _id, 
  title, 
  slug, 
  publishedAt,
  excerpt,
  image,
  author->{
    _id,
    name,
    "slug": slug.current,
    image
  },
  categories[]->{
    _id,
    title,
    "slug": slug.current
  }
}`;

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  body,
  excerpt,
  image,
  author->{
    _id,
    name,
    "slug": slug.current,
    image
  },
  categories[]->{
    _id,
    title,
    "slug": slug.current
  }
}`;