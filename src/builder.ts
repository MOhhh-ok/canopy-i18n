import { Template } from "./types";
import { Li18nMessage, LocalizedMessage } from "./message";

export function createMessageBuilder<const Ls extends readonly string[]>(
  locales: Ls,
  locale: Ls[number],
  fallbackLocale: Ls[number]
) {
  function builder<C>(data: Record<Ls[number], Template<C>>): LocalizedMessage<Ls, C>;
  function builder(data: Record<Ls[number], string>): LocalizedMessage<Ls, void>;
  function builder(data: Record<Ls[number], any>): LocalizedMessage<Ls, any> {
    return new Li18nMessage(locales, locale, fallbackLocale, data);
  }
  return builder;
}


