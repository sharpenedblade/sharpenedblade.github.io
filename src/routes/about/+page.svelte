<script lang="ts">
    let { data } = $props();
</script>

<svelte:head>
    <title>About Me</title>
</svelte:head>

<article class="article-content">
    <h1 class="article-title">{data.title}</h1>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html data.content}
</article>

<style>
    article {
        max-width: min(70ch, calc(100vw - 2rem));
        margin-block: 2rem;
    }
</style>
