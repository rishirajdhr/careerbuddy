/**
 * @type {import("prettier").Config}
 */
const config = {
    arrowParens: "always",
    bracketSameLine: false,
    bracketSpacing: true,
    objectWrap: "collapse",
    plugins: ["prettier-plugin-tailwindcss"],
    printWidth: 80,
    semi: true,
    singleQuote: false,
    tabWidth: 4,
    tailwindStylesheet: "./app/globals.css",
};

export default config;
