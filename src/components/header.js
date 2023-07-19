// Copyright (c) 2022-2023 Sharpened Blade

import Link from "next/link";

export default function Header() {
    return (
        <header className="min-w-full space-x-2 bg-nord1 py-2 text-center text-base text-nord6">
            <nobr>Sharpened Blade&apos;s Website</nobr>
            <nav className="inline-block space-x-2">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
            </nav>
        </header>
    );
}
