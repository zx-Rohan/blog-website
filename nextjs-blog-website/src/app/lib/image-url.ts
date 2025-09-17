// src/lib/image-url.ts
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/client/sanity';

const builder = imageUrlBuilder(client);

export const getImageUrl = (source: any, width?: number, height?: number) => {
  if (!source) {
    console.log('No image source provided');
    return null;
  }
  
  try {
    let image = builder.image(source);
    
    if (width && height) {
      image = image.width(width).height(height);
    } else if (width) {
      image = image.width(width);
    } else if (height) {
      image = image.height(height);
    }
    
    const url = image.url();
    console.log('Generated image URL:', url);
    return url;
  } catch (error) {
    console.error('Error generating image URL:', error);
    return null;
  }
};