import { getAllArticles } from "$lib/articles";

export const prerender = true;

const baseUrl = "https://sharpenedblade.github.io/";
const metadata = {
    title: "Sharpened Blade's Blog",
    description:
        "Obscenely boring things I write about insanely uninteresting ideas.",
};

let json_feed_data = {
    version: "https://jsonfeed.org/version/1.1",
    title: metadata.title,
    description: metadata.description,
    home_page_url: baseUrl,
    feed_url: baseUrl + "feed/feed.json",
    language: "en-US",
    items: [],
};

export async function GET() {
    for (const {
        title,
        date,
        description,
        content,
        id,
    } of await getAllArticles(true)) {
        json_feed_data.items.push({
            title: title,
            date_published: new Date(date).toUTCString(),
            url: baseUrl + "articles/" + id,
            id: baseUrl + "articles/" + id,
            content_html: content,
            summary: description,
        });
    }
    return Response.json(json_feed_data);
}
