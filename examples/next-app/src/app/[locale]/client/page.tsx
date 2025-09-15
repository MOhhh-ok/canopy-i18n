"use client";
import * as msgs from '@/i18n/messages';
import { useApplyLocaleDeep } from '@/i18n/hooks';

export default function ClientPage() {
  const m = useApplyLocaleDeep(msgs);
  return (
    <main style={{ padding: 24 }}>
      <h2>Client Sample</h2>
      <p>{m.common.hello.render()}</p>
      <p>{m.home.intro.render({ name: 'Client Tanaka' })}</p>
    </main>
  );
}


