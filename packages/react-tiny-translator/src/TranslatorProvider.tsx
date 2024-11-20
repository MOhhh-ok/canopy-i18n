"use client"

import { ReactNode } from 'react';
import { TranslatorContext } from './hooks.js';

export type TranslatorProviderProps<L extends string> = {
    locale: L;
    setLocale: (locale: L) => void;
    children: ReactNode
}

export function TranslatorProvider<L extends string>(props: TranslatorProviderProps<L>) {
    const { locale, setLocale } = props;

    return <TranslatorContext.Provider value={{ locale, setLocale }}>
        {props.children}
    </TranslatorContext.Provider>
}
