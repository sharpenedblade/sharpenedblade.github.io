import { getAllArticles } from "$lib/articles.js";
export const prerender = true;

export async function load() {
    return { articles: await getAllArticles() };
}
