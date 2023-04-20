// Copyright (c) 2022-2023 Sharpened Blade

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const articleDir = path.join(process.cwd(), "content", "articles");

export function getArticleData(id) {
    const path = `${articleDir}/${id}.md`;
    const fileContents = fs.readFileSync(path, "utf8");

    const metadata = matter(fileContents);

    // Combine the data with the id and content
    return {
        id,
        content: metadata.content,
        ...metadata.data,
    };
}

export function getArticleIdList() {
    const fileNames = fs.readdirSync(articleDir);
    return fileNames.map((fileName) => {
        return fileName.replace(/\.md$/, "");
    });
}

export function getAllArticleData() {
    const articleIdList = getArticleIdList();
    const allArticleData = articleIdList.map((id) => {
        return getArticleData(id);
    });
    return allArticleData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function markdownToHtml(markdown) {
    const result = await remark().use(html).process(markdown);
    return result.toString();
}
