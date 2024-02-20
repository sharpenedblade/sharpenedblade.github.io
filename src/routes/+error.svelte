<script>
    import { page } from "$app/stores";
</script>

<h1>Sorry... Error code: {$page.status}</h1>
<p>{$page.error.message}</p>
<p>
    <a
        href="https://github.com/sharpenedblade/sharpenedblade.github.io/issues/new"
        >Open an issue</a
    >
    or send me an <a href="mailto:sharpenedblade@proton.me">email</a> if this persists.
</p>
