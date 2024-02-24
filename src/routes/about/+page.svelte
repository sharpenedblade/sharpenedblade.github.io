<script lang="ts">
    export let data;
</script>

<svelte:head>
    <title>About Sharpened Blade</title>
    <meta name="description" content="Information about me" />
</svelte:head>

<div
    class="prose-pre:pre-ctp prose prose-zinc my-8 max-w-[80dvw] leading-relaxed dark:prose-invert prose-pre:rounded-none prose-pre:border-2 prose-pre:border-solid prose-pre:border-zinc-200 prose-pre:bg-ctp-base md:max-w-prose prose-pre:dark:border-zinc-800"
>
    <h1>{data.title}</h1>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html data.content}
</div>
