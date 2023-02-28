module.exports = {
    root: true,
    env: {
        es6: true,
        amd: true,
        node: true,
        jest: true,
        browser: true,
    },
    extends: [],
    parserOptions: {
        parser: {
            ts: "@typescript-eslint/parser",
            js: "espree",
        },
        project: "./tsconfig.json",
        extraFileExtensions: [ ".vue" ],
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

        semi: ['error', 'never'],
        'max-len': 'off',
        'linebreak-style': 'off',
        camelcase: ['error', { properties: 'never', ignoreDestructuring: true, ignoreImports: true }],
        'arrow-parens': ['error', 'as-needed'],
        'vue/multiline-html-element-content-newline': 'off',
    },
}
