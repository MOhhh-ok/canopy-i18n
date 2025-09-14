import { isI18nMessage } from "./message";

export function applyLocaleDeep<T extends object>(obj: T, locale: string): T {
  function visit(v: any): any {
    if (isI18nMessage(v)) {
      v.setLocale(locale as any);
      return v;
    }
    if (Array.isArray(v)) {
      return (v as any[]).map(visit);
    }
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


