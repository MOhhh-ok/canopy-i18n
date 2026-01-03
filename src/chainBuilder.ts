import { I18nMessage, LocalizedMessage } from "./message";

export class ChainBuilder<
  const Ls extends readonly string[],
  Messages extends Record<string, I18nMessage<Ls, any>> = {},
> {
  private messages: Messages;

  constructor(
    private readonly locales: Ls,
    private readonly fallbackLocale: Ls[number],
    messages?: Messages,
  ) {
    this.messages = (messages ?? {}) as Messages;
  }

  /**
   * 文字列指定版: 複数のメッセージを一度に追加
   */
  add<Entries extends Record<string, Record<Ls[number], string>>>(
    entries: { [K in keyof Entries]: K extends keyof Messages ? never : Entries[K] },
    fallback?: Ls[number],
  ): ChainBuilder<
    Ls,
    Messages & { [K in keyof Entries]: LocalizedMessage<Ls, void> }
  > {
    const newMessages = { ...this.messages };

    for (const [key, data] of Object.entries(entries)) {
      const msg = new I18nMessage<Ls, void>(this.locales, fallback ?? this.fallbackLocale).setData(data);
      (newMessages as any)[key] = msg;
    }

    return new ChainBuilder(this.locales, this.fallbackLocale, newMessages as any);
  }

  /**
   * 関数指定版: 複数のテンプレート関数を一度に追加(型は統一)
   */
  addTemplates<C>(): <Entries extends Record<string, Record<Ls[number], (ctx: C) => string>>>(
    entries: { [K in keyof Entries]: K extends keyof Messages ? never : Entries[K] },
    fallback?: Ls[number],
  ) => ChainBuilder<
    Ls,
    Messages & { [K in keyof Entries]: LocalizedMessage<Ls, C> }
  > {
    return <Entries extends Record<string, Record<Ls[number], (ctx: C) => string>>>(
      entries: { [K in keyof Entries]: K extends keyof Messages ? never : Entries[K] },
      fallback?: Ls[number],
    ): ChainBuilder<
      Ls,
      Messages & { [K in keyof Entries]: LocalizedMessage<Ls, C> }
    > => {
      const newMessages = { ...this.messages };

      for (const [key, data] of Object.entries(entries)) {
        const msg = new I18nMessage<Ls, C>(this.locales, fallback ?? this.fallbackLocale).setData(data);
        (newMessages as any)[key] = msg;
      }

      return new ChainBuilder(this.locales, this.fallbackLocale, newMessages as any);
    };
  }

  build(): Messages {
    return this.messages;
  }
}

export function createChainBuilder<const Ls extends readonly string[]>(
  locales: Ls,
  fallbackLocale: Ls[number],
): ChainBuilder<Ls, {}> {
  return new ChainBuilder(locales, fallbackLocale);
}
