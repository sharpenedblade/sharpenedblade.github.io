// Copyright (c) 2022-2023 Sharpened Blade

import { InternalLink as InternalLink } from "@/components/link.js";

export default function Header() {
    return (
        <header className="min-w-full space-x-2 bg-nord1 py-2 text-center text-base text-nord6">
            <nobr>Sharpened Blade&apos;s Website</nobr>
            <nav className="inline-block space-x-2">
                <InternalLink href="/">Home</InternalLink>
                <InternalLink href="/about">About</InternalLink>
            </nav>
        </header>
    );
}
