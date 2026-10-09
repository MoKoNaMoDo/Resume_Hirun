'use client'; // ทำงานบนเบราว์เซอร์ เพราะต้องรู้ว่าผู้ใช้เลื่อนมาถึงกราฟหรือยัง

/**
 * GitHubGrid.jsx — หน้าตา + อนิเมชันของกราฟ GitHub
 *
 * ประกอบด้วย:
 *   - หัวข้อ + ตัวเลขรวม (วิ่งนับจาก 0)
 *   - ตัวเลขสรุป 3 ช่อง: วันที่เขียนโค้ด / ทำต่อเนื่องนานสุด / วันที่เยอะสุด
 *   - ตารางช่องสี่เหลี่ยม เต็มความกว้างกล่อง มีชื่อเดือนด้านบน + ชื่อวันด้านซ้าย
 *
 * พอเลื่อนมาถึง: ช่องค่อยๆ เด้งขึ้นทีละคอลัมน์ จากซ้ายไปขวา + ตัวเลขวิ่งนับ
 * ข้อมูลทั้งหมดคำนวณมาจาก → GitHubActivity.jsx
 * ถ้าเครื่องผู้ใช้ตั้งค่าลดการเคลื่อนไหว จะไม่มีอนิเมชัน (ตั้งไว้ใน globals.css)
 */
import { useEffect, useRef, useState } from 'react';

// สีของช่อง ตามระดับ 0 (ไม่มี) → 4 (เยอะมาก) / ระดับสูงๆ มีแสงเรืองเพิ่ม
const LEVEL_STYLES = [
    'bg-white/[0.04]',
    'bg-accent/25',
    'bg-accent/50',
    'bg-accent/75 shadow-[0_0_6px_rgba(56,189,248,0.35)]',
    'bg-accent shadow-[0_0_10px_rgba(56,189,248,0.7)]',
];

// ตัวเลขที่วิ่งนับจาก 0 → ค่าจริง (เริ่มเมื่อ start = true)
function useCountUp(target, start, duration = 1500) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!start) return;
        const begin = performance.now();
        let frame;
        const tick = (now) => {
            const p = Math.min((now - begin) / duration, 1);
            setValue(Math.round(target * (1 - Math.pow(1 - p, 3)))); // เร็วตอนแรก แล้วค่อยๆ ช้าลง
            if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [target, start, duration]);
    return value;
}

export default function GitHubGrid({ weeks, months, total, stats, profileUrl, labels }) {
    const ref = useRef(null);
    const scrollRef = useRef(null); // กล่องที่เลื่อนซ้ายขวาได้ (บนมือถือ)
    const [visible, setVisible] = useState(false); // เลื่อนมาถึงกราฟแล้วหรือยัง

    // คอยดูว่ากราฟโผล่บนจอหรือยัง (เล่นอนิเมชันครั้งเดียว)
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.25 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // จอเล็ก: เลื่อนกราฟไปทางขวาสุดตั้งแต่แรก ให้เห็นเดือนล่าสุดก่อน (เดือนเก่าๆ มักว่าง)
    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollLeft = el.scrollWidth;
    }, []);

    const totalCount = useCountUp(total, visible);
    const activeDays = useCountUp(stats.activeDays, visible);
    const streak = useCountUp(stats.longestStreak, visible);
    const bestDay = useCountUp(stats.bestDay, visible);

    return (
        <div
            ref={ref}
            className="relative mt-16 p-6 md:p-8 card overflow-hidden hover:border-white/[0.08]"
        >
            {/* หัวข้อ + ตัวเลขรวม */}
            <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-slate-500 text-xs font-mono uppercase tracking-[0.2em] mb-2">{labels.title}</h3>
                    <a
                        href={profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-baseline gap-2 text-slate-300 hover:text-accent transition-colors"
                    >
                        <span className="text-4xl md:text-5xl font-bold text-white tabular-nums group-hover:text-accent transition-colors">
                            {totalCount.toLocaleString()}
                        </span>
                        <span className="text-sm">{labels.total} ↗</span>
                    </a>
                </div>

                {/* ตัวเลขสรุป 3 ช่อง */}
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                    <Stat value={activeDays} label={labels.activeDays} />
                    <Stat value={streak} label={labels.streak} />
                    <Stat value={bestDay} label={labels.bestDay} />
                </div>
            </div>

            {/* ตารางช่อง — เต็มความกว้างกล่อง / จอเล็กเลื่อนซ้ายขวาได้ */}
            <div ref={scrollRef} className="relative overflow-x-auto pb-2">
                <div className="min-w-[680px]">
                    {/* ชื่อเดือนด้านบน */}
                    <div className="flex gap-[3px] pl-9 mb-1.5 text-[10px] text-slate-500">
                        {months.map((m, i) => (
                            <div key={i} className="flex-1 min-w-0 whitespace-nowrap overflow-visible">{m}</div>
                        ))}
                    </div>

                    <div className="flex">
                        {/* ชื่อวันด้านซ้าย (จันทร์ / พุธ / ศุกร์) */}
                        <div className="w-9 shrink-0 grid grid-rows-7 gap-[3px] text-[10px] text-slate-500 pr-2">
                            <span />
                            <span className="leading-none self-center">{labels.weekdays[0]}</span>
                            <span />
                            <span className="leading-none self-center">{labels.weekdays[1]}</span>
                            <span />
                            <span className="leading-none self-center">{labels.weekdays[2]}</span>
                            <span />
                        </div>

                        {/* คอลัมน์ = สัปดาห์ / แถว = วัน */}
                        <div className="flex-1 flex gap-[3px]">
                            {weeks.map((week, w) => (
                                <div key={w} className="flex-1 grid grid-rows-7 gap-[3px]">
                                    {Array.from({ length: 7 }, (_, d) => {
                                        const day = week[d];
                                        if (!day) return <div key={d} className="aspect-square" />;
                                        return (
                                            <div
                                                key={d}
                                                title={`${day.date}: ${day.count}`}
                                                // ยังไม่ถึงกราฟ → ซ่อนไว้ / ถึงแล้ว → เด้งขึ้นมา คอลัมน์ขวาเริ่มช้ากว่าซ้ายนิดหน่อย
                                                style={visible ? { animationDelay: `${w * 16}ms` } : undefined}
                                                className={`aspect-square rounded-[3px] transition-transform duration-150 hover:scale-[1.6] hover:relative hover:z-10 hover:ring-1 hover:ring-white/60 ${LEVEL_STYLES[day.level] ?? LEVEL_STYLES[0]} ${visible ? 'gh-cell-pop' : 'opacity-0'}`}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* คำอธิบายสี */}
            <div className="relative flex items-center justify-end gap-1.5 mt-4 text-[11px] text-slate-500">
                <span className="mr-1">{labels.less}</span>
                {LEVEL_STYLES.map((c, i) => (
                    <span key={i} className={`w-3 h-3 rounded-[3px] ${c}`} />
                ))}
                <span className="ml-1">{labels.more}</span>
            </div>
        </div>
    );
}

// กล่องตัวเลขสรุปเล็กๆ
function Stat({ value, label }) {
    return (
        <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center md:text-left">
            <div className="text-xl md:text-2xl font-bold text-white tabular-nums">{value.toLocaleString()}</div>
            <div className="text-[11px] text-slate-500 leading-tight mt-0.5">{label}</div>
        </div>
    );
}
