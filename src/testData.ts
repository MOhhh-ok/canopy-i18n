import { createMessageBuilder } from "./index";

const builder = createMessageBuilder(['ja', 'en'] as const, 'ja');

export const title = builder({
  ja: 'タイトルテスト',
  en: 'Title Test'
});

export const msg = builder<{ name: string, age: number }>({
  ja: c => `こんにちは、${c.name}さん、あなたは${c.age}歳です。来年は${c.age + 1}歳です。`,
  en: c => `Hello, ${c.name}. You are ${c.age} years old. Next year you will be ${c.age + 1} years old.`
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