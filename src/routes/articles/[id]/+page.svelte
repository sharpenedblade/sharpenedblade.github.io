<script lang="ts">
    export let data;
    import "@catppuccin/highlightjs/sass/catppuccin.variables.scss";
</script>

<svelte:head>
    <title>{data.title}</title>
    <meta name="description" content={data.description} />
</svelte:head>

<div
    class="prose-pre:pre-ctp prose prose-zinc max-w-full leading-relaxed dark:prose-invert prose-pre:rounded-none prose-pre:border-2 prose-pre:border-solid prose-pre:border-zinc-200 prose-pre:bg-ctp-base prose-pre:dark:border-zinc-800"
>
    <h1>{data.title}</h1>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html data.content}
</div>
