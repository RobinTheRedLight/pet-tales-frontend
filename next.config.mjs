/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        hostname: "img.daisyui.com",
      },
    ],
  },
};

export default nextConfig;
