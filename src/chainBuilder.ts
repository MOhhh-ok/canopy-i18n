import { I18nMessage, isI18nMessage } from "./message.js";
import type { LocalizedMessage } from "./message.js";

export class ChainBuilder<
  const Ls extends readonly string[],
  Messages extends Record<string, I18nMessage<Ls, any, any>> = {},
> {
  private readonly locales: Ls;
  private messages: Messages;

  constructor(
    locales: Ls,
    messages?: Messages,
  ) {
    this.locales = locales;
    this.messages = (messages ?? {}) as Messages;
  }

  /**
   * 複数のメッセージを一度に追加
   * 型パラメータRでカスタム型も指定可能(デフォルトはstring)
   */
  add<
    R = string,
    K extends string = string,
    Entries extends Record<K, Record<Ls[number], R>> = Record<K, Record<Ls[number], R>>,
  >(
    entries: { [Key in keyof Entries]: Key extends keyof Messages ? never : Entries[Key] },
  ): ChainBuilder<
    Ls,
    Messages & { [Key in keyof Entries]: I18nMessage<Ls, void, R> }
  > {
    const newMessages = { ...this.messages };

    for (const [key, data] of Object.entries(entries)) {
      const msg = new I18nMessage<Ls, void, R>(this.locales, this.locales[0] as Ls[number]).setData(
        data as Record<Ls[number], R>,
      );
      (newMessages as any)[key] = msg;
    }

    return new ChainBuilder(this.locales, newMessages as any);
  }

  /**
   * 関数指定版: 複数のテンプレート関数を一度に追加(型は統一)
   */
  addTemplates<C, R = string, K extends string = string>(): <
    Entries extends Record<K, Record<Ls[number], (ctx: C) => R>>,
  >(
    entries: { [Key in keyof Entries]: Key extends keyof Messages ? never : Entries[Key] },
  ) => ChainBuilder<
    Ls,
    Messages & { [Key in keyof Entries]: I18nMessage<Ls, C, R> }
  > {
    return <Entries extends Record<K, Record<Ls[number], (ctx: C) => R>>>(
      entries: { [Key in keyof Entries]: Key extends keyof Messages ? never : Entries[Key] },
    ): ChainBuilder<
      Ls,
      Messages & { [Key in keyof Entries]: I18nMessage<Ls, C, R> }
    > => {
      const newMessages = { ...this.messages };

      for (const [key, data] of Object.entries(entries)) {
        const msg = new I18nMessage<Ls, C, R>(this.locales, this.locales[0] as Ls[number]).setData(
          data as Record<Ls[number], (ctx: C) => R>,
        );
        (newMessages as any)[key] = msg;
      }

      return new ChainBuilder(this.locales, newMessages as any);
    };
  }

  private deepCloneWithLocale<T>(obj: T, locale: Ls[number]): T {
    if (isI18nMessage(obj)) {
      const cloned = Object.create(Object.getPrototypeOf(obj));
      Object.assign(cloned, obj);
      cloned.setLocale(locale);
      return cloned;
    }
    if (Array.isArray(obj)) {
      return (obj as any[]).map(v => this.deepCloneWithLocale(v, locale)) as T;
    }
    if (obj && typeof obj === "object") {
      const out: Record<string, any> = {};
      for (const k of Object.keys(obj)) {
        out[k] = this.deepCloneWithLocale((obj as any)[k], locale);
      }
      return out as T;
    }
    return obj;
  }

  build<
    M = {
      [K in keyof Messages]: Messages[K] extends I18nMessage<Ls, infer C, infer R> ? LocalizedMessage<Ls, C, R> : never;
    },
  >(
    locale?: Ls[number],
  ): M {
    const clonedMessages = locale !== undefined
      ? this.deepCloneWithLocale(this.messages, locale)
      : this.messages;

    const result: Record<string, any> = {};

    for (const [key, msg] of Object.entries(clonedMessages)) {
      if (isI18nMessage(msg)) {
        result[key] = msg.toFunction();
      } else {
        result[key] = msg;
      }
    }

    return result as M;
  }
}

export function createI18n<const Ls extends readonly string[]>(
  locales: Ls,
): ChainBuilder<Ls, {}> {
  return new ChainBuilder(locales);
}
