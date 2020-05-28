<script>
    import { frames, annotations } from '../stores/annotations.js';
    import { afterUpdate } from 'svelte';

    let div;

    afterUpdate(() => {
        if (div) {
            div.scrollTo(0, div.scrollHeight);
        }
	});
</script>

<h3>Log</h3>
<ul bind:this={div}>
{#each $annotations as annotation}
    <li>{ JSON.stringify(annotation) }</li>
{/each}
</ul>

<style>
ul {
    background-color: #fff;
    border: 1px solid #ccc;
    height: 200px;
    overflow: scroll;
    margin-bottom: 100px; 
}

li {
    list-style: none;
}

</style>
