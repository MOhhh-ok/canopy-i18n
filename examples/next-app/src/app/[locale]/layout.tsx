import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { applyLocaleDeep } from 'canopy-i18n';
import '@/app/globals.css';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { SampleMenu } from '@/components/SampleMenu';
import * as msgs from '@/i18n/messages';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'canopy-i18n Next.js example',
};

export default function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  const m = applyLocaleDeep(msgs, params.locale);
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <header style={{ padding: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
        <h1>{m.home.title.render()}</h1>
        <LocaleSwitcher />
      </header>
      <SampleMenu locale={params.locale} />
      {children}
    </div>
  );
}


