'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '../navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const t = useTranslations('Nav');
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Get current locale from URL path to determine active state correctly
    // If we are using next-intl, pathname usually doesn't include the locale for the default locale
    // unless we configured it otherwise. But typically we rely on the router or params.
    // A simpler way is to check the current window location or use a reliable hook if available.
    // However, for visual switching, we can track the active state locally or derive it.
    // Updated solution: Let's assume 'th' is default if not specified in path for now, 
    // or check if path starts with /en.

    // Actually, next-intl usePathname returns path WITHOUT locale.
    // We need to know the current locale. We can pass it as a prop from layout or parse it.
    // But a client component inside [locale] layout can't easily access params unless passed.
    // Workaround: Check window.location in useEffect, or simply rely on the fact that 
    // we are redirecting to specific paths.

    // Better approach: Since we can't easily get locale in client component without props,
    // let's rely on the cookie or the URL modification. 
    // BUT, the easiest fix for the visual toggle is using `useSelectedLayoutSegments` or getting locale from props.
    // Let's try to parse the actual window URL for robustness in this simple static-like export.

    const [currentLocale, setCurrentLocale] = useState('th');

    useEffect(() => {
        // Check if URL contains /en/
        if (window.location.pathname.startsWith('/en')) {
            setCurrentLocale('en');
        } else {
            setCurrentLocale('th');
        }
    }, [pathname]);

    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const switchLocale = (newLocale) => {
        setCurrentLocale(newLocale);
        router.replace(pathname, { locale: newLocale });
    };

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

                    {/* Language Switcher */}
                    <div className="flex gap-1 p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10 relative">
                        <button
                            onClick={() => switchLocale('th')}
                            className={`w-8 h-8 rounded-full text-xs font-bold transition-all flex items-center justify-center ${currentLocale === 'th' ? 'bg-accent text-black shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'text-slate-500 hover:text-white'}`}
                        >
                            TH
                        </button>
                        <button
                            onClick={() => switchLocale('en')}
                            className={`w-8 h-8 rounded-full text-xs font-bold transition-all flex items-center justify-center ${currentLocale === 'en' ? 'bg-accent text-black shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'text-slate-500 hover:text-white'}`}
                        >
                            EN
                        </button>
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
                        <button
                            onClick={() => { switchLocale('th'); setMobileMenuOpen(false); }}
                            className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${currentLocale === 'th' ? 'border-accent text-accent bg-accent/10' : 'border-white/10 text-slate-400'}`}
                        >
                            TH
                        </button>
                        <button
                            onClick={() => { switchLocale('en'); setMobileMenuOpen(false); }}
                            className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${currentLocale === 'en' ? 'border-accent text-accent bg-accent/10' : 'border-white/10 text-slate-400'}`}
                        >
                            EN
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
