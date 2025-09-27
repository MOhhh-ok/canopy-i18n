import * as msgs from '@/i18n/messages';
import { applyLocale } from 'canopy-i18n';

export default async function ServerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const m = applyLocale(msgs, locale);
  return (
    <main style={{ padding: 24 }}>
      <h2>Server Sample</h2>
      <p>{m.common.hello.render()}</p>
      <p>{m.home.intro.render({ name: 'Server Tanaka' })}</p>
    </main>
  );
}


