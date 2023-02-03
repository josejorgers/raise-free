module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  env: {
    node: true,
    mocha: true,
    es6: true,
  },
  plugins: ["prettier"],
  parserOptions: {
    parser: "eslint/parser",
  },
};
