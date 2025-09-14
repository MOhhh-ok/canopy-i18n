## local-i18n

A tiny, type-safe i18n helper for building localized messages and applying a locale across nested data structures.

### Features
- **Type-safe locales**: Compile-time safety for allowed locale keys.
- **Per-message fallback**: Each message knows its default and fallback locale.
- **Template or string**: Use plain strings or `(ctx) => string` templates.
- **Deep locale application**: Switch locale across entire object/array trees.

## Installation

```bash
npm install local-i18n
# or
pnpm add local-i18n
# or
yarn add local-i18n
```

## Quick start

```ts
import { createMessageBuilder, applyLocaleDeep } from 'local-i18n';

// 1) Declare allowed locales and defaults
const builder = createMessageBuilder(['ja', 'en'] as const, 'ja', 'ja');

// 2) Define messages
const title = builder({
  ja: 'タイトルテスト',
  en: 'Title Test',
});

const msg = builder<{ name: string; age: number }>({
  ja: c => `こんにちは、${c.name}さん。あなたは${c.age}歳です。`,
  en: c => `Hello, ${c.name}. You are ${c.age} years old.`,
});

// 3) Compose nested data structures
const data = {
  title,
  nested: {
    hello: builder({ ja: 'こんにちは', en: 'Hello' }),
  },
};

// 4) Apply locale across the tree
const localized = applyLocaleDeep(data, 'en');

console.log(localized.title.render());       // "Title Test"
console.log(localized.nested.hello.render()); // "Hello"
console.log(msg.setLocale('en').render({ name: 'Tanaka', age: 20 }));
```

## API

### createMessageBuilder(locales, locale, fallbackLocale)
Returns a `builder` function to create localized messages.

- **locales**: `readonly string[]` — Allowed locale keys (e.g. `['ja', 'en'] as const`).
- **locale**: default active locale for new messages.
- **fallbackLocale**: fallback locale when the active locale value is missing.

Overloads:
- `builder<Record<L[number], string>>() -> Li18nMessage<L, void>`
- `builder<Record<L[number], Template<C>>>() -> Li18nMessage<L, C>`

### Li18nMessage<L, C>
Represents a single localized message.

- **properties**
  - `locales: L`
  - `locale: L[number]` (getter)
  - `fallbackLocale: L[number]` (getter)
  - `data: Record<L[number], Template<C>>`
- **methods**
  - `setLocale(locale: L[number]): this`
  - `setFallbackLocale(locale: L[number]): this`
  - `render(ctx?: C): string` — If the value for the active locale is a function, it’s invoked with `ctx`; otherwise the string is returned. Falls back to `fallbackLocale` if needed.

### applyLocaleDeep(obj, locale)
Recursively traverses arrays/objects and sets the given `locale` on all `Li18nMessage` instances encountered.

- Returns a new container (arrays/objects are cloned), but reuses the same message instances after updating their locale.

## Types

```ts
export type Template<C> = string | ((ctx: C) => string);
```

## Exports

```ts
export { Li18nMessage, isLi18nMessage } from 'local-i18n';
export { createMessageBuilder } from 'local-i18n';
export { applyLocaleDeep } from 'local-i18n';
export type { Template } from 'local-i18n';
export type { LocalizedMessage } from 'local-i18n';
```

## Notes
- CommonJS build (`main: dist/index.js`) with TypeScript type declarations (`types: dist/index.d.ts`).
- Works in Node or bundlers; recommended usage is TypeScript/ESM import via your build tool.
- License: MIT.
