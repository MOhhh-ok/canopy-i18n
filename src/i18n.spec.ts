import { describe, expect, it } from "vitest";
import { applyLocale } from "./applyLocale";
import { createI18n } from "./index";

const builder = createI18n(["ja", "en"] as const, "ja");

const title = builder({
  ja: "タイトルテスト",
  en: "Title Test",
});

const msg = builder<{ name: string; age: number }>({
  ja: c => `こんにちは、${c.name}さん、あなたは${c.age}歳です。来年は${c.age + 1}歳です。`,
  en: c => `Hello, ${c.name}. You are ${c.age} years old. Next year you will be ${c.age + 1} years old.`,
});

const nested = {
  hello: builder({
    ja: "こんにちは",
    en: "Hello",
  }),
  world: builder({
    ja: "世界",
    en: "World",
  }),
};

const hasSentMsg = builder<{ email: string }>({
  ja: o => `${o.email}にメールを送信しました。確認の上、処理を進めて下さい。`,
  en: o => `Email sent to ${o.email}. Please check and proceed with the process.`,
});

const trs = {
  title,
  msg,
  nested,
  hasSentMsg,
};

describe("i18n basic rendering", () => {
  it("renders messages in Japanese by default (fallback ja)", () => {
    expect(title.render()).toBe("タイトルテスト");
    expect(msg.render({ name: "田中", age: 20 })).toBe("こんにちは、田中さん、あなたは20歳です。来年は21歳です。");
    expect(nested.hello.render()).toBe("こんにちは");
  });

  it("applyLocaleDeep sets locale to en for all messages", () => {
    const localized = applyLocale(trs, "en");
    expect(localized.title.render()).toBe("Title Test");
    expect(localized.msg.render({ name: "John", age: 30 })).toBe(
      "Hello, John. You are 30 years old. Next year you will be 31 years old.",
    );
    expect(localized.nested.hello.render()).toBe("Hello");
  });

  it("applyLocaleDeep works on nested objects and standalone message", () => {
    const hs = applyLocale(trs.hasSentMsg, "ja");
    expect(hs.render({ email: "test@example.com" })).toBe(
      "test@example.comにメールを送信しました。確認の上、処理を進めて下さい。",
    );
  });

  it("allows overriding fallbackLocale per message via builder", () => {
    const builder = createI18n(["ja", "en"] as const, "ja");
    const titleJaFallback = builder({ ja: "タイトル", en: "Title" });
    const titleEnFallback = builder({ ja: "タイトル", en: "Title" }, "en");

    expect(titleJaFallback.render()).toBe("タイトル");
    expect(titleEnFallback.render()).toBe("Title");
  });
});
