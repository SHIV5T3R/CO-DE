module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
  ],
  ignorePatterns: [],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "prettier", "@typescript-eslint"],
  parserOptions: {
    project: ["./tsconfig.node.json"],
    sourceType: "module",
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
  },
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "": "never",
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": 0,
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "no-unused-vars": "warn",
    "jsx-a11y/interactive-supports-focus": "off",
    "func-names": "off",
    "no-process-exit": "off",
    "object-shorthand": "off",
    "class-methods-use-this": "off",
    "import/no-unresolved": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/quotes": ["error", "double"],
    "react/require-default-props": "off",
    "react/jsx-curly-brace-presence": "warn",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        paths: ["./src"],
      },
    },
  },
};
