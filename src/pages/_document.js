// Copyright (c) 2022-2023 Sharpened Blade

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favico.ico"></link>
            </Head>
            <body className="m-0 bg-nord0">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
