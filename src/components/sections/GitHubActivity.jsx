/**
 * GitHubActivity.jsx — กราฟความถี่การเขียนโค้ดจาก GitHub (ช่องสี่เหลี่ยมแบบหน้าโปรไฟล์ GitHub)
 *
 * ข้อมูลดึงจาก → github-contributions-api.jogruber.de (ดึงข้อมูลสาธารณะของ GitHub ให้ ไม่ต้องใช้ key)
 * อัปเดตใหม่วันละครั้ง (revalidate) ไม่ได้ดึงทุกครั้งที่มีคนเปิดเว็บ
 * ถ้าดึงข้อมูลไม่ได้ → ส่วนนี้จะไม่แสดง เว็บส่วนอื่นยังใช้ได้ปกติ
 *
 * ไฟล์นี้: ดึงข้อมูล + คำนวณตัวเลขสรุป (วันที่เขียนโค้ด, ทำต่อเนื่องนานสุด, วันที่เยอะสุด)
 * ส่วนที่แสดงผล + อนิเมชัน อยู่ใน → GitHubGrid.jsx
 * ใช้ใน → page.jsx (ต่อท้ายส่วนผลงาน ก่อนส่วนติดต่อ)
 */
import { getLocale, getTranslations } from 'next-intl/server';
import GitHubGrid from './GitHubGrid';

const GITHUB_USER = 'MoKoNaMoDo';

// ดึงข้อมูล 1 ปีล่าสุด (เก็บไว้ 1 วัน)
async function getContributions() {
    try {
        const res = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
            { next: { revalidate: 60 * 60 * 24 } }
        );
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

// แบ่งวันเป็นสัปดาห์ (คอลัมน์ละ 7 วัน เริ่มวันอาทิตย์เหมือน GitHub)
function toWeeks(days) {
    const pad = new Date(days[0].date + 'T00:00:00Z').getUTCDay(); // วันแรกเป็นวันอะไร
    const cells = [...Array(pad).fill(null), ...days];
    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    return weeks;
}

// ชื่อเดือนเหนือคอลัมน์: โชว์เฉพาะคอลัมน์แรกของแต่ละเดือน
function monthLabels(weeks, locale) {
    const fmt = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' });
    let last = -1;
    return weeks.map((week) => {
        const first = week.find(Boolean);
        if (!first) return '';
        const d = new Date(first.date + 'T00:00:00Z');
        if (d.getUTCMonth() === last) return '';
        last = d.getUTCMonth();
        return fmt.format(d);
    });
}

// ตัวเลขสรุป
function summarize(days) {
    let longest = 0, run = 0, best = days[0];
    for (const d of days) {
        run = d.count > 0 ? run + 1 : 0;
        longest = Math.max(longest, run);
        if (d.count > best.count) best = d;
    }
    return {
        activeDays: days.filter((d) => d.count > 0).length, // จำนวนวันที่มีการเขียนโค้ด
        longestStreak: longest,                              // ทำต่อเนื่องติดกันนานสุดกี่วัน
        bestDay: best.count,                                 // วันที่เยอะที่สุด
    };
}

export default async function GitHubActivity() {
    const data = await getContributions();
    if (!data?.contributions?.length) return null;

    const t = await getTranslations('Contact');
    const locale = await getLocale();
    const days = data.contributions;
    const weeks = toWeeks(days);

    return (
        <GitHubGrid
            weeks={weeks}
            months={monthLabels(weeks, locale)}
            total={data.total.lastYear}
            stats={summarize(days)}
            profileUrl={`https://github.com/${GITHUB_USER}`}
            labels={{
                title: t('github_title'),
                total: t('github_total_label'),
                activeDays: t('github_active_days'),
                streak: t('github_streak'),
                bestDay: t('github_best_day'),
                less: t('github_less'),
                more: t('github_more'),
                weekdays: [t('github_mon'), t('github_wed'), t('github_fri')],
            }}
        />
    );
}
