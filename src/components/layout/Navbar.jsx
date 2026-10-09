'use client'; // ไฟล์นี้ทำงานบนเบราว์เซอร์ เพราะมีปุ่มให้กด

/**
 * Navbar.jsx — เมนูด้านบนของเว็บ
 *
 * มี: โลโก้, ลิงก์ไปแต่ละส่วน, ปุ่มสลับภาษา TH/EN และเมนูแบบมือถือ (ปุ่ม ☰)
 * ข้อความเมนูมาจาก → messages ส่วน 'Nav'
 */

import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function Navbar() {
    const t = useTranslations('Nav');
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);             // เลื่อนจอลงมาแล้วหรือยัง
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // เมนูมือถือเปิดอยู่ไหม

    // พอเลื่อนลงเกิน 50px → เมนูเปลี่ยนเป็นพื้นทึบ อ่านง่ายขึ้น
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // กดปุ่ม TH / EN → เปลี่ยนภาษา แต่อยู่หน้าเดิม
    const switchLocale = (newLocale) => {
        router.replace(pathname, { locale: newLocale });
        setMobileMenuOpen(false);
    };

    // ลิงก์เมนู → กดแล้วเลื่อนไปยังส่วนนั้นในหน้า (#about, #portfolio, ...)
    const navLinks = [
        { href: '#hero', label: t('home') },
        { href: '#about', label: t('about') },
        { href: '#portfolio', label: t('works') },
        { href: '#contact', label: t('contact') },
    ];

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
            <div className="container flex items-center justify-between">
                <Link href="/" className="text-2xl font-extrabold tracking-tight relative z-50">
                    <span className="font-mono text-xl mr-1 text-accent">&lt;</span>
                    <span className="gradient-text">Hirun.</span>
                    <span className="font-mono text-xl ml-1 text-accent">/&gt;</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex bg-white/5 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="px-5 py-2 rounded-full text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex gap-1 p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10 relative">
                        <LanguageButtons
                            current={locale}
                            onSelect={switchLocale}
                            className="w-8 h-8 rounded-full text-xs font-bold transition-all flex items-center justify-center"
                            activeClassName="bg-accent text-black shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                            inactiveClassName="text-slate-500 hover:text-white"
                        />
                    </div>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className="md:hidden relative z-50 p-2 text-slate-300 hover:text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <div className="w-6 h-5 flex flex-col justify-between">
                        <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                    </div>
                </button>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-[#050511]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <nav className="flex flex-col items-center gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-bold text-slate-300 hover:text-accent transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="w-12 h-[1px] bg-white/10"></div>

                    <div className="flex gap-4">
                        <LanguageButtons
                            current={locale}
                            onSelect={switchLocale}
                            className="px-4 py-2 rounded-full text-sm font-bold border transition-all"
                            activeClassName="border-accent text-accent bg-accent/10"
                            inactiveClassName="border-white/10 text-slate-400"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}

// ปุ่ม TH / EN (ใช้ทั้งเมนูจอใหญ่และเมนูมือถือ แค่หน้าตาต่างกัน)
function LanguageButtons({ current, onSelect, className, activeClassName, inactiveClassName }) {
    return routing.locales.map((locale) => (
        <button
            key={locale}
            onClick={() => onSelect(locale)}
            className={`${className} ${current === locale ? activeClassName : inactiveClassName}`}
        >
            {locale.toUpperCase()}
        </button>
    ));
}
