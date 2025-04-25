import antfu from "@antfu/eslint-config";

export default antfu(
  {
    typescript: true,
    ignores: [
      ".github",
      "dist",
      "node_modules",
    ],
    stylistic: {
      quotes: "double",
      semi: true,
    },
  },
  {
    rules: {
      "node/prefer-global/process": ["off"],
    },
  },
  {
    files: ["package.json"],
    rules: {
      "style/eol-last": "off",
    },
  },
);
