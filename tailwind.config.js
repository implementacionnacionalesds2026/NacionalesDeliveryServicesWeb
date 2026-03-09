/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1B3FA0',
                    dark: '#142d7a',
                    light: '#2B52C8',
                },
                accent: {
                    DEFAULT: '#3EC6E0',
                    dark: '#1AAFC8',
                    light: '#7DDFF0',
                },
                brand: {
                    bg: '#F0F4FF',
                    dark: '#0F1C4D',
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
                'slide-in-right': 'slideInRight 0.6s ease-out forwards',
                'fade-up': 'fadeUp 0.6s ease-out forwards',
                'spin-slow': 'spin 8s linear infinite',
                'marquee': 'marquee 25s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(62,198,224,0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(62,198,224,0.7)' },
                },
                slideInLeft: {
                    from: { opacity: '0', transform: 'translateX(-40px)' },
                    to: { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    from: { opacity: '0', transform: 'translateX(40px)' },
                    to: { opacity: '1', transform: 'translateX(0)' },
                },
                fadeUp: {
                    from: { opacity: '0', transform: 'translateY(30px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
            boxShadow: {
                'glow': '0 0 30px rgba(62,198,224,0.4)',
                'glow-primary': '0 0 30px rgba(27,63,160,0.4)',
                'card': '0 10px 40px rgba(15,28,77,0.12)',
                'card-hover': '0 20px 60px rgba(15,28,77,0.2)',
            },
        },
    },
    plugins: [],
}
