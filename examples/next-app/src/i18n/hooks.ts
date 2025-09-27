"use client";
import { useParams } from 'next/navigation';
import { applyLocale } from 'canopy-i18n';

export function useLocale(): string {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'ja';
  return locale;
}

export function useApplyLocaleDeep<T extends object>(obj: T): T {
  const locale = useLocale();
  return applyLocale(obj, locale);
}


