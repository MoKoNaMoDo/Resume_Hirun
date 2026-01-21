import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'th'];
export const { Link, redirect, usePathname, useRouter } = createNavigation({ locales });
