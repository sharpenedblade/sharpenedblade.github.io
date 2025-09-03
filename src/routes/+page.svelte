<script lang="ts">
    import ArticleLink from "$lib/components/articleLink.svelte";
    let { data } = $props();
</script>

<svelte:head>
    <title>sharpenedblade's Blog</title>
</svelte:head>

<div>
    <p id="feed-info">
        <a href="feed/rss.xml"> RSS </a> and
        <a href="feed/feed.json"> JSON </a> feeds are supported.
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

<style>
    #feed-info {
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-size: 1rem;
        color: var(--tx-2);
        a {
            color: var(--tx);
        }
    }
</style>
