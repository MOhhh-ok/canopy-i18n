import { createI18n } from "canopy-i18n";
import type { JSX } from "react";
import { LOCALES, type User } from "./types";

export const defineMessage = () => createI18n(LOCALES);

const baseI18n = defineMessage().add({
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

const features = defineMessage().add({
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

const dynamicMessages = defineMessage()
  .addTemplates<User>()({
    greeting: {
      en: (ctx) => `Hello, ${ctx.name}!`,
      ja: (ctx) => `こんにちは、${ctx.name}さん！`,
      zh: (ctx) => `你好，${ctx.name}！`,
    },
    itemCount: {
      en: (ctx) => `You have ${ctx.count} ${ctx.count === 1 ? "item" : "items"}`,
      ja: (ctx) => `${ctx.count}個のアイテムがあります`,
      zh: (ctx) => `你有 ${ctx.count} 个项目`,
    },
  });

const jsxMessages = defineMessage()
  .addTemplates<User, JSX.Element>()({
    badge: {
      en: (user) => (
        <span
          style={{
            background: "#FF6B6B",
            color: "#fff",
            padding: "4px 12px",
            borderRadius: "16px",
            fontWeight: "600",
          }}
        >
          {user.name}
        </span>
      ),
      ja: (user) => (
        <span
          style={{
            background: "#4ECDC4",
            color: "#fff",
            padding: "4px 12px",
            borderRadius: "16px",
            fontWeight: "600",
          }}
        >
          {user.name}さん
        </span>
      ),
      zh: (user) => (
        <span
          style={{
            background: "#FFB84D",
            color: "#fff",
            padding: "4px 12px",
            borderRadius: "16px",
            fontWeight: "600",
          }}
        >
          {user.name}
        </span>
      ),
    },
  });

export const msgsDef = { baseI18n, features, dynamicMessages, jsxMessages };
