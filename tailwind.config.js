/** @type {import('tailwindcss').Config} */
// ตั้งค่าหน้าตาหลักของเว็บ: สี + ฟอนต์ + อนิเมชันที่ใช้
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // พื้นหลังโทนมืด
                background: {
                    primary: "#0a0b0f",   // พื้นหลังหลัก
                    secondary: "#111318", // พื้นหลังส่วนที่สลับสี
                },
                // สีเน้น ใช้สีเดียวทั้งเว็บ
                accent: {
                    DEFAULT: "#38bdf8",
                },
            },
            fontFamily: {
                // อังกฤษใช้ Inter / ไทยใช้ IBM Plex Sans Thai (Inter ไม่มีตัวอักษรไทย)
                sans: ['Inter', '"IBM Plex Sans Thai"', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.7s ease-out both',
            },
            keyframes: {
                fadeInUp: {
                    'from': { opacity: '0', transform: 'translateY(16px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};
