<script>
    import axios from 'axios';
    import { toast } from 'svoast';
    import { Plus, Pen, Trash2 } from 'lucide-svelte';
    import trimText from '$lib/trimText.js';
    import toastConfig from '$lib/toastConfig.js';

    export let data;

    let { contents } = data;

    let create = '';
    let context = {};

    async function handleKeydown(event) {
        if (event.key === 'Enter' && !!create) {
            addItem();
        }
    }

    async function addItem() {
        try {
            const response = await axios.post(`/app`, {
                name: trimText(create),
            });

            create = '';
            contents = response.data.data;
            toast.success('Add new grocery success.', toastConfig);
        } catch (e) {
            console.error(e);
            toast.error('Error when adding new grocery!', toastConfig);
        }
    }

    async function editItem() {
        try {
            const response = await axios.patch(`/app?id=${context.id}`, {
                name: trimText(context.name),
                done: context.done,
            });

            context = {};
            contents = response.data.data;
            toast.success('Update grocery success.', toastConfig);
        } catch (e) {
            console.error(e);
            toast.error('Error when updating grocery!', toastConfig);
        }
    }

    async function checkItem(id, check) {
        try {
            const response = await axios.patch(`/app?id=${id}`, {
                done: check,
            });
        } catch (e) {
            console.error(e);
            toast.error('Error when updating grocery!', toastConfig);
        }
    }

    async function deleteItem() {
        try {
            const response = await axios.delete(`/app?id=${context.id}`);

            context = {};
            contents = response.data.data;
            toast.success('Delete grocery success.', toastConfig);
        } catch (e) {
            console.error(e);
            toast.error('Error when deleting grocery!', toastConfig);
        }
    }
</script>

<div class="p-3">
    <h1 class="mt-3 mb-6 text-3xl">Shopping List</h1>
    <div class="flex items-center gap-2">
        <input
            type="text"
            class="input"
            placeholder="Add grocery item"
            bind:value={create}
            on:keydown={handleKeydown}
        />
        <button
            class="btn btn-success"
            title="Add item"
            disabled={!create}
            on:click={() => addItem()}
        >
            <Plus size={16} /> Add
        </button>
    </div>
    <hr class="my-2 border-gray-400" />
    {#each contents as item, i}
        <div
            class="card flex flex-row items-center gap-2 mb-1 px-2 py-2 bg-white hover:bg-gray-100 transition duration-200 border-[1px] border-gray-300 shadow"
        >
            <label class="flex flex-1 items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    class="checkbox"
                    bind:checked={item.done}
                    on:click={() => checkItem(i, event.target.checked)}
                />
                <span
                    class="leading-5 {item.done &&
                        'text-gray-500 line-through'}"
                >
                    {item.name}
                </span>
            </label>
            <div class="flex items-center gap-1">
                <button
                    class="btn btn-sm btn-warning"
                    title="Edit item"
                    on:click={() => {
                        context = { id: i, ...item };
                        item_edit.showModal();
                    }}
                >
                    <Pen size={12} />
                </button>
                <button
                    class="btn btn-sm btn-error text-white"
                    title="Delete item"
                    on:click={() => {
                        context.id = i;
                        item_delete.showModal();
                    }}
                >
                    <Trash2 size={12} />
                </button>
            </div>
        </div>
    {/each}
</div>

<dialog id="item_edit" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
        <h3 class="text-lg font-bold">Edit Grocery</h3>
        <input
            type="text"
            class="input my-4"
            placeholder="Edit grocery item"
            bind:value={context.name}
        />
        <div class="modal-action mt-3">
            <form method="dialog">
                <button class="btn">Cancel</button>
                <button class="btn btn-success" on:click={() => editItem()}>
                    Save
                </button>
            </form>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>

<dialog id="item_delete" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
        <h3 class="text-lg font-bold">Delete Grocery</h3>
        <p class="py-4">Are you sure you want to delete this grocery item?</p>
        <div class="modal-action mt-3">
            <form method="dialog">
                <button class="btn">Cancel</button>
                <button
                    class="btn btn-error text-white"
                    on:click={() => deleteItem()}
                >
                    Delete
                </button>
            </form>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
