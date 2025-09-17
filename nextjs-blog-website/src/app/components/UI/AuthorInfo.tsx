// src/components/ui/AuthorInfo.tsx
import { AuthorInfoProps } from '@/app/types/sanity';
import { Avatar } from './Avatar';

export const AuthorInfo: React.FC<AuthorInfoProps> = ({ 
  author, 
  date, 
  authorImageUrl,
  showImage = true 
}) => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      {showImage && (
        <Avatar
          src={authorImageUrl}
          alt={author.name}
          size="sm"
        />
      )}
      <span>{author.name}</span>
      {date && (
        <>
          <span>•</span>
          <span>{date}</span>
        </>
      )}
    </div>
  );
};