"use client";

import { ThemeProvider as ClientThemeProvider } from "next-themes";

export default function ThemeProvider({ children }) {
    return (
        <ClientThemeProvider attribute="class">{children}</ClientThemeProvider>
    );
}
