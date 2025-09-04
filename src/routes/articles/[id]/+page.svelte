<script lang="ts">
    let { data } = $props();
    import "$lib/css/flexoki.css";
    import "$lib/css/flexoki-highlightjs.css";
</script>

<svelte:head>
    <title>{data.title}</title>
    <meta name="description" content={data.description} />
</svelte:head>

<article class="article-content">
    <h1 class="article-title">{data.title}</h1>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html data.content}
</article>

<style>
    article {
        max-width: min(65ch, calc(100vw - 4rem));
        margin-block: 2rem;
    }
</style>
