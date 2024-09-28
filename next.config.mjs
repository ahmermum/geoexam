// next.config.mjs

import path from 'path';
import { fileURLToPath } from 'url';

/** @type {import('next').NextConfig} */

// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  // You can add other Next.js configuration options here if needed

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};

export default nextConfig;


