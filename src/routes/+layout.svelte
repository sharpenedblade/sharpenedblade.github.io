<script lang="ts">
    import "destyle.css";
    import "$lib/css/flexoki.css";
    import "$lib/css/fonts.css";
    import "../app.css";
    import "$lib/css/prose.css";
    import Header from "$lib/components/header.svelte";
    interface Props {
        children?: import("svelte").Snippet;
    }

    let { children }: Props = $props();
</script>

<svelte:head>
    <link rel="icon" href="/favicon.png" />
</svelte:head>

<Header></Header>
<main>
    {@render children?.()}
</main>

<style>
    :global(a:hover) {
        text-decoration: underline;
    }
    :global(body) {
        background-color: var(--bg);
    }
    main {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin-inline: 2rem;
        align-items: center;
        justify-content: center;
    }
</style>
