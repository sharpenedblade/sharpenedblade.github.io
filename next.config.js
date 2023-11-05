/** @type {import('next').NextConfig} */
export default {
    reactStrictMode: true,
    output: "export",
    trailingSlash: true,
    sassOptions: {
        includePaths: ["./node_modules"],
    },
};
