import ThemeProvider from "components/themeProvider";
import Header from "components/header";
import "./global.css";
import localFont from "next/font/local";
import { Metadata } from "next";

export const baseUrl = "https://sharpenedblade.github.io/";
export const metadata = {
    title: "Sharpened Blade's Blog",
    description: "Interesting, fun, or plain helpful stuff I wrote",
};

const inter = localFont({
    src: [
        {
            path: "../../fonts/inter-roman.woff2",
            style: "normal",
            weight: "100 900",
        },
        {
            path: "../../fonts/inter-italic.woff2",
            style: "italic",
            weight: "100 900",
        },
    ],
    variable: "--font-inter",
    display: "swap",
});

const iosevka = localFont({
    src: [
        {
            weight: "400",
            style: "normal",
            path: "../../fonts/iosevka-regular.woff2",
        },
        {
            weight: "700",
            style: "normal",
            path: "../../fonts/iosevka-bold.woff2",
        },
        {
            weight: "400",
            style: "italic",
            path: "../../fonts/iosevka-italic.woff2",
        },
        {
            weight: "700",
            style: "italic",
            path: "../../fonts/iosevka-bolditalic.woff2",
        },
    ],
    variable: "--font-iosevka",
    display: "swap",
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title={metadata.title}
                    href="feed/rss"
                />
            </head>
            <head>
                <link
                    rel="alternate"
                    type="application/feed+json"
                    title={metadata.title}
                    href="feed/json"
                />
            </head>
            <body
                className={`${inter.variable} ${iosevka.variable} ctp-latte flex min-h-screen flex-col items-center bg-zinc-100 font-sans dark:ctp-mocha dark:bg-zinc-900`}
            >
                <ThemeProvider attribute="class">
                    <Header></Header>
                    <main>{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}
