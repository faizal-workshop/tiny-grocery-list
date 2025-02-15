<script>
  import "../app.css";
</script>

<svelte:head>
  <title>
    {import.meta.env.VITE_APP_NAME}
  </title>
</svelte:head>

<slot />
