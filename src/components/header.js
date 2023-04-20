// Copyright (c) 2022-2023 Sharpened Blade

import Link from "next/link";
import styles from "@/styles/header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            Sharpened Blade&apos;s Website{" "}
            <nav>
                <Link href="/">Home</Link> <Link href="/about">About</Link>
            </nav>
        </header>
    );
}
