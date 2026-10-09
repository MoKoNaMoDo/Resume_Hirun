/**
 * proxy.js — ตัวพาไปหน้าภาษาที่ถูกต้อง
 *
 * ทำงานก่อนเปิดหน้าเว็บทุกครั้ง
 * เช่น ถ้าเข้าเว็บที่ "/" เฉยๆ จะถูกพาไปที่ "/th" (ภาษาไทย) ให้อัตโนมัติ
 * รายชื่อภาษาที่ใช้ได้ ดูจากไฟล์ → src/i18n/routing.js
 */
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // ทำงานเฉพาะหน้าแรก กับหน้าที่ขึ้นต้นด้วย /th หรือ /en
    // ⚠️ ถ้าเพิ่มภาษาใหม่ อย่าลืมเพิ่มในวงเล็บ (th|en) ด้วย
    matcher: ['/', '/(th|en)/:path*']
};
