/**
 * layout.jsx — กรอบหลักที่ครอบทุกหน้าของเว็บ
 *
 * ทำ 2 อย่าง:
 *   1. ตั้งชื่อแท็บเบราว์เซอร์ + รูปที่โชว์ตอนแชร์ลิงก์ (generateMetadata)
 *   2. ส่งข้อความภาษาไทย/อังกฤษ ไปให้ทุกส่วนของเว็บใช้ (RootLayout)
 *
 * ชื่อโฟลเดอร์ [locale] = ส่วนของ URL ที่บอกภาษา เช่น /th, /en
 */
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import "../globals.css";

// ที่อยู่เว็บจริง (ใช้ตอนแชร์ลิงก์ให้รูปพรีวิวขึ้น)
const SITE_URL = 'https://resume-hirun.vercel.app';

/**
 * ตั้งชื่อแท็บ + คำอธิบายเว็บ + รูปพรีวิวตอนแชร์ลิงก์ใน LINE / LinkedIn
 * ข้อความมาจาก → src/messages/*.json ส่วน "Meta"
 * รูปพรีวิวใช้ → public/profile.jpg
 */
export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Meta' });

    return {
        metadataBase: new URL(SITE_URL),
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: `/${locale}`,
            type: 'profile',
            images: ['/profile.jpg'],
        },
    };
}

export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    // เอาข้อความของภาษานี้ทั้งหมด ส่งต่อให้ทุกส่วนของเว็บใช้
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body suppressHydrationWarning={true}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
