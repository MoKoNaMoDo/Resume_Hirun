/**
 * page.jsx — หน้าแรกของเว็บ (เว็บนี้มีหน้าเดียว)
 *
 * เอาแต่ละส่วนมาเรียงต่อกันจากบนลงล่าง
 * อยากสลับลำดับหรือซ่อนส่วนไหน → แก้ที่นี่
 */
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Portfolio from '@/components/sections/Portfolio';
import Contact from '@/components/sections/Contact';
import GitHubActivity from '@/components/sections/GitHubActivity';

export default function Home() {
    return (
        <main>
            <Navbar />     {/* เมนูด้านบน */}
            <Hero />       {/* ส่วนแรก: ชื่อ + รูป + ตัวเลขสรุป */}
            <Experience /> {/* 01 ประสบการณ์ทำงาน */}
            <Portfolio>    {/* 02 ผลงาน + กราฟ GitHub ต่อท้าย */}
                <GitHubActivity />
            </Portfolio>
            <Skills />     {/* 03 ทักษะ + การศึกษา */}
            <Contact />    {/* 04 ติดต่อ + ท้ายเว็บ */}
        </main>
    );
}
