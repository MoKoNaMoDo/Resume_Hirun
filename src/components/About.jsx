'use client';
import { useTranslations } from 'next-intl';

export default function About() {
    const t = useTranslations('About');

    // Full skill list from Resume
    const skillCategories = [
        {
            title: "Languages & Core",
            items: ["Python", "JavaScript", "HTML", "SQL", "NoSQL"]
        },
        {
            title: "Web Development",
            items: ["React.js", "Next.js", "Node.js", "Tailwind CSS", "HTML"]
        },
        {
            title: "Data & AI",
            items: ["Machine Learning", "LLM", "K-means", "Decision Tree", "RAG", "Data Analysis"]
        },
        {
            title: "Tools & DevOps",
            items: ["Git / GitHub", "Docker", "MongoDB", "MySQL", "Supabase", "PostgreSQL"]
        }
    ];

    const education = t.raw('education');
    const certificates = t.raw('certificates');

    return (
        <section id="about" className="section relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent-secondary/5 blur-[120px] -z-10 rounded-full"></div>

            <div className="container">
                <h2 className="gradient-text mb-12 text-center text-5xl">{t('title')}</h2>

                <div className="about-grid">

                    {/* Left Col: Bio & Education */}
                    <div className="bio-col">
                        {/* Bio */}
                        <div className="glass-card bio-card">
                            <h3 className="section-subtitle">Profile</h3>
                            <p className="bio-text">
                                {t('description')}
                            </p>
                        </div>

                        {/* Education & Certs */}
                        <div className="education-grid">
                            {/* Education */}
                            <div className="glass-card education-card">
                                <h3 className="card-title">
                                    <span className="icon-badge accent-bg">🎓</span>
                                    {t('educationTitle')}
                                </h3>
                                <div className="timeline-list">
                                    {education.map((edu, i) => (
                                        <div key={i} className="timeline-item accent-border">
                                            <div className="timeline-dot accent-bg"></div>
                                            <div className="item-title">{edu.institution}</div>
                                            <div className="item-subtitle accent-text">{edu.degree}</div>
                                            <div className="item-meta">{edu.year} • {edu.grade}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Certs */}
                            <div className="glass-card education-card">
                                <h3 className="card-title">
                                    <span className="icon-badge secondary-bg">📜</span>
                                    {t('certificatesTitle')}
                                </h3>
                                <div className="timeline-list">
                                    {certificates.map((cert, i) => (
                                        <div key={i} className="timeline-item secondary-border">
                                            <div className="timeline-dot secondary-bg"></div>
                                            <div className="item-title">{cert.name}</div>
                                            <div className="item-subtitle secondary-text">{cert.issuer}</div>
                                            <div className="item-meta">{cert.year}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Skills */}
                    <div className="skills-col">
                        <div className="glass-card skills-card">
                            <h3 className="card-title">
                                <span className="icon-badge blue-bg">⚡</span>
                                {t('skills')}
                            </h3>

                            <div className="skills-list-container">
                                {skillCategories.map((cat, idx) => (
                                    <div key={idx}>
                                        <h4 className="skill-category-title">
                                            {cat.title}
                                        </h4>
                                        <div className="skill-tags">
                                            {cat.items.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="skill-tag"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
