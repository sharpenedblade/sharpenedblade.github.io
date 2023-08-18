// Copyright (c) 2022-2023 Sharpened Blade

import Footer from "@/components/footer.js";
import Header from "@/components/header.js";

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-zinc-100 dark:bg-zinc-900">
            <Header></Header>
            <main className="flex flex-grow flex-col">{children}</main>
            <Footer></Footer>
        </div>
    );
}
