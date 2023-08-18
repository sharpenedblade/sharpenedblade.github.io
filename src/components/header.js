// Copyright (c) 2022-2023 Sharpened Blade

import { InternalLink as InternalLink } from "@/components/link.js";
import ThemeSwitcher from "@/components/themeSwitcher.js";

export default function Header() {
    return (
        <header className="min-w-full space-x-2 bg-zinc-200 py-2 text-center text-base text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            <nobr>Sharpened Blade&apos;s Website</nobr>
            <nav className="inline-block space-x-2">
                <InternalLink href="/">Home</InternalLink>
                <InternalLink href="/about">About</InternalLink>
            </nav>
            <ThemeSwitcher className="absolute right-2"></ThemeSwitcher>
        </header>
    );
}
