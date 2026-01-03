## 新しいクラス草案

### 現行

```ts
const builder = createBuilder(["ja", "en"] as const, "ja");

const title = builder({
  ja: "タイトルテスト",
  en: "Title Test",
});

const msg = builder<{ name: string; age: number }>({
  ja: c => `こんにちは、${c.name}さん、あなたは${c.age}歳です。来年は${c.age + 1}歳です。`,
  en: c => `Hello, ${c.name}. You are ${c.age} years old. Next year you will be ${c.age + 1} years old.`,
});

const trs={title,msg}

const localized = applyLocale(trs, "en");
expect(localized.title.render()).toBe("Title Test");
expect(localized.msg.render({ name: "John", age: 30 })).toBe(
  "Hello, John. You are 30 years old. Next year you will be 31 years old.",
);
````

### 新しいクラス

これを一気に定義できる新しいクラスを作りたい。

```ts
newBuilder=createNewBuilder(["ja","en"] as const,"ja");
newBuilder({title:{ja:"タイトル",en:"title"},msg:{ja:"メッセージ",en:"message"}});
```

### 懸念点

関数型の場合の型をいじできるかどうか
