/**
 * Contact.jsx — ส่วน 'ติดต่อ' + ท้ายเว็บ
 *
 * ซ้าย: หัวข้อชวนติดต่อ + คำอธิบาย + ปุ่มส่งอีเมล / ดาวน์โหลด CV
 * ขวา: อีเมล, เบอร์โทร และลิงก์โปรไฟล์ (GitHub, LinkedIn, ...)
 * ล่างสุด: ลิขสิทธิ์
 *
 * ข้อมูลติดต่อ / ลิงก์ มาจาก → src/data/profile.js
 * ข้อความ 2 ภาษา มาจาก → messages ส่วน 'Contact', 'Sections' และ 'Footer'
 */
import { useTranslations } from 'next-intl';
import { contact, socialLinks, resumeFile } from '@/data/profile';
import SocialIcon from '@/components/icons/SocialIcon';

export default function Contact() {
    const t = useTranslations('Contact');
    const tSection = useTranslations('Sections');
    const tFooter = useTranslations('Footer');

    return (
        <footer id="contact" className="pt-20 md:pt-28 pb-10 border-t border-white/[0.06]">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
                    {/* ฝั่งซ้าย: หัวข้อ + ปุ่ม */}
                    <div>
                        <p className="font-mono text-xs text-slate-500 uppercase tracking-[0.2em] mb-4">
                            04 / {tSection('contact_eyebrow')}
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 whitespace-pre-line">
                            {t('title_hero')}
                        </h2>
                        <p className="text-slate-400 leading-relaxed max-w-md mb-8">
                            {t('subtitle')}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a href={`mailto:${contact.email}`} className="btn btn-primary">
                                {t('send_email')} →
                            </a>
                            <a href={resumeFile} download className="btn btn-outline">
                                {t('resume')}
                            </a>
                        </div>
                        <p className="text-sm text-slate-500 mt-8">{contact.location}</p>
                    </div>

                    {/* ฝั่งขวา: ช่องทางติดต่อ */}
                    <div className="card p-2 hover:border-white/[0.08]">
                        <ul className="divide-y divide-white/[0.06]">
                            <ContactRow label="Email" title={t('email')} href={`mailto:${contact.email}`} value={contact.email} />
                            <ContactRow label="Phone" title={t('phone')} href={`tel:${contact.phone}`} value={contact.phoneDisplay} />
                            {socialLinks.map((link) => (
                                <ContactRow key={link.label} label={link.label} title={link.label} href={link.href} value={link.username} external />
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ท้ายเว็บ */}
                <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-slate-500">
                    <p>{tFooter('copyright')}</p>
                    <p>{tFooter('built_with')}</p>
                </div>
            </div>
        </footer>
    );
}

// ช่องทางติดต่อ 1 แถว = ไอคอน + ชื่อ + ข้อมูล + ลูกศร
// external = true → เปิดแท็บใหม่ (ใช้กับลิงก์ไปเว็บอื่น)
function ContactRow({ label, title, href, value, external = false }) {
    const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
        <li>
            <a href={href} {...linkProps} className="group flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-white/[0.03] transition-colors">
                <span className="w-9 h-9 shrink-0 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                    <SocialIcon label={label} />
                </span>
                <span className="text-sm text-slate-400 w-24 shrink-0">{title}</span>
                <span className="text-sm text-white truncate flex-1">{value}</span>
                <span className="text-slate-600 group-hover:text-white transition-colors">{external ? '↗' : '→'}</span>
            </a>
        </li>
    );
}
