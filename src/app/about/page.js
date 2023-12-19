// Copyright (c) 2022-2023 Sharpened Blade
import { markdownToHtml } from "lib/articles";

import { promises as fs } from "fs";
import path from "path";

export const metadata = {
    title: "About Sharpened Blade's Blog",
};
export default async function About({ aboutContent }) {
    aboutContent = await markdownToHtml(
        await fs.readFile(
            path.join(process.cwd(), "content", "about.md"),
            "utf8",
        ),
    );

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: "<h1>About</h1>" + aboutContent,
            }}
            className="prose prose-zinc my-8 dark:prose-invert"
        ></div>
    );
}
