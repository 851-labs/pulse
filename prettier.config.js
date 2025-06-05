/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-packagejson"],

  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  trailingComma: "all",
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
  quoteProps: "as-needed",
}

export default config
