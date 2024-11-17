export type TinyTranslatorData<K extends string, L extends string> = Record<K, Record<L, string>>;
export type GetFunction<K extends string> = (key: K, data?: any) => string;
export type LocaleFunction<K extends string, L extends string> = (locale: L | null | undefined) => GetFunction<K>;
export type GenerateResult<K extends string, L extends string> = {
    locale: LocaleFunction<K, L>;
};
export * from './TinyTranslator';
