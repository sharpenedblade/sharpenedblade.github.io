// Copyright (c) 2022-2023 Sharpened Blade

import Head from "next/head";
import Footer from "@/components/footer.js";
import Header from "@/components/header.js";

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center  ">
            <Header></Header>
            <main className="m-3 flex max-w-max flex-grow flex-col">
                {children}
            </main>
            <Footer></Footer>
        </div>
    );
}
