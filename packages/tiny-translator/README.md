# Tiny Translator

This is a simple translator.

## Install

```
npm i @masa-dev/tiny-translator
```

## Usage

```typescript
type LOCALE = 'ja' | 'en';

const tData = tinyTranslator<LOCALE>({
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