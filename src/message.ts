import { isTemplateFunction, Template } from "./types";

export type LocalizedMessage<Ls extends readonly string[], C> = I18nMessage<Ls, C>;

export function isI18nMessage(x: unknown): x is I18nMessage<any, any> {
  return x instanceof I18nMessage;
}

export class I18nMessage<Ls extends readonly string[], C> {
  private _locale: Ls[number];
  private _data!: Record<Ls[number], Template<C>>;

  constructor(
    public readonly locales: Ls,
    locale: Ls[number],
  ) {
    this._locale = locale;
  }

  get locale(): Ls[number] {
    return this._locale;
  }

  setLocale(locale: Ls[number]) {
    this._locale = locale;
    return this;
  }

  get data(): Record<Ls[number], Template<C>> {
    return this._data;
  }

  setData(data: Record<Ls[number], Template<C>>) {
    this._data = data;
    return this;
  }

  render(this: I18nMessage<Ls, void>): string;
  render(ctx: C): string;
  render(ctx?: C): string {
    const v = this._data[this._locale];
    return isTemplateFunction(v) ? v(ctx as C) : (v as string);
  }
}
