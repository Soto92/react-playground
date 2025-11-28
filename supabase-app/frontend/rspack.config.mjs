// @ts-check
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from '@rspack/cli';
import { rspack, DefinePlugin } from '@rspack/core';
import { ReactRefreshRspackPlugin } from '@rspack/plugin-react-refresh';
import dotenv from 'dotenv';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV === 'development';

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ['last 2 versions', '> 0.2%', 'not dead', 'Firefox ESR'];

export default defineConfig({
  context: __dirname,
  entry: {
    main: './src/main.jsx',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            /** @type {import('@rspack/core').SwcLoaderOptions} */
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new DefinePlugin({
      'import.meta.env.SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL),
      'import.meta.env.SUPABASE_KEY': JSON.stringify(process.env.SUPABASE_KEY),
    }),
    isDev ? new ReactRefreshRspackPlugin() : null,
  ],
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  experiments: {
    css: true,
  },
});
