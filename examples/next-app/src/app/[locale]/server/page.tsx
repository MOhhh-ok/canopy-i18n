import * as msgs from '@/i18n/messages';
import { applyLocaleDeep } from 'canopy-i18n';

export default function ServerPage({ params }: { params: { locale: string } }) {
  const m = applyLocaleDeep(msgs, params.locale);
  return (
    <main style={{ padding: 24 }}>
      <h2>Server Sample</h2>
      <p>{m.common.hello.render()}</p>
      <p>{m.home.intro.render({ name: 'Server Tanaka' })}</p>
    </main>
  );
}


