/**
 * Skills.jsx — ส่วน 'ทักษะ' + การศึกษา + ใบรับรอง
 *
 * ซ้าย: ทักษะแยกตามหมวด (ภาษา / Frontend / Backend / AI / เครื่องมือ)
 * ขวา: การศึกษา + ใบรับรอง
 *
 * รายการทักษะ / ใบรับรอง มาจาก → src/data/profile.js
 * ชื่อหมวด + การศึกษา 2 ภาษา มาจาก → messages ส่วน 'About'
 */
import { useTranslations } from 'next-intl';
import { skillCategories, educationKeys, certificates } from '@/data/profile';
import SectionHeader from '@/components/layout/SectionHeader';

export default function Skills() {
    const t = useTranslations('About');
    const tSection = useTranslations('Sections');

    return (
        <section id="skills" className="py-20 md:py-28 border-t border-white/[0.06]">
            <div className="container">
                <SectionHeader
                    index="03"
                    eyebrow={tSection('skills_eyebrow')}
                    title={tSection('skills_title')}
                />

                <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16">
                    {/* ทักษะ: แถวละ 1 หมวด */}
                    <dl className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                        {skillCategories.map((category) => (
                            <div key={category.key} className="grid sm:grid-cols-[170px_1fr] gap-3 py-5">
                                <dt className="text-sm font-medium text-white pt-1">
                                    {t(`skill_categories.${category.key}`)}
                                </dt>
                                <dd className="flex flex-wrap gap-2">
                                    {category.items.map((skill) => (
                                        <span key={skill} className="chip">{skill}</span>
                                    ))}
                                </dd>
                            </div>
                        ))}
                    </dl>

                    {/* การศึกษา + ใบรับรอง */}
                    <div className="space-y-6">
                        <div className="card p-6">
                            <h3 className="font-mono text-xs text-slate-500 uppercase tracking-[0.2em] mb-4">{t('education')}</h3>
                            {educationKeys.map((key) => (
                                <div key={key}>
                                    <p className="text-white font-semibold">{t(`education_list.${key}.degree`)}</p>
                                    <p className="text-sm text-slate-400 mt-1">{t(`education_list.${key}.school`)}</p>
                                    <p className="text-sm text-slate-500 mt-1">{t(`education_list.${key}.year`)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="card p-6">
                            <h3 className="font-mono text-xs text-slate-500 uppercase tracking-[0.2em] mb-4">{t('certificates')}</h3>
                            <ul className="space-y-2">
                                {certificates.map((cert) => (
                                    <li key={cert} className="text-sm text-slate-300">{cert}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
