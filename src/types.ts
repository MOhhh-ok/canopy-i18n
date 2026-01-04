export type Template<C, R = string> = R | ((ctx: C) => R);

export function isTemplateFunction<C, R = string>(
  t: Template<C, R>,
): t is (ctx: C) => R {
  return typeof t === "function";
}
