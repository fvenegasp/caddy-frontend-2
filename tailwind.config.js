/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const rotateX = plugin(function ({ addUtilities }) {
    addUtilities({
        '.rotate-y-180': {
            transform: 'rotateY(180deg)',
        },
    });
});
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0A1F44',
                    light: '#e6e8ec',
                    'dark-light': 'rgba(10,31,68,.15)',
                },
                secondary: {
                    DEFAULT: '#5BA38F',
                    light: '#eef5f3',
                    'dark-light': 'rgb(91,163,143,.15)',
                },
                support: {
                    DEFAULT: '#1E3A6D',
                    light: '#e8ecf3',
                    'dark-light': 'rgba(30,58,109,.15)',
                },
                neutral: {
                    DEFAULT: '#E5E5E5',
                    light: '#fcfcfc',
                    'dark-light': 'rgba(229,229,229,.15)',
                },
                success: {
                    DEFAULT: '#00ab55',
                    light: '#ddf5f0',
                    'dark-light': 'rgba(0,171,85,.15)',
                },
                danger: {
                    DEFAULT: '#e7515a',
                    light: '#fff5f5',
                    'dark-light': 'rgba(231,81,90,.15)',
                },
                warning: {
                    DEFAULT: '#e2a03f',
                    light: '#fff9ed',
                    'dark-light': 'rgba(226,160,63,.15)',
                },
                info: {
                    DEFAULT: '#2196f3',
                    light: '#e7f7ff',
                    'dark-light': 'rgba(33,150,243,.15)',
                },
                dark: {
                    DEFAULT: '#0A1F44',
                    light: '#eaeaec',
                    'dark-light': 'rgba(10,31,68,.15)',
                },
                black: {
                    DEFAULT: '#0A1F44',
                    light: '#e3e4eb',
                    'dark-light': 'rgba(10,31,68,.15)',
                },
                white: {
                    DEFAULT: '#ffffff',
                    light: '#E5E5E5',
                    dark: '#1E3A6D',
                },
            },
            fontFamily: {
                nunito: ['Nunito', 'sans-serif'],
            },
            spacing: {
                4.5: '18px',
            },
            boxShadow: {
                '3xl': '0 2px 2px rgb(229 229 229 / 46%), 1px 6px 7px rgb(229 229 229 / 46%)',
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-invert-headings': theme('colors.white.dark'),
                        '--tw-prose-invert-links': theme('colors.white.dark'),
                        h1: {
                            fontSize: '40px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        h2: {
                            fontSize: '32px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        h3: {
                            fontSize: '28px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        h4: {
                            fontSize: '24px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        h5: {
                            fontSize: '20px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        h6: {
                            fontSize: '16px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        p: { marginBottom: '0.5rem' },
                        li: { margin: 0 },
                        img: { margin: 0 },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
        require('@tailwindcss/typography'),
        rotateX,
    ],
};
