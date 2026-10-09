/**
 * Portfolio.jsx — ส่วน 'ผลงาน'
 *
 * ด้านบน: ผลงานเด่น (featured) เป็นการ์ดใหญ่
 * ด้านล่าง: ผลงานอื่นๆ เป็นรายการบรรทัดเดียว กดแล้วกางรายละเอียดออกมาได้
 * รายการผลงาน (ลำดับ, ปี, tech, ลิงก์) มาจาก → src/data/profile.js
 * ชื่องาน + คำอธิบาย 2 ภาษา มาจาก → messages ส่วน 'Portfolio'
 */
import { useTranslations } from 'next-intl';
import { projects } from '@/data/profile';

// แยกผลงานเป็น 2 กลุ่ม ตามค่า featured ใน profile.js
const featuredProjects = projects.filter((p) => p.featured);
const otherProjects = projects.filter((p) => !p.featured);

export default function Portfolio() {
    const t = useTranslations('Portfolio');

    return (
        <section id="portfolio" className="section py-16 md:py-32 bg-[#0a0a19]/50 relative">
            <div className="container relative z-10">
                <div className="text-center mb-10 md:mb-20">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text inline-block">
                        {t('title')}
                    </h2>
                    <div className="h-1 w-24 bg-accent mx-auto rounded-full mt-2"></div>
                </div>

                {/* ผลงานเด่น: การ์ดใหญ่ */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProjects.map((project) => (
                        <article key={project.id} className="glass-card flex flex-col h-full p-7">
                            <div className="flex items-center justify-between mb-4 text-xs font-mono">
                                <span className="text-accent uppercase tracking-wider">{t(`projects.${project.id}.role`)}</span>
                                {project.year && <span className="text-slate-500">{project.year}</span>}
                            </div>

                            <h3 className="text-xl font-bold mb-3 text-white">
                                {t(`projects.${project.id}.title`)}
                            </h3>

                            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                                {t(`projects.${project.id}.desc`)}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.map((tech) => (
                                    <span key={tech} className="chip">{tech}</span>
                                ))}
                            </div>

                            {/* มีลิงก์เว็บจริงเท่านั้น ถึงจะโชว์ปุ่ม 'ดูเว็บไซต์' */}
                            {project.live && (
                                <div className="pt-4 border-t border-white/5 text-sm font-medium">
                                    <ProjectLink href={project.live} label={t('viewProject')} />
                                </div>
                            )}
                        </article>
                    ))}
                </div>

                {/* ผลงานอื่นๆ: รายการแบบย่อ บรรทัดละ 1 งาน (กดเพื่อดูรายละเอียด) */}
                {otherProjects.length > 0 && (
                    <div className="mt-16">
                        <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">
                            {t('otherTitle')}
                        </h3>
                        <ul className="divide-y divide-white/5 border-y border-white/5">
                            {otherProjects.map((project) => (
                                <li key={project.id}>
                                    {/* กดที่แถว → กางรายละเอียดออก / กดอีกที → พับเก็บ */}
                                    <details className="group">
                                        <summary className="py-4 flex flex-col md:flex-row md:items-center gap-1 md:gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-white/[0.02] transition-colors">
                                            <span className="text-white font-medium md:w-80 shrink-0">
                                                {t(`projects.${project.id}.title`)}
                                            </span>
                                            <span className="text-sm text-slate-400 flex-1">
                                                {t(`projects.${project.id}.role`)}
                                            </span>
                                            <span className="flex items-center gap-4">
                                                <span className="text-xs font-mono text-slate-500">{project.year}</span>
                                                {/* ลูกศร: หมุนลงตอนกางออก */}
                                                <span className="text-accent transition-transform duration-300 group-open:rotate-180">▾</span>
                                            </span>
                                        </summary>

                                        {/* รายละเอียดที่ซ่อนไว้: คำอธิบาย + แท็ก + ลิงก์ (ถ้ามี) */}
                                        <div className="pb-5 md:pl-[21.5rem] md:pr-10">
                                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                                {t(`projects.${project.id}.desc`)}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((tech) => (
                                                    <span key={tech} className="chip">{tech}</span>
                                                ))}
                                            </div>
                                            {project.live && (
                                                <div className="mt-4 text-sm font-medium">
                                                    <ProjectLink href={project.live} label={t('viewProject')} />
                                                </div>
                                            )}
                                        </div>
                                    </details>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
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
            className="text-slate-300 hover:text-accent transition-colors"
        >
            {label} ↗
        </a>
    );
}
