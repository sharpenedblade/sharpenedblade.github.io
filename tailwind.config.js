/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
        "content/**/*.{md,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {},
        fontFamily: {
            sans: ["var(--font-inter)", "sans-serif"],
            mono: ["var(--font-iosevka)", "monospace"],
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@catppuccin/tailwindcss")({
            prefix: "ctp",
        }),
    ],
};
