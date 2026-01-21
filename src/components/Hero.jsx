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
        <section id="hero" className="section flex-center min-h-screen relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/10 to-transparent opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 30%, rgba(56, 189, 248, 0.15), transparent 60%)' }}></div>

            <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div className="text-content animate-fade-in">
                    <p className="mono text-accent mb-4">{t('greeting')}</p>
                    <h1 className="mb-2">{t('name')}</h1>
                    <h2 className="mb-6 h-16 flex items-center text-slate-300">
                        {text}<span className="cursor-blink">|</span>
                    </h2>
                    <p className="text-secondary max-w-lg mb-8 text-lg">
                        {t('description')}
                    </p>
                    <div className="flex gap-4 mt-8">
                        <a href="#portfolio" className="btn btn-primary">
                            {t('cta')}
                        </a>
                        <a href="#contact" className="btn btn-outline">
                            {t('contact')}
                        </a>
                    </div>
                </div>

                {/* Profile Image & Visual */}
                <div className="visual flex-center relative">
                    {/* Background Glow/Decor */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent to-accent-secondary blur-[80px] opacity-40 rounded-full animate-pulse-slow"></div>

                    {/* Rotating Rings */}
                    {/* Rotating Rings */}
                    <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full animate-spin-slow"></div>
                    <div className="absolute w-[400px] h-[400px] border border-accent/10 rounded-full animate-reverse-spin"></div>
                    <div className="absolute w-[300px] h-[300px] border border-white/10 rounded-full animate-spin-slow" style={{ animationDuration: '15s' }}></div>

                    {/* Image Container */}
                    <div className="relative w-[220px] h-[220px] rounded-full p-2 border border-accent/30 bg-white/5 backdrop-blur-sm overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.3)]">
                        <img
                            src="/LINE_ALBUM_161268_260107_1.jpg"
                            alt="Hirun Chatcharoensawat"
                            className="w-full h-full object-cover rounded-full opacity-90 hover:opacity-100 transition-opacity duration-500 hover:scale-105 transform"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
