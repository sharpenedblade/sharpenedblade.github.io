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

export const articleDir = path.join(process.cwd(), "content", "articles");

export type Article = {
    id: string;
    content: string;
    title: string;
    date: Date;
    description: string;
};

export async function getArticle(id: string, minimal = false) {
    const path = `${articleDir}/${id}.md`;
    const fileContents = await fs.readFile(path, "utf8");

    const matter_data = matter(fileContents);
    const article: Article = {
        id,
        content: await markdownToHtml(matter_data.content, minimal),
        date: new Date(matter_data.data.date),
        title: matter_data.data.title,
        description: matter_data.data.description,
    };
    return article;
}

export async function getAllArticles(minimal = false): Promise<Article[]> {
    const allArticles = await Promise.all(
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

export async function markdownToHtml(markdown: string, minimal = false) {
    let parser = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify);
    if (!minimal) {
        parser = parser.use(rehypeSlug).use(rehypeAutolinkHeadings);
    }
    return String(await parser.process(markdown));
}
