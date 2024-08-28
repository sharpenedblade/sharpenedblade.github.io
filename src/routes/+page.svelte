<script lang="ts">
    export let data;
    import ArticleLink from "$lib/components/articleLink.svelte";
</script>

<svelte:head>
    <title>Sharpened Blade's Blog</title>
    <meta
        name="description"
        content="Obscenely boring things I write about insanely uninteresting ideas."
    />
</svelte:head>

<div>
    <p class="text-small my-4 text-zinc-700 dark:text-zinc-300">
        <a class="underline" href="feed/rss.xml"> RSS </a> and
        <a class="underline" href="feed/feed.json"> JSON </a> feeds are supported.
    </p>

    {#each data.articles as article}
        <ArticleLink
            id={article.id}
            title={article.title}
            date={article.date}
            description={article.description}
        />
    {/each}
</div>
