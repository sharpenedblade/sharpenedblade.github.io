// Copyright (c) 2022-2023 Sharpened Blade

import fs from "fs";
import path from "path";
import Head from "next/head";
import Layout from "@/components/layout";
import { markdownToHtml } from "@/lib/articles";

export async function getStaticProps() {
    const aboutPath = path.join(process.cwd(), "content", "about.md");
    const rawAboutContent = fs.readFileSync(aboutPath, "utf8");
    const aboutContent = await markdownToHtml(rawAboutContent);
    return {
        props: {
            aboutContent,
        },
    };
}

export default function About({ aboutContent }) {
    return (
        <Layout>
            <Head>
                <title>About Sharpened Blade</title>
            </Head>
            <div
                dangerouslySetInnerHTML={{
                    __html: aboutContent,
                }}
            ></div>
        </Layout>
    );
}
