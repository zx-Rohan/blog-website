// src/components/ui/CategoryBadge.tsx
import { CategoryBadgeProps } from '@/app/types/sanity';
import { cn } from '@/app/lib/utils'; // We'll create this utility

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ 
  category, 
  className 
}) => {
  return (
    <span className={cn(
      "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium",
      className
    )}>
      {category.title}
    </span>
  );
};