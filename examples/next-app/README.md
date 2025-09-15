This is a Next.js App Router example for `canopy-i18n` using npm package.

## Getting Started

First, install deps and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). You will be redirected to `/ja` or `/en` based on `Accept-Language`.

Routes:

- `/` → redirects to `/{locale}`
- `/ja` → Japanese
- `/en` → English
- `/{locale}/server` → Server sample (uses `applyLocaleDeep` on server)
- `/{locale}/client` → Client sample (uses hooks)

Key files:

- `src/i18n/builder.ts`: create message builder with locales
- `src/i18n/messages/*`: message definitions
- `src/app/[locale]/layout.tsx`: applies locale via `applyLocaleDeep`
- `src/app/[locale]/page.tsx`: renders messages
- `src/app/[locale]/server/page.tsx`: server sample
- `src/app/[locale]/client/page.tsx`: client sample
- `src/components/LocaleSwitcher.tsx`: client component to switch locales
- `src/middleware.ts`: locale detection/redirect

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Fonts are loaded by `next/font`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
