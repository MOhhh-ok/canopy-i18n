import { createI18n } from "./chainBuilder.js";

const a = createI18n(["ja", "en"] as const);
const b = a
  .add({ abc: { ja: "abc", en: "abc" } })
  .addTemplates<{ aa: string }>()({
    bb: { ja: ({ aa }) => `${aa}aa`, en: ({ aa }) => `${aa}bb` },
  });
const c = b.build("en");
const e = { ...c.abc, toString: () => "aaa" };

const d = b.add<string, "aaa" | "bbb">({
  aaa: { ja: "aaa", en: "aaa" },
  bbb: { ja: "bbb", en: "bbb" },
});

const f = b.addTemplates<{ a: string }, string, "aaa" | "bbb">()({
  aaa: { ja: ({ a }) => `${a}aaa`, en: ({ a }) => `${a}aaa` },
  bbb: { ja: ({ a }) => `${a}aaa`, en: ({ a }) => `${a}aaa` },
});

console.log(c.bb({ aa: "name" }));
console.log(`${c.bb({ aa: "name" })}`);
console.log("aaa" + c.bb({ aa: "name" }));
console.log(`${c.bb({ aa: "name" })}`);
console.log(`${c.abc()}`);
