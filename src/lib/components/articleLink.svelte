<script lang="ts">
    interface Props {
        id: string;
        date: Date;
        description: string;
        title: string;
    }

    let { id, date, description, title }: Props = $props();
</script>

<article>
    <time dateTime={date.toISOString()}>
        {date.toLocaleDateString()}
    </time>
    <a href="/articles/{id}">
        {title}
    </a>
</article>

<style>
    time {
        color: var(--tx-2);
        font-size: 0.85rem;
    }
    article {
        color: var(--tx);
        a {
            font-family: "Libertinus Serif";
            font-weight: bold;
            font-size: 1.1rem;
        }
        display: flex;
        flex-direction: column;
        max-width: 70ch;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
</style>
