import { I18nMessage, LocalizedMessage } from "./message";
import { Template } from "./types";

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

  add<K extends string, C>(
    key: K extends keyof Messages ? never : K,
    data: Record<Ls[number], Template<C>>,
    fallback?: Ls[number],
  ): ChainBuilder<Ls, Messages & Record<K, LocalizedMessage<Ls, C>>>;
  add<K extends string>(
    key: K extends keyof Messages ? never : K,
    data: Record<Ls[number], string>,
    fallback?: Ls[number],
  ): ChainBuilder<Ls, Messages & Record<K, LocalizedMessage<Ls, void>>>;
  add<K extends string, C>(
    key: K extends keyof Messages ? never : K,
    data: Record<Ls[number], any>,
    fallback?: Ls[number],
  ): ChainBuilder<Ls, Messages & Record<K, LocalizedMessage<Ls, C>>> {
    const msg = new I18nMessage<Ls, C>(this.locales, fallback ?? this.fallbackLocale).setData(data);
    const newMessages = { ...this.messages, [key]: msg } as Messages & Record<K, LocalizedMessage<Ls, C>>;
    return new ChainBuilder(this.locales, this.fallbackLocale, newMessages);
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
