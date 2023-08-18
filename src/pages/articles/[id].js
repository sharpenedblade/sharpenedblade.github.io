// Copyright (c) 2022-2023 Sharpened Blade

import Head from "next/head";
import Layout from "../../components/layout";
import {
    markdownToHtml,
    getArticleIdList,
    getArticleData,
} from "@/lib/articles";

export async function getStaticPaths() {
    const paths = getArticleIdList().map((id) => {
        return {
            params: {
                id: id,
            },
        };
    });
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const articleData = getArticleData(params.id);
    articleData.content = await markdownToHtml(articleData.content);

    return {
        props: {
            articleData,
        },
    };
}

export default function Article({ articleData }) {
    return (
        <>
            <Head>
                <title>{articleData.title}</title>
            </Head>
            <Layout>
                <div
                    className="prose prose-zinc my-8 dark:prose-invert"
                    dangerouslySetInnerHTML={{
                        __html: articleData.content,
                    }}
                ></div>
            </Layout>
        </>
    );
}
