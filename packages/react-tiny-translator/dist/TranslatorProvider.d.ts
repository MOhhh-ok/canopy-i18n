import { ReactNode } from 'react';
import { TinyTranslator } from '@masa-dev/tiny-translator';
export type TranslatorProviderProps<L extends string> = {
    translator?: TinyTranslator<L>;
    locale: L;
    children: ReactNode;
};
export declare function TranslatorProvider<L extends string>(props: TranslatorProviderProps<L>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TranslatorProvider.d.ts.map