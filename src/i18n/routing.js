/**
 * routing.js — ตั้งค่าภาษาของเว็บ (แก้ที่นี่ที่เดียว)
 *
 * บอกว่าเว็บมีภาษาอะไรบ้าง และภาษาไหนเป็นภาษาเริ่มต้น
 * ไฟล์อื่นที่มาอ่านค่าจากที่นี่: proxy.js, navigation.js, request.js และ Navbar.jsx
 */
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['th', 'en'],   // ภาษาที่รองรับ (ลำดับนี้ = ลำดับปุ่มบน Navbar)
    defaultLocale: 'th'      // ภาษาเริ่มต้น เมื่อเข้าเว็บโดยไม่ระบุภาษา
});
