import ArticleLink from "components/articleLink";
import { getAllArticleData } from "lib/articles";

export async function getArticles() {
    const allArticles = getAllArticleData();
    return allArticles;
}

export default async function Index() {
    const allArticles = await getArticles();
    return (
        <>
            {allArticles.map(({ title, date, description, id }) => (
                <ArticleLink
                    path={"/articles/" + id}
                    description={description}
                    name={title}
                    date={date}
                    key={id}
                ></ArticleLink>
            ))}
        </>
    );
}
