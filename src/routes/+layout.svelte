<script>
    import Header from "$lib/components/header.svelte";
    import "../app.css";
</script>

<svelte:head>
    <link rel="icon" href="/favicon.png" />
</svelte:head>

<Header></Header>
<main
    class="ctp-latte mx-8 flex flex-col flex-wrap items-center dark:ctp-mocha"
>
    <slot />
</main>

<style lang="postcss">
    :global(a) {
        @apply font-semibold text-zinc-900 hover:underline dark:text-zinc-50;
    }
    :global(body) {
        @apply bg-zinc-100 dark:bg-zinc-900;
    }
</style>
