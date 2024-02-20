import { getArticle } from "$lib/articles";
import { error } from "@sveltejs/kit";

export const prerender = true;

export async function load({ params }) {
    let article;
    try {
        article = await getArticle(params.id);
    } catch {
        throw error(404, {
            message: "The requested article does not exist",
        });
    }
    return {
        id: article.id,
        content: article.content,
        title: article.title,
        date: article.date,
        description: article.description,
    };
}
