import { nicheBase, nichePrettier } from '@schibsted/niche-eslint-config';

export default [
    ...nicheBase,
    ...nichePrettier,
    {
        ignores: ['node_modules'],
    },
];
