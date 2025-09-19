// src/lib/sanity.ts
import { createClient } from 'next-sanity';

// Validate environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

if (!projectId) {
  throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not defined');
}

if (!dataset) {
  throw new Error('NEXT_PUBLIC_SANITY_DATASET is not defined');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});