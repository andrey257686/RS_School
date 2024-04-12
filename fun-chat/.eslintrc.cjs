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
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["import", "eslint-plugin-import", "@typescript-eslint", "prettier"],
  rules: {
    "no-console": 0,
    "class-methods-use-this": 0,
  },
};
