'use client';
import { useTranslations } from 'next-intl';

export default function Contact() {
    const t = useTranslations('Contact');
    const tFooter = useTranslations('Footer');

    return (
        <footer id="contact" className="relative py-20 bg-[#050511] border-t border-white/5 overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 mb-20">
                    <div>
                        <h2 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-white hover:text-accent transition-colors duration-500 cursor-default whitespace-pre-line">
                            {t('title_hero')}
                        </h2>
                        <p className="text-slate-400 text-lg max-w-md mb-10 font-light">
                            {t('subtitle')}
                        </p>

                        <div className="space-y-4">
                            <a href="mailto:hirunchatcharoensawat@gmail.com" className="block text-2xl lg:text-3xl font-bold text-white hover:text-accent transition-colors">
                                hirunchatcharoensawat@gmail.com
                            </a>
                            <a href="tel:0865624967" className="block text-xl lg:text-2xl font-mono text-slate-400 hover:text-white transition-colors">
                                +66 86 562 4967
                            </a>
                            <p className="text-slate-500 text-sm">
                                10270, Mueang, Samut Prakan, Thailand
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-4">
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm">
                            <h3 className="text-slate-400 text-sm font-mono mb-6 uppercase tracking-widest">Social & Profiles</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <SocialLink label="GitHub" href="https://github.com/MoKoNaMoDo" username="MoKoNaMoDo" color="hover:text-white" />
                                <SocialLink label="Hugging Face" href="https://huggingface.co/Hirun9" username="Hirun9" color="hover:text-yellow-400" />
                                <SocialLink label="Kaggle" href="https://www.kaggle.com/meaowmeawo" username="meaowmeawo" color="hover:text-blue-400" />
                                <SocialLink label="LinkedIn" href="https://www.linkedin.com/in/hirun-chatcharoensawat" username="Hirun" color="hover:text-blue-500" />
                                <SocialLink label="Facebook" href="https://www.facebook.com/HirunChaichareonswad" username="Hirun" color="hover:text-blue-600" />
                                <SocialLink label="Instagram" href="https://www.instagram.com/p_nurih" username="@p_nurih" color="hover:text-pink-500" />
                            </div>
                        </div>
                    </div>
                </div>

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

function SocialLink({ label, href, username, color }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group ${color}`}>
            <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center font-bold text-slate-400 group-hover:text-white transition-colors text-xs">
                    {label.charAt(0)}
                </span>
                <div className="flex flex-col">
                    <span className="font-medium text-slate-300 group-hover:text-white text-sm">{label}</span>
                    <span className="font-mono text-[10px] text-slate-500 group-hover:text-accent transition-colors">{username}</span>
                </div>
            </div>
        </a>
    );
}
