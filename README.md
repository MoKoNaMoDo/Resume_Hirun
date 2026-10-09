# Resume Hirun

Personal portfolio site (Thai / English) built with Next.js App Router, next-intl and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/[locale]/        # layout.jsx + page.jsx (one page, composed of sections)
├── components/
│   ├── layout/          # Navbar, SectionHeader
│   ├── sections/        # Hero, Experience, Portfolio (+ GitHubActivity), Skills, Contact
│   └── icons/           # SocialIcon (inline SVGs)
├── data/profile.js      # Skills, projects, contact info, social links
├── i18n/
│   ├── routing.js       # Supported locales + default locale (edit here only)
│   ├── navigation.js    # Locale-aware Link / useRouter / usePathname
│   └── request.js       # Loads messages for the current locale
├── messages/            # en.json, th.json — all translated text
└── proxy.js             # Locale detection / redirect
public/                  # profile.jpg and other static files
```

## Where to edit

| Want to change…                         | Edit                    |
|-----------------------------------------|-------------------------|
| Any text shown to visitors              | `src/messages/*.json`   |
| Skills, certificates, projects, socials | `src/data/profile.js`   |
| Add a language                          | `src/i18n/routing.js`, `src/proxy.js` matcher, add `src/messages/<lang>.json` |
