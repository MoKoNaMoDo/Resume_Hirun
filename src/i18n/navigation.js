/**
 * navigation.js — ตัวช่วยเปลี่ยนหน้า / เปลี่ยนภาษา
 *
 * ใช้แทนลิงก์ปกติ เพราะจะเติม /th หรือ /en ให้เองอัตโนมัติ
 * ไฟล์ที่ใช้: Navbar.jsx (ตอนกดปุ่ม TH / EN)
 */
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
