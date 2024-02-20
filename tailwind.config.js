/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {},
        fontFamily: {
            sans: ["Inter", "sans-serif"],
            mono: ["Iosevka", "monospace"],
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
