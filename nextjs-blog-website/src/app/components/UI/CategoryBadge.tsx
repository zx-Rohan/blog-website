// src/components/ui/CategoryBadge.tsx
import { CategoryBadgeProps } from '@/app/types/sanity';

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  return (
    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
      {category.title}
    </span>
  );
};