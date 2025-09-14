import { applyLocaleDeep } from "./index";
import * as trs from "./testData";

for (const locale of ['ja', 'en']) {
  const { msg, title, nested } = applyLocaleDeep(trs, locale);

  console.log(msg.render({ name: '田中', age: 20 }));
  console.log(title.render());

  console.log(nested.hello.render());

}