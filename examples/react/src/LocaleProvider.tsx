import type { ReactNode } from "react";
import { LocaleContext, useContextStates } from "./LocaleContext";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const states = useContextStates();

  return (
    <LocaleContext.Provider value={states}>
      {children}
    </LocaleContext.Provider>
  );
}
