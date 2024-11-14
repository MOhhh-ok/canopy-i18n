import { ReactNode } from 'react';
import { TranslatorContext } from './utils';
import { TinyTranslator } from '@masa-dev/tiny-translator';

export type TranslatorProviderProps<L extends string> = {
    translator?: TinyTranslator<L>;
    locale: L;
    children: ReactNode
}

export function TranslatorProvider<L extends string>(props: TranslatorProviderProps<L>) {
    const { locale, translator } = props;

    return <TranslatorContext.Provider value={{ translator: translator as any, locale }}>
        {props.children}
    </TranslatorContext.Provider>
}
