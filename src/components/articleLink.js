// Copyright (c) 2022-2023 Sharpened Blade

import { InternalLink as InternalLink } from "components/link";

export default function ArticleLink({ path, name, description, date, id }) {
    return (
        <article className="my-4 flex max-w-prose flex-col" key={id}>
            <time
                dateTime={date}
                className="text-sm text-zinc-500 dark:text-zinc-400"
            >
                {date}
            </time>
            <InternalLink href={path} className="text-xl font-bold">
                {name}
            </InternalLink>
            <p className="text-zinc-700 dark:text-zinc-300">{description}</p>
        </article>
    );
}
