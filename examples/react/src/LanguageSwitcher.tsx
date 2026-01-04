import { useI18n } from "./useI18n";
import { LOCALES } from "./i18n";
import type { Locale } from "./i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

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
