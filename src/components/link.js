import NextLink from "next/link";

export default function Link({ href, children, className }) {
    return (
        <a
            className={`font-semibold text-zinc-900 hover:underline dark:text-zinc-50 ${className}`}
            href={href}
        >
            {children}
        </a>
    );
}

export function InternalLink({ href, children, className }) {
    return (
        <NextLink
            className={`font-semibold text-zinc-900 hover:underline dark:text-zinc-50 ${className}`}
            href={href}
        >
            {children}
        </NextLink>
    );
}
