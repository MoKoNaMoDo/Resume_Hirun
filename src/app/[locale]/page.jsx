/**
 * page.jsx — หน้าแรกของเว็บ (เว็บนี้มีหน้าเดียว)
 *
 * เอาแต่ละส่วนมาเรียงต่อกันจากบนลงล่าง
 * อยากสลับลำดับหรือซ่อนส่วนไหน → แก้ที่นี่
 */
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import Contact from '@/components/sections/Contact';

export default function Home() {
    return (
        <main>
            <Navbar />     {/* เมนูด้านบน */}
            <Hero />       {/* ส่วนแรก: ชื่อ + รูป + ปุ่มดาวน์โหลด Resume */}
            <About />      {/* เกี่ยวกับ: ประสบการณ์ การศึกษา ทักษะ */}
            <Portfolio />  {/* ผลงาน */}
            <Contact />    {/* ติดต่อ + ท้ายเว็บ */}
        </main>
    );
}
