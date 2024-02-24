<script lang="ts">
    export let id: string, date: Date, description: string, title: string;
</script>

<article class="my-4 flex max-w-prose flex-col">
    <time
        dateTime={date.toISOString()}
        class=" text-sm text-zinc-600 dark:text-zinc-300"
    >
        {date.toLocaleDateString()}
    </time>
    <a href="/articles/{id}" class="text-xl font-bold">
        {title}
    </a>
    <p class="text-zinc-700 dark:text-zinc-300">{description}</p>
</article>
