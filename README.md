# Tiny Translator

This is a simple translator. Type safe.

## Core

```typescript
// tynyTranslator.ts

import { TinyTranslator } from '@masa-dev/tiny-translator';

const locales = ['ja', 'en'];
const defaultLocale = 'ja';

// Export instance with locales and defaul locale
export const translator = new TinyTranslator(locales, defaultLocale);
```

```typescript
// main.ts

import { translator } from './tinyTranslator';

// Generate data
const tData = translator.generate({
    Hello: {
        en: 'Hello, {{name}}',
        ja: 'こんにちは, {{name}}',
    },
    World: {
        en: 'World',
        ja: '世界',
    },
});

function main() {
    // Set locale
    const tJa = tData.locale('ja');

    // Output
    console.log(tJa('Hello', { name: '太郎' })); // こんにちは、太郎

    // Set locale
    const tEn = tData.locale('en');

    // Output
    console.log(tEn('World')); // World
}
```

## License

ISC