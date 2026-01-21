'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Hero() {
    const t = useTranslations('Hero');
    const [text, setText] = useState('');
    const fullText = t('role');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setText((prev) => prev + fullText.charAt(index));
                setIndex((prev) => prev + 1);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [index, fullText]);

    // Reset typing effect when language changes
    useEffect(() => {
        setText('');
        setIndex(0);
    }, [fullText]);

    return (
        <section id="hero" className="section flex-center min-h-screen relative overflow-hidden pt-32">
            {/* Cyberpunk Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.9)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

            <div className="container relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Text Content (Left) */}
                <div className="text-content order-2 lg:order-1 animate-fade-in-up relative">
                    {/* Decorative Tech Lines */}
                    <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-accent/50 to-transparent hidden lg:block"></div>
                    <div className="absolute -left-8 top-10 w-4 h-[1px] bg-accent hidden lg:block shadow-[0_0_10px_var(--accent)]"></div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-accent/30 bg-accent/10 text-accent text-sm font-mono mb-6 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                        SYSTEM ONLINE
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold mb-4 tracking-tight leading-tight">
                        {t('greeting')} <br />
                        <span className="text-white relative inline-block">
                            {t('name')}
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-accent transform scale-x-0 animate-slide-in-right origin-left"></span>
                        </span>
                    </h1>

                    <h2 className="text-2xl lg:text-3xl text-slate-400 mb-8 font-mono h-8 flex items-center">
                        <span className="text-accent mr-2">{'>'}</span>
                        {text}<span className="animate-blink ml-1 w-3 h-6 bg-accent block"></span>
                    </h2>

                    <p className="text-slate-400 text-lg leading-relaxed max-w-xl mb-10 border-l-2 border-slate-700 pl-6">
                        {t('description')}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a href="#portfolio" className="btn btn-primary group relative overflow-hidden">
                            <span className="relative z-10">{t('cta')}</span>
                        </a>
                        <a href="#contact" className="btn btn-outline group">
                            <span className="group-hover:text-accent transition-colors">{t('contact')}</span>
                        </a>
                    </div>
                </div>

                {/* Cyber Visual (Right) */}
                <div className="visual order-1 lg:order-2 flex justify-center lg:justify-end relative">
                    <div className="relative w-[180px] h-[180px] lg:w-[240px] lg:h-[240px]">
                        {/* Holographic Rings */}
                        <div className="absolute inset-[-15px] rounded-full border border-slate-700/50 animate-spin-slow-reverse"></div>
                        <div className="absolute inset-[-8px] rounded-full border border-dashed border-accent/30 animate-spin-slow"></div>

                        {/* Scanning Effect Container */}
                        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-slate-800/50 backdrop-blur-sm group">
                            {/* Image */}
                            <img
                                src="/LINE_ALBUM_161268_260107_1.jpg"
                                alt="Hirun Profile"
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />

                            {/* Tech Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/50 shadow-[0_0_15px_var(--accent)] animate-scan"></div>

                            {/* Corner Accents */}
                            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-accent"></div>
                            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-accent"></div>
                        </div>

                        {/* Floating Data Cards */}
                        <div className="absolute -right-12 top-10 glass px-4 py-2 rounded-lg border-l-4 border-blue-500 animate-float hidden lg:block">
                            <span className="text-xs font-mono text-blue-400 block">STATUS</span>
                            <span className="text-sm font-bold text-white">AVAILABLE</span>
                        </div>
                        <div className="absolute -left-12 bottom-10 glass px-4 py-2 rounded-lg border-l-4 border-purple-500 animate-float-delayed hidden lg:block">
                            <span className="text-xs font-mono text-purple-400 block">ROLE</span>
                            <span className="text-sm font-bold text-white">AI ENGINEER</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
