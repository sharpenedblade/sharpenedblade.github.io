import { markdownToHtml, getArticleIdList, getArticleData } from "lib/articles";

export async function generateStaticParams() {
    return getArticleIdList().map((id) => {
        return {
            id: id,
        };
    });
}

export default async function Article({ params }) {
    const articleData = getArticleData(params.id);
    articleData.content = await markdownToHtml(articleData.content);
    return (
        <div
            className="prose prose-zinc my-8 dark:prose-invert"
            dangerouslySetInnerHTML={{
                __html: articleData.content,
            }}
        ></div>
    );
}
