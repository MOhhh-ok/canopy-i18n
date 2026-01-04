import { describe, expect, it } from "vitest";
import { bindLocale } from "./bindLocale";
import { createI18n } from "./chainBuilder";

const LOCALES = ["ja", "en"] as const;

describe("ChainBuilder", () => {
  it("builds multiple messages with method chaining", () => {
    const messages = createI18n(LOCALES)
      .add({
        title: {
          ja: "タイトルテスト",
          en: "Title Test",
        },
        "greeting.hello": {
          ja: "こんにちは",
          en: "Hello",
        },
        "greeting.bye": {
          ja: "さようなら",
          en: "Goodbye",
        },
      })
      .build("ja");

    expect(messages.title.render()).toBe("タイトルテスト");
    expect(messages["greeting.hello"].render()).toBe("こんにちは");
    expect(messages["greeting.bye"].render()).toBe("さようなら");
  });

  it("supports template functions with type inference", () => {
    const messages = createI18n(LOCALES)
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
    const messages = createI18n(LOCALES)
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
    const messages = createI18n(LOCALES)
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

    const localized = bindLocale(messages, "en");
    expect(localized.title.render()).toBe("Title");
    expect(localized.msg.render({ name: "John" })).toBe("Hello, John");
  });

  it("build() with locale parameter applies locale before building", () => {
    const messages = createI18n(LOCALES)
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
    const messages = createI18n(LOCALES)
      .add({
        title: { ja: "タイトル", en: "Title" },
      })
      .build();

    expect(messages.title.render()).toBe("タイトル");
  });

  it("build(locale) does not mutate the builder instance", () => {
    const builder = createI18n(LOCALES)
      .add({
        title: { ja: "タイトル", en: "Title" },
      });

    const englishMessages = builder.build("en");
    const japaneseMessages = builder.build("ja");

    expect(englishMessages.title.render()).toBe("Title");
    expect(japaneseMessages.title.render()).toBe("タイトル");
  });

  it("applyLocale works with ChainBuilder instances", () => {
    const builders = {
      builder1: createI18n(LOCALES).add({ title: { ja: "タイトル", en: "Title" } }),
      builder2: createI18n(LOCALES).add({ greeting: { ja: "こんにちは", en: "Hello" } }),
    };
    const buildersApplied = bindLocale(builders, "ja");
    expect(buildersApplied.builder1.title.render()).toBe("タイトル");
    expect(buildersApplied.builder2.greeting.render()).toBe("こんにちは");
  });

  it("applyLocale works deeply with nested ChainBuilder instances", () => {
    const builders = {
      builder1: {
        builder1child: createI18n(LOCALES).add({ title: { ja: "タイトル", en: "Title" } }),
      },
      builder2: createI18n(LOCALES).add({ greeting: { ja: "こんにちは", en: "Hello" } }),
    };
    const buildersApplied = bindLocale(builders, "ja");
    expect(buildersApplied.builder1.builder1child.title.render()).toBe("タイトル");
    expect(buildersApplied.builder2.greeting.render()).toBe("こんにちは");
  });

  it("applyLocale works with very deep nested structures", () => {
    const builders = {
      level1: {
        level2: {
          level3: createI18n(LOCALES).add({ deep: { ja: "深い", en: "Deep" } }),
        },
        builder: createI18n(LOCALES).add({ msg: { ja: "メッセージ", en: "Message" } }),
      },
    };
    const buildersApplied = bindLocale(builders, "en");
    expect(buildersApplied.level1.level2.level3.deep.render()).toBe("Deep");
    expect(buildersApplied.level1.builder.msg.render()).toBe("Message");
  });

  it("clone() creates an independent copy of the builder", () => {
    const builder1 = createI18n(LOCALES)
      .add({
        title: { ja: "タイトル", en: "Title" },
      });

    const builder2 = builder1.clone();

    const messages1 = builder1.build("ja");
    const messages2 = builder2.build("ja");

    expect(messages1.title.render()).toBe("タイトル");
    expect(messages2.title.render()).toBe("タイトル");
  });

  it("clone() allows independent message additions", () => {
    const builder1 = createI18n(LOCALES)
      .add({
        title: { ja: "タイトル", en: "Title" },
      });

    const builder2 = builder1.clone().add({
      greeting: { ja: "こんにちは", en: "Hello" },
    });

    const messages1 = builder1.build("ja");
    const messages2 = builder2.build("ja");

    expect(messages1.title.render()).toBe("タイトル");
    expect((messages1 as any).greeting).toBeUndefined();

    expect(messages2.title.render()).toBe("タイトル");
    expect(messages2.greeting.render()).toBe("こんにちは");
  });

  it("clone() creates deep copies of messages", () => {
    const builder1 = createI18n(LOCALES)
      .add({
        title: { ja: "タイトル", en: "Title" },
      });

    const builder2 = builder1.clone();

    const messages1 = builder1.build("ja");
    const messages2 = builder2.build("en");

    expect(messages1.title.render()).toBe("タイトル");
    expect(messages2.title.render()).toBe("Title");
  });

  it("clone() works with template messages", () => {
    const builder1 = createI18n(LOCALES)
      .addTemplates<{ name: string }>()({
        greet: {
          ja: (ctx) => `こんにちは、${ctx.name}さん`,
          en: (ctx) => `Hello, ${ctx.name}`,
        },
      });

    const builder2 = builder1.clone().add({
      farewell: { ja: "さようなら", en: "Goodbye" },
    });

    const messages1 = builder1.build("ja");
    const messages2 = builder2.build("en");

    expect(messages1.greet.render({ name: "太郎" })).toBe("こんにちは、太郎さん");
    expect((messages1 as any).farewell).toBeUndefined();

    expect(messages2.greet.render({ name: "John" })).toBe("Hello, John");
    expect(messages2.farewell.render()).toBe("Goodbye");
  });

  it("add() supports custom return types", () => {
    type MenuItem = {
      label: string;
      url: string;
    };

    const messages = createI18n(LOCALES)
      .add<MenuItem>({
        home: {
          ja: { label: "ホーム", url: "/" },
          en: { label: "Home", url: "/" },
        },
        settings: {
          ja: { label: "設定", url: "/settings" },
          en: { label: "Settings", url: "/settings" },
        },
      })
      .build("en");

    const home = messages.home.render();
    expect(home.label).toBe("Home");
    expect(home.url).toBe("/");

    const settings = messages.settings.render();
    expect(settings.label).toBe("Settings");
    expect(settings.url).toBe("/settings");
  });

  it("addTemplates() supports custom return types", () => {
    type ButtonData = {
      text: string;
      color: string;
    };

    type ButtonContext = {
      label: string;
    };

    const messages = createI18n(LOCALES)
      .addTemplates<ButtonContext, ButtonData>()({
        button: {
          ja: (ctx) => ({ text: ctx.label, color: "青" }),
          en: (ctx) => ({ text: ctx.label, color: "blue" }),
        },
      })
      .build("en");

    const button = messages.button.render({ label: "Submit" });
    expect(button.text).toBe("Submit");
    expect(button.color).toBe("blue");
  });

  it("supports mixing string messages and custom return types", () => {
    type Badge = {
      text: string;
      level: "info" | "warning" | "error";
    };

    const messages = createI18n(LOCALES)
      .add({
        title: { ja: "タイトル", en: "Title" },
      })
      .add<Badge>({
        badge: {
          ja: { text: "新着", level: "info" },
          en: { text: "NEW", level: "info" },
        },
      })
      .build("en");

    expect(messages.title.render()).toBe("Title");

    const badge = messages.badge.render();
    expect(badge.text).toBe("NEW");
    expect(badge.level).toBe("info");
  });
});
