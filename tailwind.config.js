/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const { nextui } = require('@nextui-org/theme');

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js',
    ],
    theme: {
        extend: {},
        // extend: { colors: { waring: { 500: '#F9C809' } } },
    },
    darkMode: 'class',
    plugins: [
        nextui({
            addCommonColors: true,
            themes: {
                light: {
                    colors: {
                        warning: {
                            DEFAULT: '#F9C809',
                            foreground: '#000000',
                        },
                        focus: '#F9C809',
                    },
                },
            },
        }),
    ],
};
