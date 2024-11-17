import { ReactNode } from 'react';
import { TranslatorContext } from './utils';

export type TranslatorProviderProps<L extends string> = {
    locale: L;
    children: ReactNode
}

export function TranslatorProvider<L extends string>(props: TranslatorProviderProps<L>) {
    const { locale } = props;

    return <TranslatorContext.Provider value={{ locale }}>
        {props.children}
    </TranslatorContext.Provider>
}
