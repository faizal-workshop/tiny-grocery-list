<script>
  import "../app.css";
  import { page } from "$app/stores";
  import { Toasts } from "svoast";

  $: isValidStatusCode = $page.status >= 200 && $page.status < 300;
</script>

<svelte:head>
  <title>
    {import.meta.env.VITE_APP_NAME}
  </title>
</svelte:head>

{#if !isValidStatusCode}
  <slot />
{:else}
  <slot />
  <Toasts position={"bottom-center"} />
{/if}
