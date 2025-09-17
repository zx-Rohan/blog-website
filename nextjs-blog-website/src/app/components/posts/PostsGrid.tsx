// src/components/posts/PostsGrid.tsx
import { Post } from '@/app/types/sanity';
import { PostCard } from '../UI/PostCard';

interface PostsGridProps {
  posts: Post[];
}

export const PostsGrid: React.FC<PostsGridProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} size="small" />
      ))}
    </div>
  );
};