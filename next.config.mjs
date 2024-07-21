import {hostname} from "node:os";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '/photos/**',
            }, {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            }, {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8000',
                pathname: '/**',
            }, {
                protocol: 'http',
                hostname: '175.178.190.62',
                port: '8000',
                pathname: '/**',
            }
        ]
    }
};

export default nextConfig;
