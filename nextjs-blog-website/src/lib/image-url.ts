// src/lib/image-url.ts
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/client/sanity';

const builder = imageUrlBuilder(client);

export const getImageUrl = (source: any, width?: number, height?: number) => {
  if (!source) return null;
  
  try {
    let image = builder.image(source);
    
    if (width && height) {
      image = image.width(width).height(height);
    } else if (width) {
      image = image.width(width);
    } else if (height) {
      image = image.height(height);
    }
    
    return image.url();
  } catch (error) {
    console.error('Error generating image URL:', error);
    return null;
  }
};