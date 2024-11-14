export type TinyTranslatorData<K extends string, L extends string> = Record<
    K,
    Record<L, string>
>;

export * from './TinyTranslator';
