// Copyright (c) 2022-2023 Sharpened Blade

import { InternalLink as InternalLink } from "@/components/link.js";

export default function ArticleLink({ path, name, description, date, id }) {
    return (
        <article className="my-4 space-x-2" key={id}>
            <time
                dateTime={date}
                className="text-sm text-zinc-500 dark:text-zinc-400"
            >
                {date}
            </time>
            <InternalLink href={path} className="text-xl font-bold">
                {name}
            </InternalLink>
            <p className="ml-4 text-zinc-700 dark:text-zinc-300">
                {description}
            </p>
        </article>
    );
}
