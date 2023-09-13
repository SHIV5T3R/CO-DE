module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  ignorePatterns: [],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react-refresh",
    "prettier",
    "@typescript-eslint",
    "simple-import-sort",
    "import",
    ["simple-import-sort"],
  ],
  parserOptions: {
    project: ["./tsconfig.node.json"],
    sourceType: "module",
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
  },
  rules: {
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "react/require-default-props": "off",
    "import/extensions": "off",
    "jsx-a11y/interactive-supports-focus": "off",
    // '@typescript-eslint/dot-notation': 'off',
    // 'react/react-in-jsx-scope': 'off',
    // 'jsx-a11y/accessible-emoji': 'off',
    // 'react/prop-types': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": [
      "warn",
      {
        ignoreTypeValueShadow: true,
        ignoreFunctionTypeParameterNameValueShadow: true,
      },
    ],
    "import/no-extraneous-dependencies": "off",
    "no-console": "off",
    "import/prefer-default-export": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
    "react/function-component-definition": 0,
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        project: "./src",
      },
    },
    react: {
      version: "detect",
    },
  },
};
