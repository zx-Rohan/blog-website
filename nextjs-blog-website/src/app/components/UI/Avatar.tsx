// src/components/ui/Avatar.tsx
interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
      />
    );
  }

  // Fallback to initials if no image
  const initials = alt
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`rounded-full bg-gray-300 flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <span className="text-xs font-medium text-gray-700">{initials}</span>
    </div>
  );
};