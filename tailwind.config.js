/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {},
        fontFamily: {
            sans: ["var(--font-inter)", "sans-serif"],
            mono: ["var(--font-iosevka)", "monospace"],
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
