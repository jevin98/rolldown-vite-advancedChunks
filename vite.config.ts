import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import { defineConfig } from 'vite';
import VueDevTools from 'vite-plugin-vue-devtools';
import Inspector from 'vite-plugin-vue-inspector';

import pkg from './package.json';
import HmrRefreshUrl from './script/plugins/vite-plugin-hmr-refresh-url';

const allDependencies = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
];

// 从package.json获取到完整包名
function getFullPackageName(normalizedId: string): string | null {
  if (!normalizedId.includes('node_modules')) {
    return null;
  }

  let result = allDependencies.find(packageName => new RegExp(`node_modules/(@)?${packageName}/`).test(normalizedId));

  if (!result) {
    // 可能存在不在package.json中的三方依赖
    result = normalizedId.split('node_modules/').pop()?.split('/')[0];
  }

  return result ? result.replace(/\//g, '-') : null;
}

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    plugins: [
      Inspector(),
      VueDevTools(),
      vue(),
      vueJsx(),

      HmrRefreshUrl(),
    ],

    build: {
      assetsDir: '',
      rolldownOptions: {

        preserveEntrySignatures: false,
        experimental: {
          strictExecutionOrder: true,
        },

        output: {
          minify: false,
          cleanDir: true,

          entryFileNames: 'js/entry/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || '';

            return name.endsWith('.css') ? 'css/[name]-[hash][extname]' : 'assets/[name]-[hash][extname]';
          },

          advancedChunks: {
            includeDependenciesRecursively: false,
            groups: [
              {
                name: (moduleId) => {
                  const normalizedId = moduleId.replace(/\\/g, '/');

                  // 拆分第三方包
                  const packageName = getFullPackageName(normalizedId);
                  if (packageName) {
                    return `js/other/${packageName}`;
                  }

                  // 拆分页面
                  if (normalizedId.includes('src/views/')) {
                    const pageName = normalizedId.split('src/views/').pop()?.split('/')[0];
                    if (pageName) {
                      return `js/pages/${pageName}`;
                    }
                  }

                  return 'js/app';
                },
              },
            ],
          },
        },
      },
    },
  };
});
