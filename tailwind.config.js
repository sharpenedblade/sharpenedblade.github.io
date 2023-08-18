/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    darkMode: "class",
    theme: {
        extend: {},
        fontFamily: {
            sans: ["Inter", "sans-serif"],
            monospace: ["Jetbrains Mono", "monospace"],
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
