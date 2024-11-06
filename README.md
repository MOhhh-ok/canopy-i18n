# Tiny Translator

This is a simple translator. Type safe.

## Core

```typescript
const tData = tinyTranslator({
    Hello: {
        en: 'Hello, {{name}}',
        ja: 'こんにちは, {{name}}',
    },
    World: {
        en: 'World',
        ja: '世界',
    },
});

const tJa = tData.locale('ja');

// こんにちは、太郎
tJa('Hello', { name: '太郎' });

const tEn = tData.locale('en');

// World
tEn('World');
```

## License

ISC