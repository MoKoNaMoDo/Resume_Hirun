'use client'; // ไฟล์นี้ทำงานบนเบราว์เซอร์ เพราะมีปุ่มให้กด

/**
 * Navbar.jsx — เมนูด้านบนของเว็บ
 *
 * มี: ชื่อ (กดแล้วกลับขึ้นบนสุด), ลิงก์ไปแต่ละส่วน, ปุ่มสลับภาษา EN/TH และเมนูแบบมือถือ (ปุ่ม ☰)
 * ข้อความเมนูมาจาก → messages ส่วน 'Nav'
 */

import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function Navbar() {
    const t = useTranslations('Nav');
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);             // เลื่อนจอลงมาแล้วหรือยัง
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // เมนูมือถือเปิดอยู่ไหม

    // พอเลื่อนลงเกิน 20px → เมนูมีพื้นหลัง อ่านง่ายขึ้น
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // กดปุ่ม EN / TH → เปลี่ยนภาษา แต่อยู่หน้าเดิม
    const switchLocale = (newLocale) => {
        router.replace(pathname, { locale: newLocale });
        setMobileMenuOpen(false);
    };

    // ลิงก์เมนู → กดแล้วเลื่อนไปยังส่วนนั้นในหน้า
    const navLinks = [
        { href: '#experience', label: t('experience') },
        { href: '#portfolio', label: t('projects') },
        { href: '#skills', label: t('skills') },
        { href: '#contact', label: t('contact') },
    ];

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
            <div className="container flex items-center justify-between">
                {/* ชื่อ / โลโก้ */}
                <a href="#hero" className="relative z-50 text-base font-semibold text-white tracking-tight">
                    Hirun<span className="text-accent">.</span>
                </a>

                {/* เมนูจอใหญ่ */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-7">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm text-slate-400 hover:text-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-1 text-xs font-medium border-l border-white/10 pl-6">
                        <LanguageButtons
                            current={locale}
                            onSelect={switchLocale}
                            className="px-2 py-1 rounded transition-colors"
                            activeClassName="text-white"
                            inactiveClassName="text-slate-500 hover:text-slate-300"
                        />
                    </div>
                </div>

                {/* ปุ่ม ☰ เมนูมือถือ */}
                <button
                    className="md:hidden relative z-50 p-2 text-slate-300 hover:text-white"
                    aria-label="Menu"
                    aria-expanded={mobileMenuOpen}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <div className="w-5 h-4 flex flex-col justify-between">
                        <span className={`w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
                        <span className={`w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
                    </div>
                </button>

                {/* เมนูมือถือ (เต็มจอ) */}
                <div className={`fixed inset-0 bg-background-primary/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <div className="flex flex-col items-center gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-semibold text-slate-200 hover:text-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="w-12 h-px bg-white/10"></div>

                    <div className="flex gap-3">
                        <LanguageButtons
                            current={locale}
                            onSelect={switchLocale}
                            className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
                            activeClassName="border-white/40 text-white"
                            inactiveClassName="border-white/10 text-slate-400"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}

// ปุ่ม EN / TH (ใช้ทั้งเมนูจอใหญ่และเมนูมือถือ แค่หน้าตาต่างกัน)
function LanguageButtons({ current, onSelect, className, activeClassName, inactiveClassName }) {
    return routing.locales.map((locale) => (
        <button
            key={locale}
            onClick={() => onSelect(locale)}
            aria-pressed={current === locale}
            className={`${className} ${current === locale ? activeClassName : inactiveClassName}`}
        >
            {locale.toUpperCase()}
        </button>
    ));
}
