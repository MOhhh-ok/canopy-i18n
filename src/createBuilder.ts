export type Template<C> = string | ((ctx: C) => string);

function isTemplateFunction<C>(t: Template<C>): t is (ctx: C) => string {
  return typeof t === 'function';
}

export type Built<Ls extends readonly string[], C> = {
  locales: Ls;
  defaultLocale: Ls[number];
  data: Record<Ls[number], Template<C>>;
  render(locale: Ls[number], ctx: C): string;
};

export function createBuilder<const Ls extends readonly string[]>(
  locales: Ls,
  defaultLocale: Ls[number]
) {
  return function builder<C>(data: Record<Ls[number], Template<C>>): Built<Ls, C> {
    const render: (locale: Ls[number], ctx: C) => string = (locale, ctx) => {
      const v = data[locale] ?? data[defaultLocale];
      return isTemplateFunction(v) ? v(ctx) : (v as string);
    };
    return {
      locales,
      defaultLocale,
      data,
      render
    };
  };
}

if (import.meta.main) {
  const builder = createBuilder(['ja', 'en'] as const, 'ja');

  const msg = builder<{ name: string, age: number }>({
    ja: c => `こんにちは、${c.name}さん、${c.age + 10}歳です。`,
    en: 'Hello'
  });

  console.log(msg.render('ja', { name: '田中', age: 20 })); // こんにちは、田中さん
  console.log(msg.render('en', { name: 'Tanaka', age: 20 })); // Hello
}