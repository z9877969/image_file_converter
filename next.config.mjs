/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // 🔹 дозволяємо Node.js самому працювати з .node файлами
      config.externals.push({
        '@napi-rs/image-linux-x64-gnu': 'commonjs @napi-rs/image-linux-x64-gnu',
      });
    }

    // 🔹 кажемо Webpack'у: не намагайся парсити .node файли
    config.module.rules.push({
      test: /\.node$/,
      use: 'null-loader',
    });

    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['@napi-rs/image'],
  },
};

export default nextConfig;
