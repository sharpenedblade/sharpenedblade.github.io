import { markdownToHtml } from "$lib/articles";
import { promises as fs } from "fs";
import path from "path";

export const prerender = true;

export async function load() {
    return {
        title: "About",
        content: await markdownToHtml(
            await fs.readFile(
                path.join(process.cwd(), "content", "about.md"),
                "utf8",
            ),
        ),
    };
}
