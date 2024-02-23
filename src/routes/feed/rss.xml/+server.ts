import { articleDir, getAllArticles } from "$lib/articles";
import { create } from "xmlbuilder2";

export const prerender = true;

const baseUrl = "https://sharpenedblade.github.io/";
const metadata = {
    title: "Sharpened Blade's Blog",
    description:
        "Obscenely boring things I write about insanely uninteresting ideas.",
};

type RSSFeed = {
    rss: {
        "@version": string;
        "@xmlns:atom": string;
        channel: {
            "atom:link": {
                "@href": string;
                "@rel": string;
                "@type": string;
            };
            title: string;
            link: string;
            description: string;
            language: string;
            lastBuildDate: string;
            item: RSSArticle[];
        };
    };
};

const rss_feed: RSSFeed = {
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

type RSSArticle = {
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    description: {
        $: string;
    };
    source: {
        "@url": string;
        "#": string;
    };
};

export async function GET() {
    rss_feed.rss.channel.item = (await getAllArticles(true)).map((article) => {
        return {
            title: article.title,
            pubDate: new Date(article.date).toUTCString(),
            link: baseUrl + articleDir + article.id,
            guid: baseUrl + articleDir + article.id,
            description: {
                $: article.content,
            },
            source: {
                "@url": baseUrl + "feed/rss.xml",
                "#": metadata.title,
            },
        };
    });
    return new Response(create(rss_feed).toString());
}
