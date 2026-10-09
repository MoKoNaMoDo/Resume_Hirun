/**
 * request.js — โหลดข้อความของภาษาที่กำลังเปิดอยู่
 *
 * ทุกครั้งที่เปิดหน้าเว็บ ไฟล์นี้จะ:
 *   1. ดูว่า URL เป็นภาษาอะไร (เช่น /en = อังกฤษ)
 *   2. ถ้าเป็นภาษาที่ไม่มี → ใช้ภาษาไทยแทน
 *   3. ไปหยิบข้อความจาก src/messages/th.json หรือ en.json มาให้ทุกส่วนของเว็บใช้
 */
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale; // ภาษาจาก URL
    // ถ้าไม่ใช่ th หรือ en → ใช้ภาษาเริ่มต้นแทน
    const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

    return {
        locale,
        // หยิบไฟล์ข้อความของภาษานั้นมาใช้
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
