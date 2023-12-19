import { getAllArticles } from "lib/articles";
import { create } from "xmlbuilder2";
import { metadata, baseUrl } from "app/layout";

let rss_data = {
    rss: {
        "@version": "2.0",
        "@xmlns:atom": "http://www.w3.org/2005/Atom",
        channel: {
            "atom:link": {
                "@href": baseUrl + "feed/rss",
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

export async function GET(request) {
    for (const {
        title,
        date,
        description,
        content,
        id,
    } of await getAllArticles(true)) {
        rss_data.rss.channel.item.push({
            title: title,
            pubDate: new Date(date).toUTCString(),
            link: baseUrl + "articles/" + id,
            guid: baseUrl + "articles/" + id,
            description: {
                $: content,
            },
            source: {
                "@url": baseUrl + "feed/rss",
                "#": metadata.title,
            },
        });
    }
    return new Response(create(rss_data));
}
