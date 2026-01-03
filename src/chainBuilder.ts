import { I18nMessage, isI18nMessage, LocalizedMessage } from "./message";

export class ChainBuilder<
  const Ls extends readonly string[],
  Messages extends Record<string, I18nMessage<Ls, any>> = {},
> {
  private messages: Messages;

  constructor(
    private readonly locales: Ls,
    private readonly locale: Ls[number],
    messages?: Messages,
  ) {
    this.messages = (messages ?? {}) as Messages;
  }

  /**
   * 文字列指定版: 複数のメッセージを一度に追加
   */
  add<Entries extends Record<string, Record<Ls[number], string>>>(
    entries: { [K in keyof Entries]: K extends keyof Messages ? never : Entries[K] },
  ): ChainBuilder<
    Ls,
    Messages & { [K in keyof Entries]: LocalizedMessage<Ls, void> }
  > {
    const newMessages = { ...this.messages };

    for (const [key, data] of Object.entries(entries)) {
      const msg = new I18nMessage<Ls, void>(this.locales, this.locale).setData(data);
      msg.setLocale(this.locale);
      (newMessages as any)[key] = msg;
    }

    return new ChainBuilder(this.locales, this.locale, newMessages as any);
  }

  /**
   * 関数指定版: 複数のテンプレート関数を一度に追加(型は統一)
   */
  addTemplates<C>(): <Entries extends Record<string, Record<Ls[number], (ctx: C) => string>>>(
    entries: { [K in keyof Entries]: K extends keyof Messages ? never : Entries[K] },
  ) => ChainBuilder<
    Ls,
    Messages & { [K in keyof Entries]: LocalizedMessage<Ls, C> }
  > {
    return <Entries extends Record<string, Record<Ls[number], (ctx: C) => string>>>(
      entries: { [K in keyof Entries]: K extends keyof Messages ? never : Entries[K] },
    ): ChainBuilder<
      Ls,
      Messages & { [K in keyof Entries]: LocalizedMessage<Ls, C> }
    > => {
      const newMessages = { ...this.messages };

      for (const [key, data] of Object.entries(entries)) {
        const msg = new I18nMessage<Ls, C>(this.locales, this.locale).setData(data);
        msg.setLocale(this.locale);
        (newMessages as any)[key] = msg;
      }

      return new ChainBuilder(this.locales, this.locale, newMessages as any);
    };
  }

  /**
   * すべてのメッセージにロケールを適用した新しいChainBuilderインスタンスを返す
   */
  applyLocale(locale: Ls[number]): ChainBuilder<Ls, Messages> {
    const clonedMessages = this.deepCloneWithLocale(this.messages, locale);
    return new ChainBuilder(this.locales, locale, clonedMessages);
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

  build(): Messages {
    return this.messages;
  }
}

export function createChainBuilder<const Ls extends readonly string[]>(
  locales: Ls,
  locale: Ls[number],
): ChainBuilder<Ls, {}> {
  return new ChainBuilder(locales, locale);
}
