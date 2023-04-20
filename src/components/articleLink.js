// Copyright (c) 2022-2023 Sharpened Blade

import styles from "@/styles/articleLink.module.css";
import Link from "next/link";

export default function ArticleLink({ path, name, description, date, id }) {
    return (
        <article className={styles.article} key={id}>
            <div>
                <time dateTime={date} className={styles.date}>
                    {date}
                </time>{" "}
                <Link href={path} className={styles.link}>
                    {name}
                </Link>
            </div>
            <p className={styles.description}>{description}</p>
        </article>
    );
}
