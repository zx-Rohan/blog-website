// src/lib/queries.ts
export const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...$limit]{
  _id, 
  title, 
  "slug": slug.current,
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
  "slug": slug.current,
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

export const SEARCH_SUGGESTIONS_QUERY = `*[_type == "post" && (title match $query || excerpt match $query)]{
  _id, 
  title, 
  "slug": slug.current,
  publishedAt
}[0...5]`;

export const AUTHOR_QUERY = `*[_type == "author" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  image,
  bio
}`;

export const AUTHOR_POSTS_QUERY = `*[_type == "post" && author._ref == $authorId]{
  _id, 
  title, 
  "slug": slug.current,
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