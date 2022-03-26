/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      exclude: ['**/components/*.vue'],
    }),

    Icons({
      compiler: 'vue3',
      customCollections: {
        svg: FileSystemIconLoader(
          'src/assets/svg',
          svg => svg.replace(/^<svg /, '<svg fill="currentColor" '),
        ),
      },
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
        {
          '@/api': [
            // default imports
            ['default', 'api'],
          ],
        },
      ],
      resolvers: [ElementPlusResolver()],
      dts: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dirs: [
        'src/components',
        '**/components',
      ],
      dts: true,
      resolvers: [
        IconsResolver({
          customCollections: ['svg'],
        }),
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
  ],

  server: {
    proxy: {
      // 选项写法
      '/bim': {
        target: 'http://bimengine.dhcad.cn/bim',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/bim/, ''),
      },
    },
  },

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
