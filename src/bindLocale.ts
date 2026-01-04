import { ChainBuilder } from "./chainBuilder";
import { I18nMessage, isI18nMessage } from "./message";

export function isChainBuilder(x: unknown): x is ChainBuilder<any, any> {
  return x instanceof ChainBuilder;
}

// ChainBuilderをMessagesに変換する型ヘルパー
type UnwrapChainBuilder<T> = T extends ChainBuilder<any, infer Messages> ? Messages
  : T;

// 深くネストされた構造を再帰的に変換する型
// I18nMessageはそのまま保持し、ChainBuilderのみMessages型に変換
type DeepUnwrapChainBuilders<T> = T extends I18nMessage<any, any> ? T
  : T extends ChainBuilder<any, infer Messages> ? Messages
  : T extends readonly any[] ? { [K in keyof T]: DeepUnwrapChainBuilders<T[K]> }
  : T extends object ? { [K in keyof T]: DeepUnwrapChainBuilders<T[K]> }
  : T;

export function bindLocale<T extends object>(
  obj: T,
  locale: string,
): DeepUnwrapChainBuilders<T> {
  function visit(v: any): any {
    if (isChainBuilder(v)) {
      return v.build(locale as any);
    }
    if (isI18nMessage(v)) {
      v.setLocale(locale as any);
      return v;
    }
    if (Array.isArray(v)) {
      return (v as any[]).map(visit);
    }
    if (v && typeof v === "object") {
      const out: Record<string, any> = {};
      for (const k of Object.keys(v)) {
        out[k] = visit((v as any)[k]);
      }
      return out;
    }
    return v;
  }
  return visit(obj) as DeepUnwrapChainBuilders<T>;
}
