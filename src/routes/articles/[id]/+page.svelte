<script>
    export let data;
</script>

<svelte:head>
    <title>{data.title}</title>
    <meta name="description" content={data.description} />
</svelte:head>

<div
    class="prose prose-zinc my-8 max-w-[80dvw] leading-relaxed dark:prose-invert md:max-w-prose"
>
    <h1>{data.title}</h1>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html data.content}
</div>
