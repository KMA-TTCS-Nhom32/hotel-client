/** @type {import('next').NextConfig} */

// const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dzoykqusl/image/upload/v1731952369/ahomevilla/**',
      },
    ],
  },
};

export default nextConfig;
