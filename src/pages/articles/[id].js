// Copyright (c) 2022-2023 Sharpened Blade

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
        <Layout>
            <div>
                <h1>{articleData.title}</h1>
                <div
                    dangerouslySetInnerHTML={{
                        __html: articleData.content,
                    }}
                ></div>
            </div>
        </Layout>
    );
}
