import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";

export const metadata = {
    title: 'Hirun | Developer & AI Engineer',
    description: 'Portfolio of Hirun - Developer & AI Engineer',
};

export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    // Providing all messages to the client
    // side is the easiest way to get started
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
