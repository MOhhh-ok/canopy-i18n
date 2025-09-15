import { NextResponse, NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const LOCALES = ['ja', 'en'];
const DEFAULT_LOCALE = 'ja';

function getPreferredLocale(req: NextRequest): string {
  const header = req.headers.get('accept-language') ?? '';
  const langs = header.split(',').map(s => s.split(';')[0].trim());
  for (const l of langs) {
    const base = l.split('-')[0];
    if (LOCALES.includes(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const isMissingLocale = LOCALES.every(l => !pathname.startsWith(`/${l}/`)) && !LOCALES.includes(pathname.slice(1));
  if (isMissingLocale) {
    const locale = getPreferredLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};


