import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from "rehype-slug";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 빌드 시 TypeScript 에러가 있어도 무시하고 진행합니다. (선택사항)
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug], // ✨ 여기에 쏙!
  },
});


// export default nextConfig
export default withMDX(nextConfig);
