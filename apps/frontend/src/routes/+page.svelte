<script>
  import { onMount } from "svelte";

  import Phone from "$lib/component/Phone.svelte";

  let loading = true;
  let interval;
  let canHide = false;

  function loadingCheck() {
    if (canHide) {
      clearInterval(interval);
      loading = false;
    }
  }

  onMount(() => {
    loadingCheck();
    interval = setInterval(loadingCheck, 250);
  });
</script>

<main class="flex flex-1 flex-col justify-center items-center p-3">
  <Phone size={20}>
    {#if loading}
      <div class="flex items-center justify-center bg-white absolute inset-0">
        <div
          class="w-[4em] aspect-square border-[.65em] border-gray-300 border-t-gray-500 animate-spin rounded-full"
        ></div>
      </div>
    {/if}
    <iframe
      src="/app"
      class="w-full h-full border-0"
      title="Main application container"
      onload={() => (canHide = true)}
    ></iframe>
  </Phone>
</main>
