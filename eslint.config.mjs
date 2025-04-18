import { nicheBase, nicheFront, nichePrettier } from '@schibsted/niche-eslint-config';
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
    ...nicheBase,
    ...nicheFront,
    ...eslintPluginAstro.configs['flat/recommended'],
    ...nichePrettier,
    {
        settings: {
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx', '.mjs'],
                'astro-eslint-parser': ['.astro'],
            },
            'import/resolver': {
                node: {
                    extensions: ['.js', '.ts', '.mjs', '.astro'],
                },
                typescript: {
                    project: './tsconfig.json',
                },
            },
        },
    },
    {
        ignores: [
            'node_modules',
            '.astro',
            'src/env.d.ts',
            '.ai/**',
            '*.env',
            '.env.test',
            'playwright-report/**',
            'test-results/**',
        ],
    },
    {
        rules: {
            'import/extensions': [
                'error',
                {
                    astro: 'always',
                },
            ],
            'import/no-unresolved': [
                'error',
                {
                    ignore: ['astro:middleware', 'astro:transitions/client'],
                },
            ],
            'jsx-a11y/label-has-associated-control': 'off',
        },
    },
];
