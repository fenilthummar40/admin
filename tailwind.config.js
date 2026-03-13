// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // IMPORTANT
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'rgba(6, 196, 217, 1)',
                secondary: 'rgba(128, 128, 128, 1)',
                success: 'rgba(108, 166, 81)',
                light: 'rgba(209, 209, 209, 1)',
                info: 'rgba(147, 222, 255, 1)',
                dark: 'rgba(15, 23, 42, 1)',
                white: 'rgba(255, 255, 255, 1)',

                darkMode: 'rgba(15, 23, 42, 0.9)'
            },

            backgroundImage: {
                'primary-gradient':
                    'linear-gradient(135deg, rgba(6,196,217,1) 0%, rgba(0,140,255,1) 100%)',
            },

            fontFamily: {
                barlow: ['Barlow', 'sans-serif'],
                lexend: ['Lexend', 'sans-serif'],
            },

        },
    },
    plugins: [],
};
