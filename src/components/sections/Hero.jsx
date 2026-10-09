'use client'; // ทำงานบนเบราว์เซอร์ เพราะมีเอฟเฟกต์พิมพ์ข้อความ

/**
 * Hero.jsx — ส่วนแรกของเว็บ
 *
 * ซ้าย: คำทักทาย + ชื่อ + ตำแหน่ง (พิมพ์ทีละตัว) + ปุ่ม
 * ขวา: รูปโปรไฟล์ + ป้ายตัวเลข (ปีประสบการณ์ / จำนวนผลงาน)
 * ข้อความมาจาก → messages ส่วน 'Hero'
 * รูปมาจาก → public/profile.jpg
 */

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { resumeFile, projects } from '@/data/profile';

export default function Hero() {
    const t = useTranslations('Hero');
    const [text, setText] = useState('');
    const fullText = t('role');
    const [index, setIndex] = useState(0);

    // เอฟเฟกต์พิมพ์ข้อความ: เติมทีละ 1 ตัวอักษร ทุก 0.1 วินาที
    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setText((prev) => prev + fullText.charAt(index));
                setIndex((prev) => prev + 1);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [index, fullText]);

    // เปลี่ยนภาษา → เริ่มพิมพ์ใหม่ตั้งแต่ต้น
    useEffect(() => {
        setText('');
        setIndex(0);
    }, [fullText]);

    return (
        <section id="hero" className="section flex-center min-h-screen relative overflow-hidden pt-32">
            <div className="container relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-24 items-center">
                {/* ฝั่งซ้าย: ข้อความ */}
                <div className="text-content order-2 lg:order-1 animate-fade-in-up relative text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 md:mb-12 tracking-tight leading-tight">
                        {t('greeting')} <br />
                        <span className="text-white relative inline-block">
                            {t('name')}
                            <span className="absolute -bottom-3 md:-bottom-5 left-0 w-full h-1 bg-accent transform scale-x-0 animate-slide-in-right origin-left"></span>
                        </span>
                    </h1>

                    <h2 className="text-lg md:text-xl lg:text-2xl text-slate-400 mb-8 font-mono min-h-8 flex items-center justify-center lg:justify-start">
                        <span className="text-accent mr-2">{'>'}</span>
                        {text}<span className="animate-blink ml-1 w-3 h-6 bg-accent block"></span>
                    </h2>

                    <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mb-8 md:mb-10 border-l-2 border-slate-700 pl-6 mx-auto lg:mx-0 text-left">
                        {t('description')}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        <a href="#portfolio" className="btn btn-primary">
                            {t('cta')}
                        </a>
                        {/* ปุ่มดาวน์โหลด CV (ไฟล์ตั้งไว้ใน profile.js) */}
                        <a href={resumeFile} download className="btn btn-outline">
                            {t('resume')}
                        </a>
                    </div>
                </div>

                {/* ฝั่งขวา: รูปโปรไฟล์ + ของตกแต่ง */}
                <div className="visual order-1 lg:order-2 flex justify-center lg:justify-end relative">
                    <div className="relative w-[200px] h-[200px] lg:w-[280px] lg:h-[280px] lg:mr-12">
                        {/* แสงฟุ้งด้านหลังรูป */}
                        <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-accent/25 via-purple-500/15 to-transparent blur-3xl pointer-events-none"></div>

                        {/* วงแหวนหมุนรอบรูป */}
                        <div className="absolute inset-[-18px] rounded-full border border-slate-700/50 animate-spin-slow-reverse"></div>
                        <div className="absolute inset-[-9px] rounded-full border border-dashed border-accent/30 animate-spin-slow"></div>

                        {/* กรอบรูป (ขอบไล่สีฟ้า-ม่วง) */}
                        <div className="relative w-full h-full rounded-3xl p-[2px] bg-gradient-to-br from-accent/70 via-white/10 to-purple-500/70 shadow-[0_20px_60px_-15px_rgba(56,189,248,0.35)]">
                            <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-slate-800 group">
                                <img
                                    src="/profile.jpg"
                                    alt={t('name')}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* เงาด้านล่างรูป + เส้นสแกนวิ่งขึ้นลง */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                                <div className="absolute top-0 left-0 w-full h-px bg-accent/40 shadow-[0_0_10px_var(--accent)] animate-scan"></div>

                                {/* มุมกรอบสีฟ้า */}
                                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-accent rounded-tl"></div>
                                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-accent rounded-br"></div>
                            </div>
                        </div>

                        {/* ป้ายตัวเลขลอยๆ (จอใหญ่เท่านั้น มือถือซ่อน) */}
                        <StatCard
                            className="-right-14 top-8 animate-float"
                            tone="blue"
                            icon={<BriefcaseIcon />}
                            value="1.5+"
                            label={t('stats_years')}
                        />
                        <StatCard
                            className="-left-14 bottom-8 animate-float-delayed"
                            tone="purple"
                            icon={<LayersIcon />}
                            value={projects.length} // นับจำนวนผลงานใน profile.js ให้อัตโนมัติ
                            label={t('stats_projects')}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

// สีของป้ายตัวเลข: ฟ้า / ม่วง
const STAT_TONES = {
    blue: 'border-blue-400/30 shadow-[0_10px_30px_-10px_rgba(59,130,246,0.6)] [&_.stat-icon]:bg-blue-500/15 [&_.stat-icon]:text-blue-300',
    purple: 'border-purple-400/30 shadow-[0_10px_30px_-10px_rgba(168,85,247,0.6)] [&_.stat-icon]:bg-purple-500/15 [&_.stat-icon]:text-purple-300',
};

// ป้ายตัวเลข 1 อัน = ไอคอน + ตัวเลข + คำอธิบาย
function StatCard({ className, tone, icon, value, label }) {
    return (
        <div className={`absolute z-10 hidden lg:flex items-center gap-3 pl-2.5 pr-4 py-2.5 rounded-2xl bg-[#0b0b1d]/80 backdrop-blur-xl border ${STAT_TONES[tone]} ${className}`}>
            <div className="stat-icon w-9 h-9 rounded-xl flex items-center justify-center">
                {icon}
            </div>
            <div>
                <div className="text-xl font-bold text-white leading-none">{value}</div>
                <div className="text-[11px] text-slate-400 mt-1 whitespace-nowrap">{label}</div>
            </div>
        </div>
    );
}

// ไอคอนกระเป๋า (ใช้กับป้าย 'ปีประสบการณ์')
function BriefcaseIcon() {
    return (
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M3 13h18" />
        </svg>
    );
}

// ไอคอนกองซ้อน (ใช้กับป้าย 'ผลงาน')
function LayersIcon() {
    return (
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3 2 8l10 5 10-5-10-5Z" />
            <path d="m2 13 10 5 10-5" />
            <path d="m2 18 10 5 10-5" />
        </svg>
    );
}
