<script>
    import { page } from '$app/stores';
</script>

<svelte:head>
    <title>
        {$page.error.message} | {import.meta.env.VITE_APP_NAME}
    </title>
</svelte:head>

<div class="flex flex-1 justify-center items-center w-full p-12">
    <span>{$page.status}</span>
    <span class="inline-block h-7 mx-4 bg-slate-300 w-px"></span>
    <span class="uppercase">{$page.error.message}</span>
</div>
