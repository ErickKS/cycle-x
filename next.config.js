const CopyPlugin = require("copy-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,

      fs: false,
    };

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "./node_modules/onnxruntime-web/dist/ort-wasm.wasm",
            to: "static/chunks", // build
            // to: "static/chunks/app/registro/fotos", // dev
          },
          {
            from: "./node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm",
            to: "static/chunks", //build
            // to: "static/chunks/app/registro/fotos", // dev
          },
          {
            from: "./public/model",
            to: "static/chunks/app",
          },
        ],
      })
    );

    return config;
  },
};

module.exports = nextConfig;
