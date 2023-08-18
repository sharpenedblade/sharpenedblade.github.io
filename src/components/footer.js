// Copyright (c) 2022-2023 Sharpened Blade

import Link from "@/components/link.js";

export default function Footer() {
    return (
        <footer className="flex min-w-full justify-center bg-zinc-200 py-1 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            <p>
                <Link href="https://github.com/sharpenedblade/sharpenedblade.github.io">
                    Source code
                </Link>{" "}
                for this website. If you spot a mistake you can email me or open
                an issue with the source code repo
            </p>
        </footer>
    );
}
