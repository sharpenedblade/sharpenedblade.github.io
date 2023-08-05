// Copyright (c) 2022-2023 Sharpened Blade

import Head from "next/head";
import Footer from "@/components/footer.js";
import Header from "@/components/header.js";

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-nord0">
            <Header></Header>
            <main className="my-8 flex flex-grow flex-col">{children}</main>
            <Footer></Footer>
        </div>
    );
}
