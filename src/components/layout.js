// Copyright (c) 2022-2023 Sharpened Blade

import Head from "next/head";
import Footer from "@/components/footer.js";
import styles from "@/styles/layout.module.css";
import Header from "@/components/header.js";

export default function Layout({ children }) {
    return (
        <div className={styles.layout_wrapper}>
            <Head>
                <link rel="icon" href="/favico.ico"></link>
            </Head>
            <Header></Header>
            <main>{children}</main>
            <Footer></Footer>
        </div>
    );
}