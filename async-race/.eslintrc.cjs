module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint-config-airbnb-base",
    "airbnb-typescript/base",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
    sourceType: "module",
  },
  plugins: ["import", "eslint-plugin-import", "@typescript-eslint", "prettier"],
  rules: {
    "class-methods-use-this": "off",
  },
  noInlineConfig: true,
};
