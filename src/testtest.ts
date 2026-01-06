import { createI18n } from "./chainBuilder.js";

const a = createI18n(["ja", "en"] as const);
const b = a
  .add({ abc: { ja: "abc", en: "abc" } })
  .addTemplates<{ aa: string }>()({
    bb: { ja: ({ aa }) => `${aa}aa`, en: ({ aa }) => `${aa}bb` },
  });
const c = b.build("en");
const e = { ...c.abc, toString: () => "aaa" };

console.log(c.bb({ aa: "name" }));
console.log(`${c.bb({ aa: "name" })}`);
console.log("aaa" + c.bb({ aa: "name" }));
console.log(`${c.bb({ aa: "name" })}`);
console.log(`${c.abc()}`);
