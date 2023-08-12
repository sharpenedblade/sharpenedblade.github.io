// Copyright (c) 2022-2023 Sharpened Blade

import { InternalLink as InternalLink } from "@/components/link.js";

export default function ArticleLink({ path, name, description, date, id }) {
    return (
        <article className="my-4 space-x-2" key={id}>
            <time dateTime={date} className="text-sm text-nord4">
                {date}
            </time>
            <InternalLink href={path} className="text-xl">
                {name}
            </InternalLink>
            <p className="ml-4 text-nord4">{description}</p>
        </article>
    );
}
