/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    CLOUDINARY_PRESET: process.env.CLOUDINARY_PRESET,
  },
  images: {
    domains: ["res.cloudinary.com", "boimate.com"],
  },
};

export default nextConfig;
