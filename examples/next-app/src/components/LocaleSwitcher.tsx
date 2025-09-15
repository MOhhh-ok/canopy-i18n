"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LOCALES = ['ja', 'en'] as const;

export function LocaleSwitcher() {
  const pathname = usePathname();
  const parts = pathname.split('/').filter(Boolean);
  const current = LOCALES.includes(parts[0] as any) ? (parts[0] as typeof LOCALES[number]) : 'ja';
  const rest = LOCALES.includes(parts[0] as any) ? `/${parts.slice(1).join('/')}` : pathname;

  return (
    <nav style={{ display: 'flex', gap: 8 }}>
      {LOCALES.map(l => (
        <Link key={l} href={`/${l}${rest === '/' ? '' : rest}`} aria-current={l === current ? 'page' : undefined}>
          {l}
        </Link>
      ))}
    </nav>
  );
}


