'use client';
import { useTranslations } from 'next-intl';

export default function Portfolio() {
    const t = useTranslations('Portfolio');

    const projectKeys = [
        { id: 'proj1', color: "from-orange-500/20 to-red-500/20" },
        { id: 'proj2', color: "from-green-500/20 to-emerald-500/20" },
        { id: 'proj3', color: "from-blue-500/20 to-cyan-500/20" },
        { id: 'proj4', color: "from-purple-500/20 to-pink-500/20" }
    ];

    return (
        <section id="portfolio" className="section py-16 md:py-32 bg-[#0a0a19]/50 relative">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none"></div>

            <div className="container relative z-10">
                <div className="text-center mb-10 md:mb-20">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text inline-block">
                        {t('title')}
                    </h2>
                    <div className="h-1 w-24 bg-accent mx-auto rounded-full mt-2"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {projectKeys.map((item, index) => (
                        <div key={item.id} className="glass-card flex flex-col h-full p-8 group relative overflow-hidden">
                            {/* Number Watermark */}
                            <span className="absolute -right-4 -top-4 text-[8rem] font-bold text-white/5 select-none font-mono group-hover:text-accent/10 transition-colors">
                                0{index + 1}
                            </span>

                            <div className="relative z-10 flex-1 flex flex-col">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform`}>
                                    <div className="w-6 h-6 bg-white/20 rounded-md"></div>
                                </div>

                                <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-accent transition-colors">
                                    {t(`projects.${item.id}.title`)}
                                </h3>
                                <p className="text-xs font-mono text-accent mb-4 uppercase tracking-wider">
                                    {t(`projects.${item.id}.role`)}
                                </p>

                                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                                    {t(`projects.${item.id}.desc`)}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                                    {t(`projects.${item.id}.tech`).split(', ').map(tech => (
                                        <span key={tech} className="chip">{tech}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
