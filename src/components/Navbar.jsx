'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '../navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const t = useTranslations('Nav');
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const switchLocale = (newLocale) => {
        router.replace(pathname, { locale: newLocale });
    };

    const navLinks = [
        { href: '#hero', label: t('home') },
        { href: '#about', label: t('about') },
        { href: '#portfolio', label: t('works') },
        { href: '#contact', label: t('contact') },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-transparent ${scrolled ? 'glass py-3 border-white/5' : 'bg-transparent py-6'
                }`}
        >
            <div className="container flex-between">
                <Link href="/" className="group relative z-10">
                    <span className="font-mono text-xl md:text-2xl font-bold tracking-tighter text-white whitespace-nowrap">
                        {t('fullName')}<span className="text-accent animate-pulse">.</span>
                    </span>
                    <div className="absolute -inset-2 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="flex bg-white/5 backdrop-blur-md rounded-full px-2 p-1 border border-white/10">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="px-5 py-2 rounded-full text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 relative group"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-row gap-1 bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10 shrink-0">
                        <button
                            onClick={() => switchLocale('th')}
                            className={`w-9 h-8 rounded-full text-xs font-bold transition-all duration-300 ${pathname.startsWith('/th') || (!pathname.startsWith('/en'))
                                ? 'bg-accent text-slate-900 shadow-lg shadow-accent/20'
                                : 'text-slate-500 hover:text-white'
                                }`}
                        >
                            TH
                        </button>
                        <button
                            onClick={() => switchLocale('en')}
                            className={`w-9 h-8 rounded-full text-xs font-bold transition-all duration-300 ${pathname.startsWith('/en')
                                ? 'bg-accent text-slate-900 shadow-lg shadow-accent/20'
                                : 'text-slate-500 hover:text-white'
                                }`}
                        >
                            EN
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
