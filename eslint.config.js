import htmlParser from "@html-eslint/parser";
import accessibilityRules from './accessibility-rules/index.js';

export default [
    {
        files: ["**/*.html"],
        ignores: ["**/*.js"], // Exclude all .js files
        plugins: {
            'accessibility-rules': accessibilityRules,
        },
        rules: {
            'accessibility-rules/require-table-th': 'error',
        },
        languageOptions: {
            parser: htmlParser,
            parserOptions: {
                allowInvalidAST: true,
            }
        },
    },
    {
        ignores: ["**/*.js"], // Exclude all .js files
    },
];