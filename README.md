## canopy-i18n

A tiny, type-safe i18n helper for building localized messages and applying a locale across nested data structures.

### Features
- **Type-safe locales**: Compile-time safety for allowed locale keys.
- **Per-message fallback**: Each message knows its default and fallback locale.
- **Template or string**: Use plain strings or `(ctx) => string` templates.
- **Flexible templating**: Since templates are plain functions, you can freely use JavaScript template literals, conditionals, helpers, or any formatting library. This library does not provide a tagged template literal API.
- **Deep locale application**: Switch locale across entire object/array trees.

## Installation

```bash
npm install canopy-i18n
# or
pnpm add canopy-i18n
# or
yarn add canopy-i18n
```

## Quick start

```ts
import { createMessageBuilder, applyLocaleDeep } from 'canopy-i18n';

// 1) Declare allowed locales and fallback
const builder = createMessageBuilder(['ja', 'en'] as const, 'ja');

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

### createMessageBuilder(locales, fallbackLocale)
Returns a `builder` function to create localized messages.

- **locales**: `readonly string[]` — Allowed locale keys (e.g. `['ja', 'en'] as const`).
- **fallbackLocale**: fallback locale when the active locale value is missing. New messages start with this locale active.

Overloads:
- `builder<Record<L[number], string>>() -> I18nMessage<L, void>`
- `builder<Record<L[number], Template<C>>>() -> I18nMessage<L, C>`

### I18nMessage<L, C>
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
Recursively traverses arrays/objects and sets the given `locale` on all `I18nMessage` instances encountered.

- Returns a new container (arrays/objects are cloned), but reuses the same message instances after updating their locale.

## Types

```ts
export type Template<C> = string | ((ctx: C) => string);
```

## Exports

```ts
export { I18nMessage, isI18nMessage } from 'canopy-i18n';
export { createMessageBuilder } from 'canopy-i18n';
export { applyLocaleDeep } from 'canopy-i18n';
export type { Template } from 'canopy-i18n';
export type { LocalizedMessage } from 'canopy-i18n';
```

## Notes
- CommonJS build (`main: dist/index.js`) with TypeScript type declarations (`types: dist/index.d.ts`).
- Works in Node or bundlers; recommended usage is TypeScript/ESM import via your build tool.
- License: MIT.
 - Not a tagged template library: you write plain functions (examples use JS template literals inside those functions).

### Split files example (namespace import)

Import all message exports as a namespace and set the locale across the whole tree.

```ts
// messages.ts
import { createMessageBuilder } from 'canopy-i18n';
const builder = createMessageBuilder(['ja', 'en'] as const, 'ja');

export const title = builder({
  ja: 'タイトルテスト',
  en: 'Title Test',
});

export const msg = builder<{ name: string; age: number }>({
  ja: c => `こんにちは、${c.name}さん。あなたは${c.age}歳です。`,
  en: c => `Hello, ${c.name}. You are ${c.age} years old.`,
});
```

```ts
// usage.ts
import * as messages from './messages';
import { applyLocaleDeep } from 'canopy-i18n';

const m = applyLocaleDeep(messages, 'en');

console.log(m.title.render());                     // "Title Test"
console.log(m.msg.render({ name: 'Tanaka', age: 20 }));
```

#### Multi-file structure

```ts
// i18n/builder.ts
import { createMessageBuilder } from 'canopy-i18n';
export const builder = createMessageBuilder(['ja', 'en'] as const, 'ja');
```

```ts
// i18n/messages/common.ts
import { builder } from '../builder';
export const hello = builder({ ja: 'こんにちは', en: 'Hello' });
```

```ts
// i18n/messages/home.ts
import { builder } from '../builder';
export const title = builder({ ja: 'タイトル', en: 'Title' });
```

```ts
// i18n/messages/index.ts
export * as common from './common';
export * as home from './home';
```

```ts
// usage.ts
import * as msgs from './i18n/messages';
import { applyLocaleDeep } from 'canopy-i18n';

const m = applyLocaleDeep(msgs, 'en');

console.log(m.common.hello.render()); // "Hello"
console.log(m.home.title.render());   // "Title"
```

Note: Module namespace objects are read-only; `applyLocaleDeep` returns a cloned plain object while updating each `I18nMessage` instance's locale in place.
