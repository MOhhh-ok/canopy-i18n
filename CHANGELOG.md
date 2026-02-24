# Changelog

## 0.6.1

- Add SKILL.md

## 0.6.0

- **Feature**: Add key type parameter `K` to `add` and `addTemplates` methods
  - `add<R, K extends string>()` now accepts a key type parameter for better type inference
  - `addTemplates<C, R, K extends string>()` now accepts a key type parameter for better type inference
  - Improved type safety for Record keys in message definitions

## 0.5.0

- Remove render and clone methods.

## 0.4.2

- Improved README.md

## 0.4.1

- Fix moduleResolution to nodenext.

## 0.4.0

- Change type to ESM.

## 0.3.0

- **Feature**: Add support for custom return types (not just strings)
  - `Template<C, R>` now accepts a return type parameter `R` (defaults to `string`)
  - `I18nMessage<Ls, C, R>` now supports custom return types
  - `LocalizedMessage<Ls, C, R>` now supports custom return types
- **Feature**: Add `addTemplates<C, R>()` now accepts custom return type parameter
  - Example: `.addTemplates<ButtonContext, JSX.Element>()({ button: { ... } })`
- **Fix**: Update constructor parameters to be compatible with `erasableSyntaxOnly` TypeScript option
- **Fix**: Improve type imports for `verbatimModuleSyntax` compatibility

## 0.2.0

- **Breaking change**: Modify `createI18n` function signature
- Rename applyLocale to bindLocale.
- Use bun instead of pnpm.
