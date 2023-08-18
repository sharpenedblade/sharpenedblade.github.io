"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@primer/octicons-react";

export default function ThemeSwitcher(props) {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const toggleTheme = () => {
        resolvedTheme === "dark" ? setTheme("light") : setTheme("dark");
    };

    return (
        <button
            className={`inline-flex items-center justify-center rounded-full bg-zinc-300 p-1 dark:bg-zinc-700 ${props.className}`}
            onClick={() => toggleTheme()}
        >
            {resolvedTheme === "dark" ? (
                <MoonIcon size="small"></MoonIcon>
            ) : (
                <SunIcon size="small"></SunIcon>
            )}
        </button>
    );
}
