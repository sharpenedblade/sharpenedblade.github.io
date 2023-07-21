// Copyright (c) 2022-2023 Sharpened Blade

import Link from "next/link";

export default function ArticleLink({ path, name, description, date, id }) {
    return (
        <article className="my-4 space-x-2" key={id}>
            <time dateTime={date} className="text-sm text-nord4">
                {date}
            </time>
            <Link
                href={path}
                className="text-xl font-semibold text-nord8 hover:underline"
            >
                {name}
            </Link>
            <p className="ml-4">{description}</p>
        </article>
    );
}
