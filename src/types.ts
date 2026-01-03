export type Template<C> = string | ((ctx: C) => string);
export function isTemplateFunction<C>(t: Template<C>): t is (ctx: C) => string {
  return typeof t === "function";
}

/// test///

// type Function<TParams extends Record<string, any>, TResult> = (params: TParams) => TResult;
// function createFunction<TParams extends Record<string, any>, TResult>(
//   fn: (params: TParams) => TResult,
// ) {
//   return fn;
// }

// type Message<TLocales extends readonly string[], TParams extends Record<string, any>, TResult> = Record<
//   TLocales[number],
//   string | Function<TParams, TResult>
// >;

// function createMessage<TLocales extends readonly string[], TParams extends Record<string, any>, TResult>(
//   msgs: Message<TLocales, TParams, TResult>,
// ): Message<TLocales, TParams, TResult> {
//   return msgs;
// }

// function createMessageData<TLocales extends readonly string[], TParams extends Record<string, any>, TResult>(
//   params: {
//     locales: TLocales;
//     locale: TLocales[number];
//     messages: Message<TLocales, TParams, TResult>[];
//   },
// ) {
//   return params;
// }

// const aaa = createFunction((ctx: { a: number }) => "abc");
// aaa({ a: 2 });

// const LOCALES = ["ja", "en"] as const;
// const bbb = createMessage<typeof LOCALES, any, any>({ ja: "abc", en: "def" });

// const ccc = createMessageData({
//   locales: LOCALES,
//   locale: LOCALES[0],
//   messages: [{ en: "abc", ja: "def" }],
// });
