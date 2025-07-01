import { getAllArticles } from "$lib/articles";

export const prerender = true;

const baseUrl = "https://sharpenedblade.github.io/";
const metadata = {
    title: "Sharpened Blade's Blog",
    description:
        "Obscenely boring things I write about insanely uninteresting ideas.",
};

type JsonFeed = {
    version: string;
    title: string;
    description: string;
    home_page_url: string;
    feed_url: string;
    language: string;
    items: JsonFeedArticle[];
};

const json_feed: JsonFeed = {
    version: "https://jsonfeed.org/version/1.1",
    title: metadata.title,
    description: metadata.description,
    home_page_url: baseUrl,
    feed_url: baseUrl + "feed/feed.json",
    language: "en-US",
    items: [],
};

type JsonFeedArticle = {
    title: string;
    date_published: string;
    url: string;
    id: string;
    content_html: string;
    summary: string;
};

export async function GET() {
    json_feed.items = (await getAllArticles(true)).map((article) => {
        return {
            title: article.title,
            date_published: new Date(article.date).toUTCString(),
            url: baseUrl + "articles/" + article.id,
            id: baseUrl + "articles/" + article.id,
            content_html: article.content,
            summary: article.description,
        };
    });
    return Response.json(json_feed);
}
