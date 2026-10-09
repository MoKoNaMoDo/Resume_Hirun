/**
 * Hero.jsx — ส่วนแรกของเว็บ
 *
 * ซ้าย: ตำแหน่ง + ชื่อ + ประโยคแนะนำตัว + ปุ่ม 2 ปุ่ม + แถวตัวเลขสรุป
 * ขวา: รูปโปรไฟล์ (กรอบเรียบๆ)
 *
 * ข้อความมาจาก → messages ส่วน 'Hero'
 * รูปมาจาก → public/profile.jpg
 * ตัวเลขจำนวนผลงาน นับจาก → src/data/profile.js ให้อัตโนมัติ
 */
import { useTranslations } from 'next-intl';
import { resumeFile, projects } from '@/data/profile';

// ประสบการณ์ทำงานรวม (นับจากประวัติการทำงาน ~21 เดือน)
const YEARS_OF_EXPERIENCE = '1.5+';

export default function Hero() {
    const t = useTranslations('Hero');
    const clientProjects = projects.filter((p) => p.category === 'client').length;

    // แถวตัวเลขสรุปใต้ปุ่ม
    const stats = [
        { value: YEARS_OF_EXPERIENCE, label: t('stats_years') },
        { value: clientProjects, label: t('stats_client') },
        { value: projects.length, label: t('stats_projects') },
    ];

    return (
        <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-16">
            <div className="container grid lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-16 items-center">
                {/* ฝั่งซ้าย: ข้อความ */}
                <div className="order-2 lg:order-1 animate-fade-in-up">
                    {/* ตำแหน่ง */}
                    <p className="flex items-center gap-2 font-mono text-xs text-slate-400 uppercase tracking-[0.2em] mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        {t('eyebrow')}
                    </p>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                        {t('name')}
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl mb-10">
                        {t('description')}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-12">
                        <a href="#portfolio" className="btn btn-primary">
                            {t('cta')} →
                        </a>
                        {/* ปุ่มดาวน์โหลด CV (ไฟล์ตั้งไว้ใน profile.js) */}
                        <a href={resumeFile} download className="btn btn-outline">
                            {t('resume')}
                        </a>
                    </div>

                    {/* แถวตัวเลขสรุป */}
                    <dl className="grid grid-cols-3 gap-6 max-w-md border-t border-white/[0.08] pt-6">
                        {stats.map((s) => (
                            <div key={s.label}>
                                <dt className="sr-only">{s.label}</dt>
                                <dd className="text-2xl md:text-3xl font-bold text-white tabular-nums">{s.value}</dd>
                                <dd className="text-xs text-slate-500 mt-1 leading-snug">{s.label}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* ฝั่งขวา: รูปโปรไฟล์ */}
                <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                    <div className="relative w-64 sm:w-72 lg:w-full lg:max-w-sm aspect-[4/5]">
                        {/* แสงฟุ้งจางๆ ด้านหลัง */}
                        <div className="absolute -inset-6 rounded-[2rem] bg-accent/10 blur-3xl pointer-events-none"></div>
                        <img
                            src="/profile.jpg"
                            alt={t('name')}
                            className="relative w-full h-full object-cover rounded-2xl border border-white/10"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
