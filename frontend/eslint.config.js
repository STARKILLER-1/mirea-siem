import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';


export default [
    {
        languageOptions: {
            globals: globals.browser
        },
        rules: {
            'indent': [
                'error', 4
            ],
            "no-undef": "off",
            'space-before-function-paren': [
                'error',
                {
                    anonymous: 'never',
                    named: 'never',
                    asyncArrow: 'always',
                },
            ],
            'vue/multi-word-component-names': ['off'],
            'vue/no-use-v-if-with-v-for': 1,
            'vue/require-default-prop': 'off',
            'vue/html-self-closing': [
                'error',
                {
                    html: {
                        void: 'always',
                        normal: 'never',
                        component: 'always',
                    },
                    svg: 'always',
                    math: 'always',
                },
            ],
            'comma-dangle': ['error', 'only-multiline'],
        }},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
];