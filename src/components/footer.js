// Copyright (c) 2022-2023 Sharpened Blade

import styles from "@/styles/footer.module.css";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <footer>
                <p>
                    Sharpened Blade&apos;s website and blog.{" "}
                    <a href="https://github.com/sharpenedblade/sharpenedblade.github.io">
                        Source code
                    </a>{" "}
                    for this website.
                </p>
            </footer>
        </div>
    );
}
