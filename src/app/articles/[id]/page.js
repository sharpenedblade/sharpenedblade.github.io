import { getArticle, getAllArticles } from "lib/articles";
import "@catppuccin/highlightjs/sass/catppuccin.variables.scss";
import { Console } from "console";

export async function generateStaticParams() {
    return (await getAllArticles()).map((article) => {
        return {
            id: article.id,
        };
    });
}

export async function generateMetadata({ params }) {
    return {
        title: (await getArticle(params.id)).title,
    };
}

export default async function Article({ params }) {
    const articleData = await getArticle(params.id);
    return (
        <div
            className="pre-ctp prose prose-zinc my-8 dark:prose-invert"
            dangerouslySetInnerHTML={{
                __html:
                    "<h1>" + articleData.title + "</h1>" + articleData.content,
            }}
        ></div>
    );
}
