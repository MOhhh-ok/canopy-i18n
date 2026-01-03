import { describe, expect, it } from "vitest";
import { applyLocale } from "./applyLocale";
import { createChainBuilder } from "./chainBuilder";

describe("ChainBuilder", () => {
  it("builds multiple messages with method chaining", () => {
    const messages = createChainBuilder(["ja", "en"] as const, "ja")
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
      .build();

    expect(messages.title.render()).toBe("タイトルテスト");
    expect(messages.greeting.render()).toBe("こんにちは");
  });

  it("supports template functions with type inference", () => {
    const messages = createChainBuilder(["ja", "en"] as const, "ja")
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
      .build();

    expect(messages.welcome.render()).toBe("ようこそ");
    expect(messages.greet.render({ name: "太郎", age: 25 })).toBe("こんにちは、太郎さん。25歳ですね。");
  });

  it("supports adding multiple template messages at once with unified type", () => {
    const messages = createChainBuilder(["ja", "en"] as const, "ja")
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
      .build();

    expect(messages.greet.render({ name: "太郎" })).toBe("こんにちは、太郎さん");
    expect(messages.farewell.render({ name: "花子" })).toBe("さようなら、花子さん");
  });

  it("works with applyLocale", () => {
    const messages = createChainBuilder(["ja", "en"] as const, "ja")
      .add({
        title: { ja: "タイトル", en: "Title" },
      })
      .addTemplates<{ name: string }>()({
        msg: {
          ja: (c) => `こんにちは、${c.name}さん`,
          en: (c) => `Hello, ${c.name}`,
        },
      })
      .build();

    const localized = applyLocale(messages, "en");
    expect(localized.title.render()).toBe("Title");
    expect(localized.msg.render({ name: "John" })).toBe("Hello, John");
  });
});
