import { useLocale } from "./LocaleContext";
import { type Locale, LOCALES } from "./types";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      style={{
        padding: "8px 16px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "1px solid #ddd",
        cursor: "pointer",
        background: "white",
      }}
    >
      {LOCALES.map((loc) => (
        <option key={loc} value={loc}>
          {loc === "en" ? "🇺🇸 English" : loc === "ja" ? "🇯🇵 日本語" : "🇨🇳 中文"}
        </option>
      ))}
    </select>
  );
}
