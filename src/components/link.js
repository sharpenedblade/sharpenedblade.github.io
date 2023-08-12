import NextLink from "next/link";

export default function Link({ href, children, className }) {
    return (
        <a
            className={`font-semibold text-nord8 hover:underline ${className}`}
            href={href}
        >
            {children}
        </a>
    );
}

export function InternalLink({ href, children, className }) {
    return (
        <NextLink
            className={`font-semibold text-nord8 hover:underline ${className}`}
            href={href}
        >
            {children}
        </NextLink>
    );
}
