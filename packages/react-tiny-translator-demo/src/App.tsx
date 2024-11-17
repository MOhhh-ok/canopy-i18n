import { TranslatorProvider } from '@masa-dev/react-tiny-translator';
import { useState } from 'react';
import { Page } from './Page';

export default function App() {
    const [locale, setLocale] = useState('en');

    return <TranslatorProvider locale={locale} setLocale={setLocale}>
        <Page />
    </TranslatorProvider>
}
