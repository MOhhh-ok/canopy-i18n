import { I18nMessage, LocalizedMessage } from "./message";
import { Template } from "./types";

export function createBuilder<const Ls extends readonly string[]>(
  locales: Ls,
  locale: Ls[number],
) {
  function builder<C>(data: Record<Ls[number], Template<C>>, fb?: Ls[number]): LocalizedMessage<Ls, C>;
  function builder(data: Record<Ls[number], string>, fb?: Ls[number]): LocalizedMessage<Ls, void>;
  function builder(data: Record<Ls[number], any>, fb?: Ls[number]): LocalizedMessage<Ls, any> {
    return new I18nMessage<Ls, any>(locales, fb ?? locale).setData(data);
  }
  return builder;
}
