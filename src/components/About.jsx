'use client';
import { useTranslations } from 'next-intl';

export default function About() {
    const t = useTranslations('About');

    const skillCategories = [
        {
            title: t('skill_categories.programming'),
            items: ["Python", "JavaScript"]
        },
        {
            title: t('skill_categories.frontend'),
            items: ["HTML", "Tailwind CSS", "React.js", "Next.js", "Node.js"]
        },
        {
            title: t('skill_categories.backend'),
            items: ["MongoDB", "MySQL Database", "Supabase"]
        },
        {
            title: t('skill_categories.ai_data'),
            items: ["LLM", "RAG", "K-means", "Decision Tree", "Recommendation System", "ChatGPT", "Claude", "Gemini API", "Huggingface"]
        },
        {
            title: t('skill_categories.tools'),
            items: ["GitHub", "Docker", "Claude Code CLI", "MCP AI CLI", "Runpod", "Google Colab", "Kaggle", "Weka"]
        }
    ];

    // Identifiers for fetching data from JSON
    const expKeys = ['exp1', 'exp2', 'exp3', 'exp4'];
    const eduKeys = ['edu1'];

    return (
        <section id="about" className="section py-16 md:py-32 relative">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-16 flex items-center gap-4">
                    <span className="w-8 md:w-12 h-[2px] bg-accent"></span>
                    <span className="gradient-text">{t('title')}</span>
                </h2>

                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Bio & Experience Column */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="glass p-10 rounded-2xl border-l-4 border-accent relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/20 transition-all duration-500"></div>
                            <p className="text-xl text-slate-300 leading-relaxed font-light mb-8 relative z-10">
                                {t('description')}
                            </p>
                            <div className="flex items-center gap-4 text-accent/80 font-mono text-sm">
                                <span>// SYSTEM_STATUS: ONLINE</span>
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-blink"></span>
                            </div>
                        </div>

                        <div className="grid gap-6">
                            {/* Experience Card */}
                            <div className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 transition-colors">
                                <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">💼</span>
                                    {t('experience')}
                                </h3>
                                <ul className="space-y-8">
                                    {expKeys.map((key) => (
                                        <li key={key} className="relative pl-8 border-l border-white/10 last:border-0 pb-2">
                                            <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[6.5px] top-1.5 ring-4 ring-[#050511]"></div>
                                            <h4 className="text-white font-bold text-lg">{t(`experience_list.${key}.role`)}</h4>
                                            <span className="text-sm text-accent font-mono block mb-1">
                                                {t(`experience_list.${key}.company`)} | {t(`experience_list.${key}.year`)}
                                            </span>
                                            <p className="text-sm text-slate-400 font-light leading-relaxed">
                                                {t(`experience_list.${key}.desc`)}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Education Card */}
                            <div className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 transition-colors">
                                <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">🎓</span>
                                    {t('education')}
                                </h3>
                                <ul className="space-y-4">
                                    {eduKeys.map((key) => (
                                        <li key={key} className="relative pl-4 border-l border-white/10">
                                            <div className="absolute w-2 h-2 bg-accent rounded-full -left-[5px] top-2"></div>
                                            <h4 className="text-white font-medium">{t(`education_list.${key}.degree`)}</h4>
                                            <p className="text-sm text-slate-400">{t(`education_list.${key}.school`)}</p>
                                            <p className="text-xs text-slate-500 font-mono mt-1">{t(`education_list.${key}.year`)}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Skills Column (Categorized) */}
                    <div className="lg:col-span-5 space-y-8">
                        <h3 className="font-mono text-sm text-slate-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
                            {t('skills')}
                        </h3>

                        <div className="space-y-6">
                            {skillCategories.map((category, idx) => (
                                <div key={idx} className="group">
                                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                                        <span className="text-accent text-sm">►</span>
                                        {category.title}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {category.items.map((skill) => (
                                            <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 hover:text-white hover:border-accent/50 hover:bg-accent/10 transition-all cursor-default">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Certificates */}
                        <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-white/5 to-accent/5 border border-white/5">
                            <h4 className="text-xs font-mono text-slate-500 mb-4 uppercase">{t('certificates')}</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-slate-300 group">
                                    <span className="text-accent mt-1 group-hover:text-white transition-colors">●</span>
                                    <span>IBM Data Science Professional (2025)</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-300 group">
                                    <span className="text-accent mt-1 group-hover:text-white transition-colors">●</span>
                                    <span>IBM Data Science (Coursera)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
