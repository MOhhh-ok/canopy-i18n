import React, { type CSSProperties } from "react";
import { createI18n } from "../../../src";
import type { Locale } from "./i18n";
import { LOCALES } from "./i18n";

const badgeStyle: CSSProperties = {
  background: "#4caf50",
  color: "white",
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "0.8em",
};

const alertStyle: CSSProperties = {
  background: "#fff3cd",
  border: "1px solid #ffc107",
  padding: "12px",
  borderRadius: "4px",
  color: "#856404",
};

const buttonBaseStyle: CSSProperties = {
  color: "white",
  border: "none",
  padding: "10px 20px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "transform 0.2s",
};

const buttonHoverHandlers = {
  onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.transform = "scale(1.05)",
  onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.transform = "scale(1)",
};

// React コンポーネントを返す例
export const componentMessages = createI18n(LOCALES)
  .add<React.JSX.Element>({
    badge: {
      en: (
        <span style={badgeStyle}>
          NEW
        </span>
      ),
      ja: (
        <span style={badgeStyle}>
          新着
        </span>
      ),
      zh: (
        <span style={badgeStyle}>
          新
        </span>
      ),
    },
    alert: {
      en: (
        <div style={alertStyle}>
          ⚠️ This is a warning message
        </div>
      ),
      ja: (
        <div style={alertStyle}>
          ⚠️ これは警告メッセージです
        </div>
      ),
      zh: (
        <div style={alertStyle}>
          ⚠️ 这是警告消息
        </div>
      ),
    },
  });

// 動的にReactコンポーネントを生成する例
type ButtonContext = {
  onClick: () => void;
  text: string;
};

export const dynamicComponents = createI18n(LOCALES)
  .addTemplates<ButtonContext, React.JSX.Element>()({
    button: {
      en: (ctx) => (
        <button
          onClick={ctx.onClick}
          style={{
            ...buttonBaseStyle,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "6px",
            boxShadow: "0 4px 6px rgba(102, 126, 234, 0.4)",
          }}
          {...buttonHoverHandlers}
        >
          {ctx.text}
        </button>
      ),
      ja: (ctx) => (
        <button
          onClick={ctx.onClick}
          style={{
            ...buttonBaseStyle,
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            borderRadius: "20px",
            boxShadow: "0 4px 6px rgba(245, 87, 108, 0.4)",
          }}
          {...buttonHoverHandlers}
        >
          {ctx.text}
        </button>
      ),
      zh: (ctx) => (
        <button
          onClick={ctx.onClick}
          style={{
            ...buttonBaseStyle,
            background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            color: "#333",
            borderRadius: "4px",
            boxShadow: "0 4px 6px rgba(250, 112, 154, 0.4)",
          }}
          {...buttonHoverHandlers}
        >
          {ctx.text}
        </button>
      ),
    },
  });

export function buildComponentMessages(locale: Locale) {
  return {
    components: componentMessages.build(locale),
    dynamicComponents: dynamicComponents.build(locale),
  };
}
