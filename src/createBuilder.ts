export type Template<C> = string | ((ctx: C) => string);

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

  render(ctx: C): string {
    const v = this.data[this._locale] ?? this.data[this._fallbackLocale];
    return isTemplateFunction(v) ? v(ctx) : (v as string);
  }
}

export type Built<Ls extends readonly string[], C> = Li18nMessage<Ls, C>;

export function createBuilder<const Ls extends readonly string[]>(
  locales: Ls,
  locale: Ls[number],
  fallbackLocale: Ls[number]
) {
  return function builder<C>(data: Record<Ls[number], Template<C>>): Built<Ls, C> {
    return new Li18nMessage(locales, locale, fallbackLocale, data);
  };
}

function isLi18nMessage(x: unknown): x is Li18nMessage<any, any> {
  return x instanceof Li18nMessage;
}

/**
 * Recursively set locale for any Li18nMessage instances found in the given value.
 * Always deep; does not change fallback locale (keeps builder defaults).
 *
 * Example:
 *   import * as trs from './testData';
 *   setLocales(trs, 'en');
 */
export function setLocales<T extends Record<string, unknown>>(obj: T, locale: string): T;
export function setLocales<T extends unknown[]>(obj: T, locale: string): T;
export function setLocales<T extends object>(obj: T, locale: string): T {
  function visit(v: any): any {
    if (isLi18nMessage(v)) {
      v.setLocale(locale as any);
      return v;
    }
    if (Array.isArray(v)) {
      return (v as any[]).map(visit);
    }
    // Traverse any non-null object (including module namespace objects),
    // but avoid special handling already covered above.
    if (v && typeof v === 'object') {
      const out: Record<string, any> = {};
      for (const k of Object.keys(v)) {
        out[k] = visit((v as any)[k]);
      }
      return out;
    }
    return v;
  }
  return visit(obj) as T;
}
