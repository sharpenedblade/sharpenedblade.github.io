import { getArticle, getAllArticles } from "lib/articles";
import "highlight.js/styles/dark.css";

export async function generateStaticParams() {
    return (await getAllArticles()).map((article) => {
        return {
            id: article.id,
        };
    });
}

export default async function Article({ params }) {
    const articleData = await getArticle(params.id);
    return (
        <div
            className="prose prose-zinc my-8 dark:prose-invert prose-pre:p-0"
            dangerouslySetInnerHTML={{
                __html: articleData.content,
            }}
        ></div>
    );
}
