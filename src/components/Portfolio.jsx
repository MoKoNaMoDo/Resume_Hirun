'use client';
import { useTranslations } from 'next-intl';

export default function Portfolio() {
    const t = useTranslations('Portfolio');

    // Fetch projects from JSON
    const projects = t.raw('projects');

    return (
        <section id="portfolio" className="section relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            <div className="container">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="gradient-text">{t('title')}</h2>
                    <div className="h-1 w-20 bg-accent rounded-full mt-4 shadow-[0_0_20px_var(--accent-glow)]"></div>
                </div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="glass-card project-card group"
                        >
                            {/* Card Hover Glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                                style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}, transparent 70%)` }}
                            ></div>

                            {/* Header */}
                            <div className="card-header">
                                <div className="icon-box">
                                    <span className="text-3xl" style={{ filter: 'grayscale(100%)' }}>
                                        {/* Placeholder Icon based on ID or Color */}
                                        <div className="w-10 h-10 rounded-xl flex-center shadow-inner" style={{ backgroundColor: project.color }}>
                                            <span className="text-sm text-white font-mono font-bold opacity-90 tracking-widest">
                                                {project.id.substring(0, 2).toUpperCase()}
                                            </span>
                                        </div>
                                    </span>
                                </div>
                                <div className="year-badge">
                                    {project.year}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="card-content">
                                <h3 className="project-title group-hover:text-accent">
                                    {project.title}
                                </h3>
                                <p className="project-role">
                                    {project.role}
                                </p>
                                <p className="project-desc">
                                    {project.description}
                                </p>
                            </div>

                            {/* Tech Stack */}
                            <div className="tech-stack">
                                {project.tech.split(',').map((item) => (
                                    <span key={item} className="chip">
                                        {item.trim()}
                                    </span>
                                ))}
                            </div>

                            {/* Action - Commented out
                            <div className="mt-8 pt-6 border-t border-white/5 flex justify-end z-10">
                                <button className="text-sm font-medium text-slate-400 hover:text-white flex items-center gap-2 group/btn transition-colors">
                                    {t('viewProject')}
                                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                            */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
