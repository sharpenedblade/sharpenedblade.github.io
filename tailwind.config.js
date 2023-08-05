/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        "--tw-prose-body": theme("colors.nord4"),
                        "--tw-prose-links": theme("colors.nord8"),
                        "--tw-prose-headings": theme("colors.nord6"),
                        "--tw-prose-code": theme("colors.nord4"),
                        "--tw-prose-pre-bg": theme("colors.nord1"),
                        "--tw-prose-pre-code": theme("colors.nord4"),
                        "--tw-prose-lead": theme("colors.nord4"),
                        "--tw-prose-bold": theme("colors.nord6"),
                        "--tw-prose-bullets": theme("colors.nord5"),
                        "--tw-prose-counters": theme("colors.nord5"),
                        "--tw-prose-quotes": theme("colors.nord5"),
                        "--tw-prose-quote-borders": theme("colors.nord3"),
                        "--tw-prose-captions": theme("colors.nord5"),
                        "--tw-prose-hr": theme("colors.nord5"),
                        "--tw-prose-th-borders": theme("colors.nord5"),
                        "--tw-prose-td-borders": theme("colors.nord5"),
                        a: {
                            textDecoration: "none",
                            "@apply font-semibold": {},
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        },
                    },
                },
            }),
            colors: {
                nord0: "oklch(32.44% 0.023 264.18)",
                nord1: "oklch(37.92% 0.029 266.47)",
                nord2: "oklch(41.57% 0.032 264.13)",
                nord3: "oklch(45.23% 0.035 264.13)",
                nord4: "oklch(89.93% 0.016 262.75)",
                nord5: "oklch(93.3% 0.01 261.79)",
                nord6: "oklch(95.13% 0.007 260.73)",
                nord7: "oklch(76.29% 0.048 194.49)",
                nord8: "oklch(77.46% 0.062 217.47)",
                nord9: "oklch(69.65% 0.059 248.69)",
                nord10: "oklch(59.44% 0.077 254.03)",
                nord11: "oklch(60.61% 0.121 15.34)",
                nord12: "oklch(69.29% 0.096 38.24)",
                nord13: "oklch(85.49% 0.089 84.09)",
                nord14: "oklch(76.83% 0.075 131.06)",
                nord15: "oklch(69.21% 0.062 332.66)",
            },
        },
        fontFamily: {
            sans: ["Inter", "sans-serif"],
            monospace: ["Jetbrains Mono", "monospace"],
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
