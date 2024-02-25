<script lang="ts">
    import { page } from "$app/stores";
    let error_message: string;
    if ($page.error) {
        if ($page.error.message) {
            error_message = $page.error.message;
        } else {
            error_message = "Unknown error";
        }
    } else {
        error_message = "Unknown error";
    }
    $page.error != null;
</script>

<div>
    <h1 class="mb-4 text-3xl font-bold">
        Error {$page.status}: {error_message}
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
