# canopy-i18n

A tiny, type-safe i18n library for building localized messages with builder pattern and applying locales across nested data structures.

## Features
- **Type-safe locales**: Compile-time safety for allowed locale keys.
- **Builder pattern**: Chain methods to build multiple messages at once.
- **String or template functions**: Use plain strings or `(ctx) => string` templates.
- **Flexible templating**: Templates are plain functions, so you can freely use JavaScript template literals, conditionals, helpers, or any formatting library.
- **Deep locale application**: Switch locale across entire object/array trees, including nested builders.

## Installation

```bash
npm install canopy-i18n
# or
pnpm add canopy-i18n
# or
yarn add canopy-i18n
# or
bun add canopy-i18n
```

## Quick Start

```ts
import { createI18n, bindLocale } from 'canopy-i18n';

// 1) Create a builder with allowed locales
const baseBuilder = createI18n(['ja', 'en'] as const);

// 2) Define messages using method chaining (store in a variable)
const builder = baseBuilder
  .add({
    title: {
      ja: 'タイトルテスト',
      en: 'Title Test',
    },
    greeting: {
      ja: 'こんにちは',
      en: 'Hello',
    },
  })
  .addTemplates<{ name: string; age: number }>()({
    welcome: {
      ja: (ctx) => `こんにちは、${ctx.name}さん。あなたは${ctx.age}歳です。`,
      en: (ctx) => `Hello, ${ctx.name}. You are ${ctx.age} years old.`,
    },
  });

// 3) Reuse the builder to create messages for different locales
const enMessages = builder.build('en');
const jaMessages = builder.build('ja');

// 4) Render messages (English)
console.log(enMessages.title.render());                        // "Title Test"
console.log(enMessages.greeting.render());                     // "Hello"
console.log(enMessages.welcome.render({ name: 'Tanaka', age: 20 })); // "Hello, Tanaka. You are 20 years old."

// 5) Render messages (Japanese)
console.log(jaMessages.title.render());                        // "タイトルテスト"
console.log(jaMessages.greeting.render());                     // "こんにちは"
console.log(jaMessages.welcome.render({ name: 'Tanaka', age: 20 })); // "こんにちは、Tanakaさん。あなたは20歳です。"
```

## API

### `createI18n(locales)`
Creates a `ChainBuilder` instance to build localized messages.

- **locales**: `readonly string[]` — Allowed locale keys (e.g. `['ja', 'en'] as const`).
- Returns: `ChainBuilder<Locales, {}>` — A builder instance to chain message definitions.

```ts
const builder = createI18n(['ja', 'en', 'fr'] as const);
```

### `ChainBuilder`
A builder class for creating multiple localized messages with method chaining.

#### `.add(entries)`
Adds multiple string messages at once.

- **entries**: `Record<string, Record<Locale, string>>`
- Returns: `ChainBuilder` with added messages

```ts
const builder = createI18n(['ja', 'en'] as const)
  .add({
    title: { ja: 'タイトル', en: 'Title' },
    greeting: { ja: 'こんにちは', en: 'Hello' },
  });
```

#### `.addTemplates<Context>()(entries)`
Adds multiple template function messages at once with a unified context type.

Note: This uses a curried API for better type inference. Call `addTemplates<Context>()` first, then call the returned function with entries.

- **Context**: Type parameter for the template function context
- **entries**: `Record<string, Record<Locale, (ctx: Context) => string>>`
- Returns: `ChainBuilder` with added template messages

```ts
const builder = createI18n(['ja', 'en'] as const)
  .addTemplates<{ name: string; age: number }>()({
    greet: {
      ja: (ctx) => `こんにちは、${ctx.name}さん。${ctx.age}歳ですね。`,
      en: (ctx) => `Hello, ${ctx.name}. You are ${ctx.age}.`,
    },
    farewell: {
      ja: (ctx) => `さようなら、${ctx.name}さん。`,
      en: (ctx) => `Goodbye, ${ctx.name}.`,
    },
  });
```

#### `.build(locale?)`
Builds the final messages object.

- **locale**: (optional) `Locale` — If provided, sets this locale on all messages before returning. If omitted, uses the first locale in the locales array as default.
- Returns: `Messages` — An object containing all defined messages

```ts
// Build with default locale (first in array)
const defaultMessages = builder.build();

// Build with specific locale
const englishMessages = builder.build('en');
const japaneseMessages = builder.build('ja');
```

**Note**: `build(locale)` creates a deep clone and does not mutate the builder instance, allowing you to build multiple locale versions from the same builder.

#### `.clone()`
Creates an independent copy of the current builder with all its messages.

- Returns: `ChainBuilder<Locales, Messages>` — A new builder instance with cloned messages

```ts
const builder1 = createI18n(['ja', 'en'] as const)
  .add({
    title: { ja: 'タイトル', en: 'Title' },
  });

const builder2 = builder1.clone().add({
  greeting: { ja: 'こんにちは', en: 'Hello' },
});

const messages1 = builder1.build('ja');
const messages2 = builder2.build('ja');

console.log(messages1.title.render());    // "タイトル"
console.log(messages1.greeting);          // undefined

console.log(messages2.title.render());    // "タイトル"
console.log(messages2.greeting.render()); // "こんにちは"
```

**Note**: `clone()` creates a deep copy of all messages, allowing you to branch off from a base builder and add different messages independently.

### `I18nMessage<Locales, Context>`
Represents a single localized message.

#### Properties
- `locales: Locales` — Readonly array of allowed locales
- `locale: Locale` — Current active locale (getter)
- `data: Record<Locale, Template<Context>>` — Message data for all locales (getter)

#### Methods
- `setLocale(locale: Locale): this` — Sets the active locale
- `setData(data: Record<Locale, Template<Context>>): this` — Sets the message data
- `render(ctx?: Context): string` — Renders the message for the active locale

```ts
const message = messages.title;
console.log(message.locale);           // Current locale
console.log(message.render());         // Rendered string

message.setLocale('ja');
console.log(message.render());         // Japanese version
```

### `bindLocale(obj, locale)`
Recursively traverses objects/arrays and sets the given locale on all `I18nMessage` instances and builds all `ChainBuilder` instances encountered.

- **obj**: Any object/array structure containing messages or builders
- **locale**: The locale to apply
- Returns: A new structure with locale applied (containers are cloned, message instances are updated in place)

```ts
const data = {
  common: builder1,
  nested: {
    special: builder2,
  },
};

const localized = bindLocale(data, 'en');
console.log(localized.common.title.render());      // English version
console.log(localized.nested.special.msg.render()); // English version
```

**Note**: `bindLocale` works with both `ChainBuilder` instances (automatically building them with the specified locale) and already-built message objects (updating their locale).

## Types

```ts
export type Template<C> = string | ((ctx: C) => string);
export type LocalizedMessage<Locales, Context> = I18nMessage<Locales, Context>;
```

## Exports

```ts
export { createI18n, ChainBuilder } from 'canopy-i18n';
export { I18nMessage, isI18nMessage } from 'canopy-i18n';
export { bindLocale, isChainBuilder } from 'canopy-i18n';
export type { Template, LocalizedMessage } from 'canopy-i18n';
```

## Usage Patterns

### Basic String Messages

```ts
const messages = createI18n(['ja', 'en'] as const)
  .add({
    title: { ja: 'タイトル', en: 'Title' },
    greeting: { ja: 'こんにちは', en: 'Hello' },
    farewell: { ja: 'さようなら', en: 'Goodbye' },
  })
  .build('en');

console.log(messages.title.render());    // "Title"
console.log(messages.greeting.render()); // "Hello"
```

### Template Functions with Context

```ts
const messages = createI18n(['ja', 'en'] as const)
  .addTemplates<{ name: string; age: number }>()({
    profile: {
      ja: (ctx) => `名前: ${ctx.name}、年齢: ${ctx.age}歳`,
      en: (ctx) => `Name: ${ctx.name}, Age: ${ctx.age}`,
    },
  })
  .build('en');

console.log(messages.profile.render({ name: 'Taro', age: 25 }));
// "Name: Taro, Age: 25"
```

### Mixing String and Template Messages

```ts
const messages = createI18n(['ja', 'en'] as const)
  .add({
    title: { ja: 'タイトル', en: 'Title' },
  })
  .addTemplates<{ count: number }>()({
    items: {
      ja: (ctx) => `${ctx.count}個のアイテム`,
      en: (ctx) => `${ctx.count} items`,
    },
  })
  .build('ja');

console.log(messages.title.render());           // "タイトル"
console.log(messages.items.render({ count: 5 })); // "5個のアイテム"
```

### Using Clone for Shared Base Messages

```ts
// Create a base builder with common messages
const baseBuilder = createI18n(['ja', 'en'] as const)
  .add({
    common: { ja: '共通', en: 'Common' },
    error: { ja: 'エラー', en: 'Error' },
  });

// Clone and extend for admin pages
const adminMessages = baseBuilder.clone()
  .add({
    adminTitle: { ja: '管理画面', en: 'Admin Panel' },
  })
  .build('en');

// Clone and extend for user pages
const userMessages = baseBuilder.clone()
  .add({
    userTitle: { ja: 'ユーザー画面', en: 'User Panel' },
  })
  .build('en');

console.log(adminMessages.common.render());     // "Common"
console.log(adminMessages.adminTitle.render()); // "Admin Panel"
console.log(userMessages.common.render());      // "Common"
console.log(userMessages.userTitle.render());   // "User Panel"
```

### Namespace Pattern (Split Files)

```ts
// i18n/locales.ts
export const LOCALES = ['ja', 'en'] as const;

// i18n/common.ts
import { createI18n } from 'canopy-i18n';
import { LOCALES } from './locales';

export const common = createI18n(LOCALES).add({
  hello: { ja: 'こんにちは', en: 'Hello' },
  goodbye: { ja: 'さようなら', en: 'Goodbye' },
});

// i18n/user.ts
import { createI18n } from 'canopy-i18n';
import { LOCALES } from './locales';

export const user = createI18n(LOCALES).addTemplates<{ name: string }>()({
  welcome: {
    ja: (ctx) => `ようこそ、${ctx.name}さん`,
    en: (ctx) => `Welcome, ${ctx.name}`,
  },
});

// i18n/index.ts
export { common } from './common';
export { user } from './user';

// app.ts
import { bindLocale } from 'canopy-i18n';
import * as i18n from './i18n';

const messages = bindLocale(i18n, 'en');
console.log(messages.common.hello.render());              // "Hello"
console.log(messages.user.welcome.render({ name: 'John' })); // "Welcome, John"
```

### Dynamic Locale Switching

```ts
const builder = createI18n(['ja', 'en'] as const)
  .add({
    title: { ja: 'タイトル', en: 'Title' },
  });

// Build different locale versions from the same builder
const jaMessages = builder.build('ja');
const enMessages = builder.build('en');

console.log(jaMessages.title.render()); // "タイトル"
console.log(enMessages.title.render()); // "Title"

// Or use bindLocale to switch locale dynamically
const messages = builder.build();
const localizedJa = bindLocale(messages, 'ja');
const localizedEn = bindLocale(messages, 'en');
```

### Deep Nested Structures

```ts
const structure = {
  header: createI18n(['ja', 'en'] as const)
    .add({ title: { ja: 'ヘッダー', en: 'Header' } }),
  content: {
    main: createI18n(['ja', 'en'] as const)
      .add({ body: { ja: '本文', en: 'Body' } }),
    sidebar: createI18n(['ja', 'en'] as const)
      .add({ widget: { ja: 'ウィジェット', en: 'Widget' } }),
  },
};

const localized = bindLocale(structure, 'en');
console.log(localized.header.title.render());           // "Header"
console.log(localized.content.main.body.render());      // "Body"
console.log(localized.content.sidebar.widget.render()); // "Widget"
```


## Repository

https://github.com/MOhhh-ok/canopy-i18n
