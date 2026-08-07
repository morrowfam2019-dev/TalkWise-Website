import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy paths from before membership moved to Whop and the free-account
      // concept was dropped. Kept permanent so any link already in the wild
      // still lands somewhere sensible.
      { source: "/register", destination: "/updates", permanent: true },
      { source: "/signup", destination: "/updates", permanent: true },
      { source: "/login", destination: "/membership", permanent: false },
      { source: "/dashboard", destination: "/membership", permanent: false },
      { source: "/kids", destination: "/speech-academy", permanent: true },
      { source: "/kid-zone", destination: "/speech-academy", permanent: true },
      { source: "/parents", destination: "/parent-training", permanent: true },
      { source: "/english", destination: "/esl-academy", permanent: true },
    ];
  },
};

export default nextConfig;
