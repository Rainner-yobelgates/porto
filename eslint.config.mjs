import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import typescriptParser from '@typescript-eslint/parser'

export default [
  { ignores: ['node_modules/**', '.nuxt/**', '.output/**', '.npm-cache/**', 'test-results/**'] },
  js.configs.recommended,
  ...vue.configs['flat/essential'],
  {
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: { parserOptions: { parser: typescriptParser } },
    // Nuxt's generated types and vue-tsc check imports and unused TypeScript bindings.
    rules: { 'no-undef': 'off', 'no-unused-vars': 'off' },
  },
  { files: ['**/*.ts'], languageOptions: { parser: typescriptParser } },
  {
    files: ['app/pages/**/*.vue', 'app/layouts/**/*.vue', 'app/app.vue', 'app/error.vue'],
    rules: { 'vue/multi-word-component-names': 'off' },
  },
]
