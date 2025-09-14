import { createBuilder } from "./createBuilder";

const builder = createBuilder(['ja', 'en'] as const, 'ja', 'ja');

export const title = builder({
  ja: 'タイトルテスト',
  en: 'Title Test'
});

export const msg = builder<{ name: string, age: number }>({
  ja: c => `こんにちは、${c.name}さん、${c.age + 10}歳です。`,
  en: 'Hello'
});

export const nested = {
  hello: builder({
    ja: 'こんにちは',
    en: 'Hello'
  }),
  world: builder({
    ja: '世界',
    en: 'World'
  })
}