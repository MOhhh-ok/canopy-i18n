import { builder } from '../builder';

export const title = builder({ ja: 'ホーム', en: 'Home' });
export const intro = builder<{ name: string }>({
  ja: c => `ようこそ、${c.name}さん！`,
  en: c => `Welcome, ${c.name}!`,
});


