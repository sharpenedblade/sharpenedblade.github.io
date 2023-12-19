import ArticleLink from "components/articleLink";
import { getAllArticles } from "lib/articles";

export default async function Index() {
    const allArticles = await getAllArticles();
    return (
        <>
            <p className="text-small my-4">
                <a href="feed/rss" className="font-semibold underline">
                    RSS
                </a>{" "}
                and{" "}
                <a href="feed/json" className="font-semibold underline">
                    JSON
                </a>{" "}
                feeds are supported.
            </p>
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
