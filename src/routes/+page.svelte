<script lang="ts">
    export let data;
    console.log(data.articles);
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
    <h1 class="text-2xl font-bold">All Articles</h1>

    {#each data.articles as article}
        <ArticleLink
            id={article.id}
            title={article.title}
            date={article.date}
            description={article.description}
        />
    {/each}
</div>
