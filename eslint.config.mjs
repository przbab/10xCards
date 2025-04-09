import { nicheBase, nichePrettier } from '@schibsted/niche-eslint-config';
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
    ...nicheBase,
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
        ignores: ['dist', 'node_modules', '.astro', 'src/env.d.ts'],
    },
    {
        rules: {
            'import/extensions': [
                'error',
                {
                    astro: 'always',
                },
            ],
        },
    },
];
