import { describe, expect, it } from "vitest";
import { applyLocale } from "./applyLocale";
import { createChainBuilder } from "./chainBuilder";

describe("ChainBuilder", () => {
  it("builds multiple messages with method chaining", () => {
    const messages = createChainBuilder(["ja", "en"] as const, "ja")
      .add("title", {
        ja: "タイトルテスト",
        en: "Title Test",
      })
      .add("greeting", {
        ja: "こんにちは",
        en: "Hello",
      })
      .build();

    expect(messages.title.render()).toBe("タイトルテスト");
    expect(messages.greeting.render()).toBe("こんにちは");
  });

  it("supports template functions with type inference", () => {
    const messages = createChainBuilder(["ja", "en"] as const, "ja")
      .add("welcome", {
        ja: "ようこそ",
        en: "Welcome",
      })
      .add("greet", {
        ja: (ctx: { name: string; age: number }) => `こんにちは、${ctx.name}さん。${ctx.age}歳ですね。`,
        en: (ctx: { name: string; age: number }) => `Hello, ${ctx.name}. You are ${ctx.age}.`,
      })
      .build();

    expect(messages.welcome.render()).toBe("ようこそ");
    expect(messages.greet.render({ name: "太郎", age: 25 })).toBe("こんにちは、太郎さん。25歳ですね。");
  });

  it("works with applyLocale", () => {
    const messages = createChainBuilder(["ja", "en"] as const, "ja")
      .add("title", { ja: "タイトル", en: "Title" })
      .add("msg", {
        ja: (c: { name: string }) => `こんにちは、${c.name}さん`,
        en: (c: { name: string }) => `Hello, ${c.name}`,
      })
      .build();

    const localized = applyLocale(messages, "en");
    expect(localized.title.render()).toBe("Title");
    expect(localized.msg.render({ name: "John" })).toBe("Hello, John");
  });
});
