import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
export default tseslint.config(
  {
    files: ['{./src/**/*.ts}'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      'interface-name-prefix': 'off',
      'explicit-function-return-type': 'off',
      'explicit-module-boundary-types': 'off',
      'no-explicit-any': 'off',
      'space-before-function-paren': ['error', 'always'],
      'object-curly-spacing': ["error", "always"],
      'block-spacing': 'error',
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      indent: ['error', 2],
    },
  }
)
