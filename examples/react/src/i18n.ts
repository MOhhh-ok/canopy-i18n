import { createI18n } from "../../../src";

export const LOCALES = ["en", "ja", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

const baseI18n = createI18n(LOCALES).add({
  title: {
    en: "Canopy i18n",
    ja: "Canopy i18n",
    zh: "Canopy i18n",
  },
  welcome: {
    en: "Welcome to Canopy i18n",
    ja: "Canopy i18nへようこそ",
    zh: "欢迎使用 Canopy i18n",
  },
  description: {
    en: "A tiny, type-safe i18n helper for modern applications",
    ja: "モダンなアプリケーション向けの小さな型安全i18nヘルパー",
    zh: "适用于现代应用的轻量级类型安全 i18n 助手",
  },
  footer: {
    en: "Made with ❤️ using Canopy i18n",
    ja: "Canopy i18nで作られました ❤️",
    zh: "使用 Canopy i18n 制作 ❤️",
  },
});

const features = createI18n(LOCALES).add({
  title: {
    en: "Features",
    ja: "特徴",
    zh: "特性",
  },
  typeSafe: {
    en: "🔒 Type-safe translations",
    ja: "🔒 型安全な翻訳",
    zh: "🔒 类型安全的翻译",
  },
  simple: {
    en: "⚡ Simple and lightweight",
    ja: "⚡ シンプルで軽量",
    zh: "⚡ 简单轻量",
  },
  chainable: {
    en: "🔗 Chainable API",
    ja: "🔗 チェーン可能なAPI",
    zh: "🔗 可链式调用的 API",
  },
});

export function buildI18n(locale: Locale) {
  return {
    ...baseI18n.build(locale),
    features: features.build(locale),
  };
}

export type Messages = ReturnType<typeof buildI18n>;
