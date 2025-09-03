<script lang="ts">
    import { page } from "$app/state";
    let error_message: string = $state("Unknown error");
    if (page.error != null && page.error.message != null) {
        error_message = page.error.message;
    }
    page.error != null;
</script>

<div id="error-page">
    <h1>Error {page.status}: {error_message}</h1>
    <p>
        <a
            href="https://github.com/sharpenedblade/sharpenedblade.github.io/issues/new"
            >Open an issue</a
        >
        or send me an <a href="mailto:sharpenedblade@proton.me">email</a> if this
        persists.
    </p>
</div>

<style>
    #error-page {
        max-width: 70ch;
        color: var(--tx);
        h1 {
            margin-block-start: 1em;
            font-size: 3rem;
            font-weight: 700;
            text-align: center;
        }
        * + * {
            margin-block-start: 2em;
        }
        line-height: 1.25;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
