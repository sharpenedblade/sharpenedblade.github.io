<script lang="ts">
    import Header from "$lib/components/header.svelte";
    import "../app.css";
    interface Props {
        children?: import("svelte").Snippet;
    }

    let { children }: Props = $props();
</script>

<svelte:head>
    <link rel="icon" href="/favicon.png" />
</svelte:head>

<Header></Header>
<main
    class="ctp-latte mx-8 flex flex-col flex-wrap items-center dark:ctp-mocha"
>
    {@render children?.()}
</main>

<style lang="postcss">
    :global(a) {
        @apply font-semibold text-zinc-900 hover:underline dark:text-zinc-50;
    }
    :global(body) {
        @apply bg-zinc-100 dark:bg-zinc-900;
    }
</style>
