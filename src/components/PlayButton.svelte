<script>
    export let paused;
</script>

<button on:click={() => paused = !paused}>
{#if paused}
Play
{:else}
Pause
{/if}
</button>

<style>
button {
    height: 100%;
    width: 60px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2), 0 1px 2px;
}
</style>