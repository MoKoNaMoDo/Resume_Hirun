/**
 * Experience.jsx — ส่วน 'ประสบการณ์ทำงาน' (แสดงเป็นไทม์ไลน์)
 *
 * แต่ละแถว: ซ้าย = ช่วงเวลา / ขวา = ตำแหน่ง + บริษัท + รายละเอียด
 * งานปัจจุบันมีป้าย "ปัจจุบัน" กำกับ
 *
 * รายการงาน (ลำดับ) มาจาก → src/data/profile.js (experienceKeys)
 * ข้อความ 2 ภาษา มาจาก → messages ส่วน 'About' → experience_list
 */
import { useTranslations } from 'next-intl';
import { experienceKeys } from '@/data/profile';
import SectionHeader from '@/components/layout/SectionHeader';

export default function Experience() {
    const t = useTranslations('About');
    const tSection = useTranslations('Sections');

    return (
        <section id="experience" className="py-20 md:py-28 border-t border-white/[0.06]">
            <div className="container">
                <SectionHeader
                    index="01"
                    eyebrow={tSection('experience_eyebrow')}
                    title={tSection('experience_title')}
                    subtitle={t('description')}
                />

                <ol className="relative">
                    {experienceKeys.map((key, i) => {
                        const isCurrent = i === 0; // งานแรกในรายการ = งานปัจจุบัน
                        return (
                            <li
                                key={key}
                                className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-10 py-8 border-b border-white/[0.06] last:border-0"
                            >
                                {/* ช่วงเวลา */}
                                <div className="font-mono text-xs text-slate-500 pt-1.5">
                                    {t(`experience_list.${key}.year`)}
                                </div>

                                {/* ตำแหน่ง + บริษัท + รายละเอียด */}
                                <div>
                                    <div className="flex flex-wrap items-center gap-3 mb-1">
                                        <h3 className="text-lg font-semibold text-white">
                                            {t(`experience_list.${key}.role`)}
                                        </h3>
                                        {isCurrent && (
                                            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-accent/10 text-accent border border-accent/20">
                                                {tSection('current')}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-400 mb-3">{t(`experience_list.${key}.company`)}</p>
                                    <p className="text-slate-300 leading-relaxed max-w-2xl">
                                        {t(`experience_list.${key}.desc`)}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
