// src/hooks/useImageUrl.ts
import { useMemo } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/client/sanity';

const builder = imageUrlBuilder(client);

export const useImageUrl = (source: any, width?: number, height?: number) => {
  return useMemo(() => {
    if (!source) return null;
    
    let image = builder.image(source);
    
    if (width && height) {
      image = image.width(width).height(height);
    } else if (width) {
      image = image.width(width);
    } else if (height) {
      image = image.height(height);
    }
    
    return image.url();
  }, [source, width, height]);
};