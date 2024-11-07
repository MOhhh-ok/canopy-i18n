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
