<script lang="ts">
    import { page } from "$app/state";
    let error_message: string = $state("Unknown error");
    if (page.error != null && page.error.message != null) {
        error_message = page.error.message;
    }
    page.error != null;
</script>

<div class="my-8 max-w-prose">
    <h1 class="text-4xl font-bold">
        Error {page.status}: {error_message}
    </h1>
    <p>
        <a
            href="https://github.com/sharpenedblade/sharpenedblade.github.io/issues/new"
            >Open an issue</a
        >
        or send me an <a href="mailto:sharpenedblade@proton.me">email</a> if this
        persists.
    </p>
</div>
