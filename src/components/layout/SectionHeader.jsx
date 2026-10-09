/**
 * SectionHeader.jsx — หัวข้อของแต่ละส่วน (ใช้เหมือนกันทุกส่วน เว็บจะได้ดูเป็นระบบเดียวกัน)
 *
 * หน้าตา:  01 / EXPERIENCE      ← ตัวเล็กสีเทา
 *          Where I've worked.   ← หัวข้อใหญ่
 *          คำอธิบายสั้นๆ (ถ้ามี)
 *
 * ใช้ใน → Experience.jsx, Portfolio.jsx, Skills.jsx
 */
export default function SectionHeader({ index, eyebrow, title, subtitle }) {
    return (
        <div className="mb-12 md:mb-16 max-w-2xl">
            <p className="font-mono text-xs text-slate-500 uppercase tracking-[0.2em] mb-4">
                {index} / {eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
            {subtitle && <p className="mt-4 text-slate-400 leading-relaxed">{subtitle}</p>}
        </div>
    );
}
