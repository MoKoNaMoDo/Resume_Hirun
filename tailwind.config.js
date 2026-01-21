/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    primary: "#050511",
                    secondary: "#0f1123",
                    tertiary: "#1a1d35",
                },
                accent: {
                    DEFAULT: "#38bdf8",
                    secondary: "#a855f7",
                    glow: "rgba(56, 189, 248, 0.6)",
                },
            },
            fontFamily: {
                sans: ['var(--font-outfit)', 'sans-serif'],
                mono: ['var(--font-jetbrains-mono)', 'monospace'],
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
                'spin-slow-reverse': 'spin 25s linear infinite reverse',
                'scan': 'scan 3s linear infinite',
                'blink': 'blink 1s step-end infinite',
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out infinite 3s',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'slide-in-right': 'slideInRight 0.8s ease-out forwards 0.5s',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
            },
            keyframes: {
                scan: {
                    '0%': { top: '0%', opacity: '0' },
                    '10%': { opacity: '1' },
                    '90%': { opacity: '1' },
                    '100%': { top: '100%', opacity: '0' },
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                slideInRight: {
                    'from': { transform: 'scaleX(0)' },
                    'to': { transform: 'scaleX(1)' },
                },
                fadeInUp: {
                    'from': { opacity: '0', transform: 'translateY(20px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                }
            },
        },
    },
    plugins: [],
};
