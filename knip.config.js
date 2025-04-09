const config = {
    ignore: ['config/**', 'eslint.config.mjs'],
    ignoreBinaries: ['eslint', 'prettier'],
    ignoreDependencies: ['@schibsted/niche-eslint-config'],
    rules: {
        enumMembers: 'off',
        unlisted: 'off',
    },
};

export default config;
