<script>
    import Header from "$lib/components/header.svelte";
    import "../app.css";
</script>

<Header></Header>
<div class="mx-auto max-w-fit sm:px-8 sm:py-8">
    <main
        class="ctp-latte flex max-w-[80ch] flex-col flex-wrap items-center bg-zinc-50 p-8 dark:ctp-mocha sm:drop-shadow-2xl dark:bg-zinc-900"
    >
        <slot />
    </main>
</div>

<style lang="postcss">
    :global(a) {
        @apply font-semibold text-zinc-900 hover:underline dark:text-zinc-50;
    }
    :global(body) {
        @apply bg-zinc-50 sm:bg-zinc-200 dark:bg-zinc-900 sm:dark:bg-zinc-800;
    }
</style>
