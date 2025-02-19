<script>
    import { onMount } from 'svelte';

    export let size = 16;

    let time = '';

    function timeFormatter() {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        time = `${hours}:${minutes}`;
    }

    timeFormatter();

    onMount(() => {
        const interval = setInterval(timeFormatter, 1000);
        return () => clearInterval(interval);
    });
</script>

<div class="flex justify-center">
    <div class="flex flex-col gap-[1.75em] pt-[6.75em] w-[.25em]">
        <div class="bg-gray-500 h-[1.75em] rounded-s-[.5em]"></div>
        <div class="flex flex-col gap-[1em] w-[.5em]">
            <div class="bg-gray-500 h-[3em] rounded-s-[.5em]"></div>
            <div class="bg-gray-500 h-[3em] rounded-s-[.5em]"></div>
        </div>
    </div>
    <div
        class="flex flex-col justify-start items-center bg-white w-[17.5em] aspect-[9/18.5] rounded-[3em] border-[.75em] border-gray-700 overflow-hidden relative shadow-2xl"
        style="font-size: {size}px;"
    >
        <div
            class="flex justify-center items-start px-[1.25em] bg-white leading-none text-[.65em] w-full absolute z-[100] left-0 top-0"
        >
            <div class="flex-1 pt-[.5em] text-center text-[1.15em] font-bold">
                {time}
            </div>
            <div
                class="bg-gray-700 w-[10em] pt-[1.75em] rounded-b-[1.5em] relative"
            >
                <div
                    class="bg-gray-600 w-[4em] h-[.35em] rounded-[.35em] absolute top-[.25em] left-[3em]"
                ></div>
                <div
                    class="bg-blue-300/20 w-[.75em] aspect-square rounded-full absolute top-[.25em] right-[1.75em]"
                ></div>
            </div>
            <div
                class="indicators flex-1 pt-[1.75em] text-center font-bold"
            ></div>
        </div>
        <div
            class="flex-1 flex-col mt-[1.5em] w-full h-full overflow-y-auto text-base"
        >
            <slot />
        </div>
    </div>
    <div class="flex pt-[11.25em] w-[.25em]">
        <div class="flex-1 bg-gray-500 h-[5em] rounded-e-[.5em]"></div>
    </div>
</div>

<style>
    .indicators {
        background: url(/indicators.svg) 0.5em 0.5em no-repeat;
        background-size: 4.35em;
    }
</style>
