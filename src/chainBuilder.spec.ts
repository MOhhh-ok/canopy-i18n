import { describe, expect, it } from "vitest";
import { applyLocale } from "./applyLocale";
import { createChainBuilder } from "./chainBuilder";

const LOCALES = ["ja", "en"] as const;

describe("ChainBuilder", () => {
  it("builds multiple messages with method chaining", () => {
    const messages = createChainBuilder(LOCALES)
      .add({
        title: {
          ja: "タイトルテスト",
          en: "Title Test",
        },
        greeting: {
          ja: "こんにちは",
          en: "Hello",
        },
      })
      .build("ja");

    expect(messages.title.render()).toBe("タイトルテスト");
    expect(messages.greeting.render()).toBe("こんにちは");
  });

  it("supports template functions with type inference", () => {
    const messages = createChainBuilder(LOCALES)
      .add({
        welcome: {
          ja: "ようこそ",
          en: "Welcome",
        },
      })
      .addTemplates<{ name: string; age: number }>()({
        greet: {
          ja: (ctx) => `こんにちは、${ctx.name}さん。${ctx.age}歳ですね。`,
          en: (ctx) => `Hello, ${ctx.name}. You are ${ctx.age}.`,
        },
      })
      .build("ja");

    expect(messages.welcome.render()).toBe("ようこそ");
    expect(messages.greet.render({ name: "太郎", age: 25 })).toBe("こんにちは、太郎さん。25歳ですね。");
  });

  it("supports adding multiple template messages at once with unified type", () => {
    const messages = createChainBuilder(LOCALES)
      .addTemplates<{ name: string }>()({
        greet: {
          ja: (ctx) => `こんにちは、${ctx.name}さん`,
          en: (ctx) => `Hello, ${ctx.name}`,
        },
        farewell: {
          ja: (ctx) => `さようなら、${ctx.name}さん`,
          en: (ctx) => `Goodbye, ${ctx.name}`,
        },
      })
      .build("ja");

    expect(messages.greet.render({ name: "太郎" })).toBe("こんにちは、太郎さん");
    expect(messages.farewell.render({ name: "花子" })).toBe("さようなら、花子さん");
  });

  it("works with applyLocale function", () => {
    const messages = createChainBuilder(LOCALES)
      .add({
        title: { ja: "タイトル", en: "Title" },
      })
      .addTemplates<{ name: string }>()({
        msg: {
          ja: (c) => `こんにちは、${c.name}さん`,
          en: (c) => `Hello, ${c.name}`,
        },
      })
      .build("ja");

    const localized = applyLocale(messages, "en");
    expect(localized.title.render()).toBe("Title");
    expect(localized.msg.render({ name: "John" })).toBe("Hello, John");
  });

  it("build() with locale parameter applies locale before building", () => {
    const messages = createChainBuilder(LOCALES)
      .add({
        title: { ja: "タイトル", en: "Title" },
        greeting: { ja: "こんにちは", en: "Hello" },
      })
      .addTemplates<{ name: string }>()({
        welcome: {
          ja: (ctx) => `ようこそ、${ctx.name}さん`,
          en: (ctx) => `Welcome, ${ctx.name}`,
        },
      })
      .build("en");

    expect(messages.title.render()).toBe("Title");
    expect(messages.greeting.render()).toBe("Hello");
    expect(messages.welcome.render({ name: "John" })).toBe("Welcome, John");
  });

  it("build() without locale parameter uses default locale (first locale in array)", () => {
    const messages = createChainBuilder(LOCALES)
      .add({
        title: { ja: "タイトル", en: "Title" },
      })
      .build();

    expect(messages.title.render()).toBe("タイトル");
  });

  it("build(locale) does not mutate the builder instance", () => {
    const builder = createChainBuilder(LOCALES)
      .add({
        title: { ja: "タイトル", en: "Title" },
      });

    const englishMessages = builder.build("en");
    const japaneseMessages = builder.build("ja");

    expect(englishMessages.title.render()).toBe("Title");
    expect(japaneseMessages.title.render()).toBe("タイトル");
  });
});
