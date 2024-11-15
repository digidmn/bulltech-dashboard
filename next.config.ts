import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [], // Add any image domains you need
    },
    webpack(config) {
        return config;
    },
};

export default nextConfig;