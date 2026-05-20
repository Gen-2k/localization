import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist', 'node_modules', '.vite', 'public', 'coverage']),

  // Perfectionist: import + alphabetical sorting (natural order)
  perfectionist.configs['recommended-natural'],
  { rules: { 'perfectionist/sort-objects': 'off' } },

  // Config files (lite)
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['*.{js,ts}'],
    languageOptions: { globals: { ...globals.node } },
    rules: { '@typescript-eslint/no-unused-vars': 'warn' },
  },

  // Source files (type-checked)
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2024 },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { fixStyle: 'separate-type-imports', prefer: 'type-imports' },
      ],
      '@typescript-eslint/method-signature-style': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { args: 'after-used', argsIgnorePattern: '^_', vars: 'all', varsIgnorePattern: '^_' },
      ],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-implicit-coercion': 'warn',
      // Perfectionist: import grouping (overrides recommended-natural defaults)
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'type-import',
            ['value-builtin', 'value-external'],
            'type-internal',
            'value-internal',
            ['type-parent', 'type-sibling', 'type-index'],
            ['value-parent', 'value-sibling', 'value-index'],
            'side-effect',
            'style',
          ],
          newlinesBetween: 1,
        },
      ],

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // React + JSX
  {
    extends: [pluginReact.configs.flat.recommended, reactHooks.configs.flat.recommended],
    files: ['src/**/*.{tsx,jsx}'],
    rules: {
      'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
      'react/jsx-no-useless-fragment': 'warn',
      'react/no-array-index-key': 'error',
      'react/no-unstable-nested-components': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': 'warn',
    },
    settings: { react: { version: 'detect' } },
  },

  // shadcn/ui generated components
  {
    files: ['src/components/ui/**/*.{tsx,jsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'perfectionist/sort-objects': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },

  // Test files
  {
    files: ['src/**/*.{test,spec}.{ts,tsx}', 'src/test/**/*'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.vitest },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'no-console': 'off',
    },
  },

  eslintConfigPrettier,
]);
