/**
 * Contact.jsx — ส่วน 'ติดต่อ' + ท้ายเว็บ
 *
 * ซ้าย: หัวข้อชวนติดต่อ + จังหวัด + ปุ่มดาวน์โหลด CV
 * ขวา: อีเมล, เบอร์โทร และลิงก์โปรไฟล์ (GitHub, LinkedIn, ...)
 *
 * ข้อมูลติดต่อ / ลิงก์ มาจาก → src/data/profile.js
 * ข้อความ 2 ภาษา มาจาก → messages ส่วน 'Contact' และ 'Footer'
 */
import { useTranslations } from 'next-intl';
import { contact, socialLinks, resumeFile } from '@/data/profile';
import SocialIcon from '@/components/icons/SocialIcon';

export default function Contact() {
    const t = useTranslations('Contact');
    const tFooter = useTranslations('Footer');

    return (
        <footer id="contact" className="relative py-12 md:py-20 bg-[#050511] border-t border-white/5 overflow-hidden">
            {/* แสงฟุ้งตกแต่งพื้นหลัง */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-10 md:mb-20">
                    {/* ฝั่งซ้าย */}
                    <div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white whitespace-pre-line">
                            {t('title_hero')}
                        </h2>
                        <p className="text-slate-400 text-base md:text-lg max-w-md mb-8 md:mb-10 font-light">
                            {t('subtitle')}
                        </p>

                        <div className="space-y-4">
                            <p className="text-slate-500 text-sm">
                                {contact.location}
                            </p>
                            <a href={resumeFile} download className="btn btn-outline mt-4">
                                {t('resume')}
                            </a>
                        </div>
                    </div>

                    {/* ฝั่งขวา: การ์ดช่องทางติดต่อ */}
                    <div className="flex flex-col justify-center gap-4">
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm">
                            <h3 className="text-slate-400 text-sm font-mono mb-6 uppercase tracking-widest">{t('profiles')}</h3>
                            {/* อีเมล + เบอร์โทร (กดแล้วเปิดแอปอีเมล / โทรออก) */}
                            <div className="grid grid-cols-1 gap-4 mb-4">
                                <SocialLink label="Email" title={t('email')} href={`mailto:${contact.email}`} username={contact.email} iconColor="text-accent" external={false} />
                                <SocialLink label="Phone" title={t('phone')} href={`tel:${contact.phone}`} username={contact.phoneDisplay} iconColor="text-green-400" external={false} />
                            </div>
                            {/* ลิงก์โปรไฟล์ (เปิดแท็บใหม่) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {socialLinks.map((link) => (
                                    <SocialLink key={link.label} {...link} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ท้ายเว็บ: ลิขสิทธิ์ */}
                <div className="pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm font-mono">
                        {tFooter('copyright')}
                    </p>
                    <p className="text-slate-600 text-xs uppercase tracking-widest">
                        DESIGNED & BUILT BY HIRUN
                    </p>
                </div>
            </div>
        </footer>
    );
}

// ปุ่มช่องทางติดต่อ 1 อัน = ไอคอน + ชื่อ + รายละเอียด
// external = true → เปิดแท็บใหม่ (ใช้กับลิงก์ไปเว็บอื่น)
function SocialLink({ label, title = label, href, username, color, iconColor, external = true }) {
    const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
        <a href={href} {...linkProps} className={`flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group ${color ?? ''}`}>
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full bg-black/50 flex items-center justify-center font-bold transition-colors ${iconColor ?? 'text-slate-400'} group-hover:text-white`}>
                    <SocialIcon label={label} />
                </div>
                <div className="flex flex-col">
                    <span className="font-medium text-slate-300 group-hover:text-white text-sm">{title}</span>
                    <span className="font-mono text-xs text-slate-500 group-hover:text-accent transition-colors break-all">{username}</span>
                </div>
            </div>
        </a>
    );
}
