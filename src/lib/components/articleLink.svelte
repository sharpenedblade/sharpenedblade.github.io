<script>
    export let id, date, description, title;
</script>

<article class="my-4 flex max-w-prose flex-col">
    <time dateTime={date} class=" text-sm text-zinc-600 dark:text-zinc-300">
        {date}
    </time>
    <a href="/articles/{id}" class="text-xl font-bold">
        {title}
    </a>
    <p class="text-zinc-700 dark:text-zinc-300">{description}</p>
</article>
