import { TinyTranslator } from './TinyTranslator';

describe('tinyTranslator', () => {
    it('should translate text based on locale', () => {
        const translator = new TinyTranslator(['ja', 'en'], 'ja');
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

        const tJa = tData.locale('ja');
        expect(tJa('Hello', { name: 'John' })).toBe('こんにちは, John');
        expect(tJa('World')).toBe('世界');

        const tEn = tData.locale('en');
        expect(tEn('Hello', { name: 'John' })).toBe('Hello, John');
        expect(tEn('World')).toBe('World');

        const tUndefined = tData.locale(undefined);
        expect(tUndefined('Hello', { name: 'John' })).toBe('こんにちは, John');
        expect(tUndefined('World')).toBe('世界');
    });
});
