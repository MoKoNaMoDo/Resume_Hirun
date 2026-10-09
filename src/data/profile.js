/**
 * profile.js — ข้อมูลส่วนตัวทั้งหมดที่โชว์บนเว็บ
 *
 * อยากเพิ่ม/แก้ ทักษะ ผลงาน เบอร์โทร ลิงก์ → แก้ที่ไฟล์นี้
 * ส่วนข้อความที่ต้องมี 2 ภาษา (ชื่องาน, คำอธิบาย) → อยู่ใน src/messages/th.json และ en.json
 */

// ทักษะ แบ่งเป็นหมวด → โชว์ในส่วน 'เกี่ยวกับ' (About.jsx)
// ชื่อหมวดภาษาไทย/อังกฤษ อยู่ใน messages → skill_categories
export const skillCategories = [
    { key: 'programming', items: ['Python', 'JavaScript'] },
    { key: 'frontend', items: ['HTML', 'Tailwind CSS', 'React.js', 'Next.js'] },
    { key: 'backend', items: ['Node.js', 'MongoDB', 'MySQL Database', 'Supabase', 'PostgreSQL', 'Docker', 'AWS Lightsail'] },
    { key: 'ai_data', items: ['LLM', 'RAG', 'K-means', 'Decision Tree', 'Recommendation System', 'Huggingface'] },
    { key: 'tools', items: ['GitHub', 'Postman', 'CI/CD', 'Claude Code CLI', 'MCP AI CLI', 'Runpod', 'Google Colab', 'Kaggle', 'Weka'] },
];

// รหัสของประสบการณ์ทำงาน / การศึกษา (รายละเอียดอยู่ใน messages → experience_list, education_list)
export const experienceKeys = ['exp1', 'exp2', 'exp3', 'exp4'];
export const educationKeys = ['edu1'];

// ใบรับรอง → โชว์ในส่วน 'เกี่ยวกับ'
export const certificates = [
    'IBM Data Science Professional (2025)',
    'IBM Data Science (Coursera)',
];

// ผลงาน → โชว์เป็นการ์ดในส่วน 'ผลงาน' (Portfolio.jsx)
// - เรียงตามลำดับในนี้ (อันแรก = บนสุด)
// - id ต้องตรงกับชื่อใน messages → projects (ที่เก็บชื่องาน + คำอธิบาย)
// - live = ลิงก์เว็บจริง (ไม่มีก็ไม่ต้องใส่ ปุ่มจะไม่โชว์)
// - category = หมวดของผลงาน ใช้กับแท็บด้านบน: 'client' (งานบริษัท/ลูกค้า), 'ai' (AI & Data), 'personal' (โปรเจกต์ส่วนตัว)
// - featured: true = ผลงานเด่น ขึ้นแสดงก่อนผลงานอื่น
// - จำนวนผลงานในนี้ จะไปโชว์เป็นตัวเลขบนรูปโปรไฟล์ด้วย
export const projects = [
    {
        id: 'anandaBidding',
        category: 'client',
        featured: true,
        year: '2025–2026',
        tech: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeORM', 'Docker'],
    },
    {
        id: 'tmmlWorkforce',
        category: 'client',
        year: '2026',
        tech: ['Testing', 'Bug Reporting', 'Documentation'],
    },
    {
        id: 'myStocks',
        category: 'personal',
        featured: true,
        year: '2026',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'LINE Messaging API', 'Vitest'],
    },
    {
        id: 'clearBill',
        category: 'ai',
        featured: true,
        year: '2026',
        tech: ['React', 'TypeScript', 'Express', 'Gemini Vision', 'Tesseract OCR', 'Google Sheets API', 'LINE Messaging API'],
    },
    {
        id: 'ninjaCodeBug',
        category: 'personal',
        featured: true,
        year: '2026',
        tech: ['Next.js', 'Express', 'Prisma', 'PostgreSQL', 'Supabase', 'Docker'],
        live: 'https://www.ninjacodebug.com',
    },
    {
        id: 'pimmz',
        category: 'client',
        featured: true,
        year: '2026',
        tech: ['React', 'Vite', 'Material UI'],
        live: 'https://pimmz.club',
    },
    {
        id: 'vns',
        category: 'client',
        featured: true,
        year: '2026',
        tech: ['Next.js', 'next-intl', 'Supabase', 'Tailwind CSS'],
        live: 'https://vns-engineering-hydraulic.vercel.app',
    },
    {
        id: 'proj1',
        category: 'ai',
        year: '2025',
        tech: ['Python', 'Content-based Filtering', 'Database'],
    },
    {
        id: 'proj4',
        category: 'ai',
        year: '2025',
        tech: ['Machine Learning', 'Decision Tree', 'Kaggle'],
    },
    {
        id: 'proj3',
        category: 'client',
        year: '2025',
        tech: ['UX/UI', 'Web Performance'],
    },
    {
        id: 'proj2',
        category: 'client',
        year: '2024',
        tech: ['Web Application', 'Dashboard'],
    },
    {
        id: 'botMigration',
        category: 'client',
        year: '2023',
        tech: ['Content Migration', 'Data Verification'],
    },
];

// ไฟล์ CV ที่ปุ่ม 'ดาวน์โหลด Resume' ส่งให้ (ไฟล์อยู่ใน public/)
// ลำดับแท็บหมวดหมู่ในส่วนผลงาน ('all' = ทั้งหมด) ชื่อแท็บอยู่ใน messages → Portfolio.categories
export const projectCategories = ['all', 'client', 'ai', 'personal'];

export const resumeFile = '/Hirun_Chatcharoensawat_Resume.pdf';

// ข้อมูลติดต่อ → โชว์ในส่วน 'ติดต่อ' (Contact.jsx)
export const contact = {
    email: 'hirunchatcharoensawat@gmail.com',
    phone: '+66865624967',
    phoneDisplay: '086-562-4967',
    location: 'Samut Prakan, Thailand',
};

// ลิงก์โปรไฟล์ออนไลน์ → โชว์ในส่วน 'ติดต่อ'
// label ต้องตรงกับชื่อไอคอนใน icons/SocialIcon.jsx
export const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/MoKoNaMoDo', username: 'MoKoNaMoDo', color: 'hover:text-white', iconColor: 'text-white' },
    { label: 'Hugging Face', href: 'https://huggingface.co/Hirun9', username: 'Hirun9', color: 'hover:text-yellow-400', iconColor: 'text-yellow-400' },
    { label: 'Kaggle', href: 'https://www.kaggle.com/meaowmeawo', username: 'meaowmeawo', color: 'hover:text-blue-400', iconColor: 'text-blue-400' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hirun-chatcharoensawat', username: 'Hirun', color: 'hover:text-blue-500', iconColor: 'text-blue-600' },
];
