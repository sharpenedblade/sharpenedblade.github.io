import { getArticle, getAllArticles } from "lib/articles";
import "@catppuccin/highlightjs/sass/catppuccin.variables.scss";

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
            className="pre-ctp prose prose-zinc my-8 dark:prose-invert"
            dangerouslySetInnerHTML={{
                __html: articleData.content,
            }}
        ></div>
    );
}
