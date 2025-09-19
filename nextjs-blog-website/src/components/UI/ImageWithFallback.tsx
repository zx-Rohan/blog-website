// src/components/ui/ImageWithFallback.tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  fallbackSrc?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  fill = false,
  fallbackSrc = '/images/placeholder.jpg'
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={cn(className, { 'w-full h-full object-cover': fill })}
      width={width}
      height={height}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};