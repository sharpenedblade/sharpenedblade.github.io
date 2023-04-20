// Copyright (c) 2022-2023 Sharpened Blade

import Link from "next/link";
import Head from "next/head";
import Layout from "@/components/layout";
import ArticleLink from "@/components/articleLink";
import { getAllArticleData } from "@/lib/articles";

export async function getStaticProps() {
    const allArticles = getAllArticleData();
    const __fakeImportForWebpackDoNotUse = require("fs"); // Required to fix webpack
    return {
        props: {
            allArticles,
        },
    };
}

export default function Index({ allArticles }) {
    return (
        <>
            <Layout>
                <Head>
                    <title>My Title</title>
                </Head>
                {allArticles.map(({ title, date, description, id }) => (
                    <ArticleLink
                        path={"/articles/" + id}
                        description={description}
                        name={title}
                        date={date}
                        key={id}
                    ></ArticleLink>
                ))}
            </Layout>
        </>
    );
}
