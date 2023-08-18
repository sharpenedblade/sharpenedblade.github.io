import ArticleLink from "components/articleLink";
import { getAllArticles } from "lib/articles";

export default async function Index() {
    const allArticles = await getAllArticles();
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
