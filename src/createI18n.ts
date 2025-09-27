import { Template } from "./types";
import { I18nMessage, LocalizedMessage } from "./message";

export function createI18n<const Ls extends readonly string[]>(
  locales: Ls,
  fallbackLocale: Ls[number]
) {
  function builder<C>(data: Record<Ls[number], Template<C>>, fb?: Ls[number]): LocalizedMessage<Ls, C>;
  function builder(data: Record<Ls[number], string>, fb?: Ls[number]): LocalizedMessage<Ls, void>;
  function builder(data: Record<Ls[number], any>, fb?: Ls[number]): LocalizedMessage<Ls, any> {
    return new I18nMessage<Ls, any>(locales, fb ?? fallbackLocale).setData(data);
  }
  return builder;
}


