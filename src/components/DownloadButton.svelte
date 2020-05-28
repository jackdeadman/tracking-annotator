<script>
    import { download } from '../functions/utils.js';

    export let data;
    export let filename = 'untitled.json';

    function handleClick() {
        download(filename, JSON.stringify(data));
    }
</script>

<button on:click={handleClick}><slot/></button>

<style>
button {
    margin: 0;
}
</style>