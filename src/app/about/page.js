// Copyright (c) 2022-2023 Sharpened Blade
import { markdownToHtml } from "lib/articles";

import fs from "fs";
import path from "path";

export default async function About({ aboutContent }) {
    const aboutPath = path.join(process.cwd(), "content", "about.md");
    const rawAboutContent = fs.readFileSync(aboutPath, "utf8");
    aboutContent = await markdownToHtml(rawAboutContent);

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: aboutContent,
            }}
            className="prose prose-zinc my-8 dark:prose-invert"
        ></div>
    );
}
