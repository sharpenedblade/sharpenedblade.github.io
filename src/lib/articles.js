// Copyright (c) 2022-2023 Sharpened Blade

import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";

export const articleDir = path.join(process.cwd(), "content", "articles");

export async function getArticle(id, minimal = false) {
    const path = `${articleDir}/${id}.md`;
    const fileContents = await fs.readFile(path, "utf8");

    const metadata = matter(fileContents);
    const content = await markdownToHtml(metadata.content, minimal);
    // Combine the data with the id and content
    return {
        id,
        content: content,
        ...metadata.data,
    };
}

export async function getAllArticles(minimal = false) {
    let allArticles = await Promise.all(
        (await fs.readdir(articleDir)).map((file) => {
            return getArticle(file.replace(/\.md$/, ""), minimal);
        }),
    );
    return allArticles.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function markdownToHtml(markdown, minimal = false) {
    let parser = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify);
    if (!minimal) {
        parser = parser
            .use(rehypeSlug)
            .use(rehypeAutolinkHeadings)
            .use(rehypeHighlight);
    }
    return String(await parser.process(markdown));
}
