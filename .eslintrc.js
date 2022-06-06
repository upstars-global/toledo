const OFF = 0, WARN = 1, ERROR = 2;

module.exports = exports = {
    env: {
        es6: true,
        amd: true,
        node: true,
        jest: true,
        browser: true,
    },

    globals: {
        DEV: true,
        FORCE_RUN_ANALYTICS: true,
        PaymentsAPI: true,
        OneSignal: true,
    },

    extends: [
        "eslint:recommended",
        // "plugin:vue/base",
        // "plugin:vue/recommended",
    ],

    parserOptions: {
        ecmaVersion: 13,
    },

    rules: {
        // Possible Errors (overrides from recommended set)
        "no-extra-parens": OFF,
        "no-unexpected-multiline": ERROR,
        // All JSDoc comments must be valid
        "valid-jsdoc": [ WARN, {
            requireReturn: false,
            requireReturnDescription: false,
            requireParamDescription: true,
            prefer: {
                return: "returns",
            },
        } ],

        // Best Practices

        // Allowed a getter without setter, but all setters require getters
        "accessor-pairs": [ ERROR, {
            getWithoutSet: false,
            setWithoutGet: true,
        } ],
        "block-scoped-var": ERROR,
        "consistent-return": OFF,
        "curly": ERROR,
        "default-case": WARN,
        // the dot goes with the property when doing multiline
        "dot-location": [ ERROR, "property" ],
        "dot-notation": ERROR,
        "eqeqeq": [ ERROR, "smart" ],
        "guard-for-in": ERROR,
        "no-alert": WARN,
        "no-caller": ERROR,
        "no-case-declarations": ERROR,
        "no-div-regex": WARN,
        "no-else-return": ERROR,
        "no-labels": ERROR,
        "no-empty-pattern": ERROR,
        "no-eq-null": ERROR,
        "no-eval": ERROR,
        "no-extend-native": ERROR,
        "no-extra-bind": WARN,
        "no-floating-decimal": ERROR,
        "no-implicit-coercion": [ ERROR, {
            boolean: true,
            number: true,
            string: true,
        } ],
        "no-implied-eval": ERROR,
        "no-invalid-this": ERROR,
        "no-iterator": ERROR,
        "no-lone-blocks": WARN,
        "no-loop-func": ERROR,
        "no-magic-numbers": [ OFF, { ignore: [ -1, 0, 1, 200, 404, 500 ] } ],
        "no-multi-spaces": ERROR,
        "no-multi-str": ERROR,
        "no-native-reassign": ERROR,
        "no-new-func": ERROR,
        "no-new-wrappers": ERROR,
        "no-new": ERROR,
        "no-octal-escape": ERROR,
        "no-param-reassign": ERROR,
        "no-process-env": OFF,
        "no-proto": ERROR,
        "no-redeclare": ERROR,
        "no-return-assign": ERROR,
        "no-script-url": ERROR,
        "no-self-compare": ERROR,
        "no-throw-literal": ERROR,
        "no-unused-expressions": [ ERROR, { allowTaggedTemplates: true } ],
        "no-useless-call": ERROR,
        "no-useless-concat": ERROR,
        "no-void": WARN,
        // Produce warnings when something is commented as TODO or FIXME
        "no-warning-comments": [ WARN, {
            terms: [ "TODO", "FIXME" ],
            location: "start",
        } ],
        "no-with": WARN,
        "radix": WARN,
        "vars-on-top": ERROR,
        // Enforces the style of wrapped functions
        "wrap-iife": [ ERROR, "outside" ],
        "yoda": ERROR,

        // Strict Mode - for ES6, never use strict.
        "strict": [ ERROR, "never" ],

        // Variables
        "init-declarations": [ ERROR, "always" ],
        "no-catch-shadow": WARN,
        "no-delete-var": ERROR,
        "no-label-var": ERROR,
        "no-shadow-restricted-names": ERROR,
        "no-shadow": WARN,
        // We require all vars to be initialized (see init-declarations)
        // If we NEED a var to be initialized to undefined, it needs to be explicit
        "no-undef-init": OFF,
        "no-undef": ERROR,
        "no-undefined": OFF,
        "no-unused-vars": OFF,
        // Disallow hoisting - let & const don't allow hoisting anyhow
        "no-use-before-define": ERROR,

        // Node.js and CommonJS
        "callback-return": [ WARN, [ "callback", "next" ] ],
        "global-require": OFF,
        "handle-callback-err": WARN,
        "no-mixed-requires": WARN,
        "no-new-require": ERROR,
        // Use path.concat instead
        "no-path-concat": ERROR,
        "no-process-exit": OFF,
        "no-restricted-modules": OFF,
        "no-sync": WARN,
        "no-console": WARN,
        // ECMAScript 6 support
        "arrow-body-style": [ WARN, "always" ],
        "arrow-parens": [ WARN, "always" ],
        "arrow-spacing": [ ERROR, { before: true, after: true } ],
        "constructor-super": ERROR,
        "generator-star-spacing": [ ERROR, "before" ],
        // "no-arrow-condition": ERROR,
        "no-class-assign": ERROR,
        "no-const-assign": ERROR,
        "no-dupe-class-members": ERROR,
        "no-this-before-super": ERROR,
        "no-var": WARN,
        "object-shorthand": [ OFF, "never" ],
        "prefer-arrow-callback": ERROR,
        "prefer-spread": OFF,
        "prefer-template": ERROR,
        "require-yield": ERROR,

        // Stylistic - everything here is a warning because of style.
        "array-bracket-spacing": [ ERROR, "always" ],
        "block-spacing": [ ERROR, "always" ],
        "brace-style": [ ERROR, "1tbs", { allowSingleLine: false } ],
        // ignore WARN to $gtag
        "camelcase": [ OFF, { allow: [ "event_category", "event_action", "event_label" ] } ],
        "comma-spacing": [ ERROR, { before: false, after: true } ],
        "comma-style": [ ERROR, "last" ],
        "computed-property-spacing": [ ERROR, "never" ],
        "consistent-this": [ WARN, "self" ],
        "eol-last": ERROR,
        "func-names": OFF,
        "no-useless-escape": OFF,
        "func-style": [ OFF, "declaration" ],
        "id-length": [ ERROR, { exceptions: [ "i" ], min: 2, max: 32 } ],
        "indent": [ ERROR, 4 ],
        "jsx-quotes": [ WARN, "prefer-double" ],
        "linebreak-style": [ OFF, "unix" ],
        "lines-around-comment": [ ERROR, { beforeBlockComment: true } ],
        "max-depth": [ ERROR, 8 ],
        "max-len": [ ERROR, 132 ],
        "max-nested-callbacks": [ ERROR, 8 ],
        "max-params": [ ERROR, 8 ],
        "new-cap": [ ERROR, { capIsNewExceptionPattern: "^Selector|^GET_" } ],
        "new-parens": ERROR,
        "no-array-constructor": ERROR,
        "no-bitwise": OFF,
        "no-continue": OFF,
        "no-inline-comments": OFF,
        "no-lonely-if": ERROR,
        "no-mixed-spaces-and-tabs": ERROR,
        "no-multiple-empty-lines": ERROR,
        "no-negated-condition": OFF,
        "no-nested-ternary": ERROR,
        "no-new-object": ERROR,
        "no-plusplus": OFF,
        "no-spaced-func": ERROR,
        "no-ternary": OFF,
        "no-trailing-spaces": [ ERROR, { ignoreComments: true } ],
        "no-underscore-dangle": OFF,
        "no-unneeded-ternary": ERROR,
        "object-curly-spacing": [ WARN, "always" ],
        "one-var": OFF,
        "operator-assignment": [ WARN, "never" ],
        "operator-linebreak": [ ERROR, "after", { overrides: { "?": "ignore", ":": "ignore" } } ],
        "padded-blocks": [ ERROR, "never" ],
        "quote-props": [ WARN, "consistent-as-needed" ],
        "quotes": [ WARN, "double" ],
        "require-jsdoc": [ OFF, {
            require: {
                FunctionDeclaration: true,
                MethodDefinition: true,
                ClassDeclaration: false,
            },
        } ],
        "semi-spacing": [ ERROR, { before: false, after: true } ],
        "semi": [ ERROR, "always" ],
        "sort-vars": OFF,
        "space-before-blocks": [ ERROR, "always" ],
        "space-before-function-paren": [ ERROR, "never" ],
        "keyword-spacing": [ ERROR ],
        "space-in-parens": [ ERROR, "never" ],
        "space-infix-ops": [ ERROR, { int32Hint: true } ],
        "space-unary-ops": ERROR,
        "spaced-comment": [ ERROR, "always" ],
        "wrap-regex": ERROR,
        "comma-dangle": [ WARN, "always-multiline" ],
        // "vue/html-closing-bracket-newline": [ OFF, {
        //     singleline: "never",
        //     multiline: "always",
        // } ],
        // "vue/max-attributes-per-line": [ OFF, {
        //     singleline: {
        //         max: 5,
        //         allowFirstLine: true,
        //     },
        //     multiline: {
        //         max: 1,
        //         allowFirstLine: false,
        //     },
        // } ],
        // "vue/no-multi-spaces": WARN,
        // "vue/array-bracket-spacing": [ WARN, "always", {
        //     singleValue: true,
        //     objectsInArrays: true,
        //     arraysInArrays: true,
        // } ],
        // "vue/no-mutating-props": OFF,
        // "vue/return-in-computed-property": OFF,
        // "vue/no-unused-components": [ "error", {
        //     ignoreWhenBindingPresent: true,
        // } ],
        // "vue/no-unused-vars": OFF,
        // "vue/require-prop-type-constructor": OFF,
        // "vue/valid-v-model": OFF,
        // "vue/no-use-v-if-with-v-for": OFF,
        // "vue/html-indent": [ "error", 4, {
        //     attribute: 1,
        //     baseIndent: 1,
        //     closeBracket: 0,
        //     alignAttributesVertically: true,
        //     ignores: [],
        // } ],
        // "vue/multi-word-component-names": OFF,
        // "vue/no-v-html": OFF,
        // "vue/require-default-prop": OFF,
        "no-prototype-builtins": OFF,
    },
};

