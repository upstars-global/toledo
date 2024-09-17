module.exports = {
    root: true,
    env: {
        es6: true,
        amd: true,
        node: true,
        jest: true,
        browser: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'max-len': 'off',
        'linebreak-style': 'off',
        'quotes': ['error', 'single'],
        indent: ['error', 4, { SwitchCase: 1 }],
        camelcase: ['error', { properties: 'never', ignoreDestructuring: true, ignoreImports: true }],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'off'
    },
}
