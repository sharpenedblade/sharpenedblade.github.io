import { getAllArticles } from "$lib/articles";
import { create } from "xmlbuilder2";

export const prerender = true;

const baseUrl = "https://sharpenedblade.github.io/";
const metadata = {
    title: "Sharpened Blade's Blog",
    description:
        "Obscenely boring things I write about insanely uninteresting ideas.",
};

let rss_data = {
    rss: {
        "@version": "2.0",
        "@xmlns:atom": "http://www.w3.org/2005/Atom",
        channel: {
            "atom:link": {
                "@href": baseUrl + "feed/rss.xml",
                "@rel": "self",
                "@type": "application/rss+xml",
            },
            title: metadata.title,
            link: baseUrl,
            description: metadata.description,
            language: "en-us",
            lastBuildDate: new Date().toUTCString(),
            item: [],
        },
    },
};

export async function GET() {
    for (const { title, date, content, id } of await getAllArticles(true)) {
        rss_data.rss.channel.item.push({
            title: title,
            pubDate: new Date(date).toUTCString(),
            link: baseUrl + "articles/" + id,
            guid: baseUrl + "articles/" + id,
            description: {
                $: content,
            },
            source: {
                "@url": baseUrl + "feed/rss.xml",
                "#": metadata.title,
            },
        });
    }
    return new Response(create(rss_data));
}
