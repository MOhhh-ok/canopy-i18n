import type { Template } from "./types";
import { isTemplateFunction } from "./types";

export type LocalizedMessage<Ls extends readonly string[], C, R = string> = I18nMessage<Ls, C, R>;

export function isI18nMessage(x: unknown): x is I18nMessage<any, any, any> {
  return x instanceof I18nMessage;
}

export class I18nMessage<Ls extends readonly string[], C, R = string> {
  public readonly locales: Ls;
  private _locale: Ls[number];
  private _data!: Record<Ls[number], Template<C, R>>;

  constructor(
    locales: Ls,
    locale: Ls[number],
  ) {
    this.locales = locales;
    this._locale = locale;
  }

  get locale(): Ls[number] {
    return this._locale;
  }

  setLocale(locale: Ls[number]) {
    this._locale = locale;
    return this;
  }

  get data(): Record<Ls[number], Template<C, R>> {
    return this._data;
  }

  setData(data: Record<Ls[number], Template<C, R>>) {
    this._data = data;
    return this;
  }

  render(this: I18nMessage<Ls, void, R>): R;
  render(ctx: C): R;
  render(ctx?: C): R {
    const v = this._data[this._locale];
    if (isTemplateFunction<C, R>(v)) {
      return v(ctx as C);
    }
    return v as R;
  }
}
