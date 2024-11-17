import { ReactNode } from 'react';
export type TranslatorProviderProps<L extends string> = {
    locale: L;
    setLocale: (locale: L) => void;
    children: ReactNode;
};
export declare function TranslatorProvider<L extends string>(props: TranslatorProviderProps<L>): import("react/jsx-runtime").JSX.Element;
