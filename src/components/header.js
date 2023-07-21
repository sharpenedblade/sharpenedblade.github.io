// Copyright (c) 2022-2023 Sharpened Blade

import Link from "next/link";

export default function Header() {
    return (
        <header className="min-w-full space-x-2 bg-nord1 py-2 text-center text-base text-nord6">
            <nobr>Sharpened Blade&apos;s Website</nobr>
            <nav className="inline-block space-x-2">
                <Link
                    className="font-semibold text-nord8 hover:underline"
                    href="/"
                >
                    Home
                </Link>
                <Link
                    className="font-semibold text-nord8 hover:underline"
                    href="/about"
                >
                    About
                </Link>
            </nav>
        </header>
    );
}
