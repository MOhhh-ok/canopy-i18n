import { Template } from "./types";
import { I18nMessage, LocalizedMessage } from "./message";

export function createMessageBuilder<const Ls extends readonly string[]>(
  locales: Ls,
  fallbackLocale: Ls[number]
) {
  function builder<C>(data: Record<Ls[number], Template<C>>): LocalizedMessage<Ls, C>;
  function builder(data: Record<Ls[number], string>): LocalizedMessage<Ls, void>;
  function builder(data: Record<Ls[number], any>): LocalizedMessage<Ls, any> {
    return new I18nMessage<Ls, any>(locales, fallbackLocale).setData(data);
  }
  return builder;
}


