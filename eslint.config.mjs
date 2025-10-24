import beePop from '@antfu/eslint-config';
import eslintPluginTailwindCSS from 'eslint-plugin-tailwindcss';

export default beePop(
  ...eslintPluginTailwindCSS.configs['flat/recommended'],
  {
    rules: {
      /** 结尾分号 */
      'style/semi': ['error', 'always'],
      /** 结尾逗号 */
      'style/comma-dangle': ['error', 'always-multiline'],
      /** 允许使用log */
      'no-console': 'off',
      'no-alert': 'off',

      /** 允许const声明函数 */
      'antfu/top-level-function': 'off',

      /** 允许声明变量未使用 */
      'unused-imports/no-unused-vars': 'off',
      'no-unused-vars': 'off',

      'node/handle-callback-err': 'off',
      'node/prefer-global/process': 'off',
      'ts/no-use-before-define': 'off',
      'ts/method-signature-style': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
      // 所有的组件名保持 `PascalCase`
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false,
        },
      ],

      'vue/no-unused-vars': ['error', {
        ignorePattern: '_',
      }],

      /** Vue props 定义使用小驼峰 */
      'vue/prop-name-casing': ['error', 'camelCase'],

      /** Vue props 传值时使用小驼峰 */
      'vue/attribute-hyphenation': ['error', 'never', {
        ignore: [],
      }],

      /** Vue emit 接收事件时使用小驼峰 */
      'vue/v-on-event-hyphenation': ['error', 'never', {
        autofix: true,
        ignore: [],
      }],

      /** 关闭 Tailwind CSS 类名检查 */
      'tailwindcss/no-custom-classname': 'off',
    },

    ignores: [
      'public/',
      '**/proto/**',
      '*/**/**.d.ts',
    ],
  },
);
