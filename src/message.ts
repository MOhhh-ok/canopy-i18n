import { Template } from "./types";

function isTemplateFunction<C>(t: Template<C>): t is (ctx: C) => string {
  return typeof t === 'function';
}

export class Li18nMessage<Ls extends readonly string[], C> {
  constructor(
    public readonly locales: Ls,
    private _locale: Ls[number],
    private _fallbackLocale: Ls[number],
    public readonly data: Record<Ls[number], Template<C>>
  ) { }

  get locale(): Ls[number] {
    return this._locale;
  }

  get fallbackLocale(): Ls[number] {
    return this._fallbackLocale;
  }

  setLocale(locale: Ls[number]) {
    this._locale = locale;
    return this;
  }

  setFallbackLocale(locale: Ls[number]) {
    this._fallbackLocale = locale;
    return this;
  }

  render(this: Li18nMessage<Ls, void>): string;
  render(ctx: C): string;
  render(ctx?: C): string {
    const v = this.data[this._locale] ?? this.data[this._fallbackLocale];
    return isTemplateFunction(v) ? v(ctx as C) : (v as string);
  }
}

export type LocalizedMessage<Ls extends readonly string[], C> = Li18nMessage<Ls, C>;

export function isLi18nMessage(x: unknown): x is Li18nMessage<any, any> {
  return x instanceof Li18nMessage;
}


