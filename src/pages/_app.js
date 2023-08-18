// Copyright (c) 2022-2023 Sharpened Blade
import { ThemeProvider } from "next-themes";
import "@/styles/global.css";

export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider attribute="class">
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
