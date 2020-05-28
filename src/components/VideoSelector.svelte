<script>
    import { createEventDispatcher } from 'svelte';
    export let file = '';
    const dispatch = createEventDispatcher();

    function handleChange() {
        dispatch('change', file);
    }

</script>

<input type="text" bind:value={file} on:input={handleChange}/>

<style>

</style>