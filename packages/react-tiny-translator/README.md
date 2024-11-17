# React Tiny Translator

This is a simple translator for react.

## Install

```
npm i @masa-dev/react-tiny-translator
```

## Usage

Initialize instance.

```typescript
// translator.ts

import { TinyTranslator } from '@masa-dev/tiny-translator';

const locales = ['en', 'ja'];
const defaultLocale = 'en';

export const translator = new TinyTranslator(locales, defaultLocale);
```

Use translator with data.

```typescript
// Page.tsx

import { useTranslator } from '@masa-dev/react-tiny-translator';
import { translator } from './translator';

const tData = translator.generate({
    title: {
        en: 'My Page',
        ja: 'マイページ'
    },
    description: {
        en: "This is {{name}}'s page.",
        ja: 'これは{{name}}のページです。'
    }
});

export function Page() {
    const t = useTranslator(tData);
    return <div>
        <h1>{t('title')}</h1>
        <p>{t('description', { name: 'John' })}</p>
    </div>
}
```

Set provider on root.

```typescript
// App.tsx

import { TranslatorProvider } from '@masa-dev/react-tiny-translator';
import { useState } from 'react';
import { Page } from './Page';

export default function App() {
    const [locale, setLocale] = useState('en');

    return <TranslatorProvider locale={locale} setLocale={setLocale}>
        <Page />
    </TranslatorProvider>
}
```

You can also create locale change component.

```typescript
// LocaleSelect.tsx

import { useLocale } from '@masa-dev/react-tiny-translator';

export function LocaleSelect() {
    const { locale, setLocale } = useLocale();
    
    return <select value={locale} onChange={e => setLocale(e.target.value)}>
        <option value='en'>English</option>
        <option value='ja'>Japanese</option>
    </select>
}
```

## Provider

This library has one provider, and two hooks.

Provider: TranslatorProvider

hooks: useTranslator, useLocale