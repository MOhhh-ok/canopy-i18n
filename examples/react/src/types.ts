export const LOCALES = ["en", "ja", "zh"] as const;
export type Locale = (typeof LOCALES)[number];
export type User = { name: string; count: number };
