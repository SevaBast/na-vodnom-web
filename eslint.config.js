import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn", 
        { 
          allowConstantExport: true,
          allowExportNames: ["badgeVariants", "buttonVariants"]
        }
      ],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  // Відключити Fast Refresh попередження для UI компонентів та контекстів
  {
    files: ["src/components/ui/**/*.{ts,tsx}", "src/context/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
);
