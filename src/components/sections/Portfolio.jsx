'use client'; // ทำงานบนเบราว์เซอร์ เพราะมีแท็บให้กดเลือกหมวด

/**
 * Portfolio.jsx — ส่วน 'ผลงาน'
 *
 * แท็บด้านบน: เลือกดูตามหมวด (ทั้งหมด / งานบริษัท / AI & Data / ส่วนตัว)
 * ผลงานทุกชิ้นเป็นการ์ด เรียงผลงานเด่น (featured) ขึ้นก่อน
 * รายการผลงาน (ลำดับ, ปี, tech, ลิงก์) มาจาก → src/data/profile.js
 * ชื่องาน + คำอธิบาย 2 ภาษา มาจาก → messages ส่วน 'Portfolio'
 * ท้ายส่วน: กราฟ GitHub (ส่งเข้ามาจาก page.jsx เพราะต้องดึงข้อมูลฝั่ง server)
 */
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { projects, projectCategories } from '@/data/profile';
import SectionHeader from '@/components/layout/SectionHeader';

// children = ส่วนเสริมท้ายผลงาน (ตอนนี้คือกราฟ GitHub ส่งมาจาก page.jsx)
export default function Portfolio({ children }) {
    const t = useTranslations('Portfolio');
    const tSection = useTranslations('Sections');
    const [category, setCategory] = useState('all'); // แท็บที่เลือกอยู่

    // กรองผลงานตามแท็บที่เลือก แล้วเรียงผลงานเด่นขึ้นก่อน (ที่เหลือเรียงตามลำดับใน profile.js)
    const visible = category === 'all' ? projects : projects.filter((p) => p.category === category);
    const sortedProjects = [...visible.filter((p) => p.featured), ...visible.filter((p) => !p.featured)];

    return (
        <section id="portfolio" className="py-20 md:py-28 border-t border-white/[0.06] bg-background-secondary">
            <div className="container">
                <SectionHeader
                    index="02"
                    eyebrow={tSection('projects_eyebrow')}
                    title={tSection('projects_title')}
                    subtitle={tSection('projects_subtitle')}
                />

                {/* แท็บหมวดหมู่: กดแล้วเหลือเฉพาะผลงานในหมวดนั้น */}
                <div className="flex flex-wrap gap-2 mb-8" role="tablist">
                    {projectCategories.map((key) => {
                        const count = key === 'all' ? projects.length : projects.filter((p) => p.category === key).length;
                        const active = category === key;
                        return (
                            <button
                                key={key}
                                role="tab"
                                aria-selected={active}
                                onClick={() => setCategory(key)}
                                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border transition-colors ${active ? 'bg-white text-black border-white' : 'border-white/10 text-slate-400 hover:text-white hover:border-white/30'}`}
                            >
                                {t(`categories.${key}`)} <span className={`ml-1 tabular-nums ${active ? 'text-black/50' : 'text-slate-600'}`}>{count}</span>
                            </button>
                        );
                    })}
                </div>

                {/* การ์ดผลงานทั้งหมดในหมวดที่เลือก */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {sortedProjects.map((project) => (
                        <article key={project.id} className="card flex flex-col h-full p-6">
                            <div className="flex items-center justify-between gap-3 mb-4 text-xs">
                                <span className="text-accent font-medium">{t(`projects.${project.id}.role`)}</span>
                                {project.year && <span className="font-mono text-slate-500">{project.year}</span>}
                            </div>

                            <h3 className="text-lg font-semibold mb-3 text-white leading-snug">
                                {t(`projects.${project.id}.title`)}
                            </h3>

                            <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                                {t(`projects.${project.id}.desc`)}
                            </p>

                            <div className="flex flex-wrap gap-1.5">
                                {project.tech.map((tech) => (
                                    <span key={tech} className="chip">{tech}</span>
                                ))}
                            </div>

                            {/* มีลิงก์เว็บจริงเท่านั้น ถึงจะโชว์ปุ่ม 'ดูเว็บไซต์' */}
                            {project.live && (
                                <div className="mt-5 pt-4 border-t border-white/[0.06] text-sm font-medium">
                                    <ProjectLink href={project.live} label={t('viewProject')} />
                                </div>
                            )}
                        </article>
                    ))}
                </div>

                {/* ส่วนเสริมท้ายผลงาน: กราฟกิจกรรม GitHub */}
                {children}
            </div>
        </section>
    );
}

// ปุ่มลิงก์ไปเว็บจริง (เปิดแท็บใหม่)
function ProjectLink({ href, label }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-accent transition-colors"
        >
            {label} ↗
        </a>
    );
}
