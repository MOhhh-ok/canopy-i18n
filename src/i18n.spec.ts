import { describe, it, expect } from 'vitest'
import { applyLocale } from './applyLocale'
import * as trs from './testData'
import { createI18n } from './index'

describe('i18n basic rendering', () => {
  it('renders messages in Japanese by default (fallback ja)', () => {
    const { title, msg, nested } = trs
    expect(title.render()).toBe('タイトルテスト')
    expect(msg.render({ name: '田中', age: 20 })).toBe('こんにちは、田中さん、あなたは20歳です。来年は21歳です。')
    expect(nested.hello.render()).toBe('こんにちは')
  })

  it('applyLocaleDeep sets locale to en for all messages', () => {
    const localized = applyLocale(trs, 'en')
    expect(localized.title.render()).toBe('Title Test')
    expect(localized.msg.render({ name: 'John', age: 30 })).toBe('Hello, John. You are 30 years old. Next year you will be 31 years old.')
    expect(localized.nested.hello.render()).toBe('Hello')
  })

  it('applyLocaleDeep works on nested objects and standalone message', () => {
    const hs = applyLocale(trs.hasSentMsg, 'ja')
    expect(hs.render({ email: 'test@example.com' })).toBe('test@example.comにメールを送信しました。確認の上、処理を進めて下さい。')
  })

  it('allows overriding fallbackLocale per message via builder', () => {
    const builder = createI18n(['ja', 'en'] as const, 'ja')
    const titleJaFallback = builder({ ja: 'タイトル', en: 'Title' })
    const titleEnFallback = builder({ ja: 'タイトル', en: 'Title' }, 'en')

    expect(titleJaFallback.render()).toBe('タイトル')
    expect(titleEnFallback.render()).toBe('Title')
  })
})
