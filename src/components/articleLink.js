// Copyright (c) 2022-2023 Sharpened Blade

import Link from "next/link";

export default function ArticleLink({ path, name, description, date, id }) {
    return (
        <article className="my-8 space-x-2" key={id}>
            <time dateTime={date} className="text-nord4 text-sm">
                {date}
            </time>
            <Link href={path} className="text-xl text-nord8 font-bold hover:underline">
                {name}
            </Link>
            <p className="ml-4">{description}</p>
        </article>
    );
}
