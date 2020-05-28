<script>
    import { video } from '../stores/video.js';
    import { frames } from '../stores/annotations.js';
   	import { createEventDispatcher, onMount } from 'svelte';
    import { tick } from 'svelte';
    // import { linspace } from '../functions/maths.js';

    


    let element;
    export let videoElement;
    export let time;

    async function handleOnclick(e) {

        if (e.target == element) {
            let rect = element.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let pct = x / rect.width;
            console.log('String: ', (pct*$video.duration).toString())
            videoElement.currentTime = (pct*$video.duration).toString();
            console.log(videoElement.currentTime)
        }
    }

    let pct = 0;
    $: if ($video.duration) {
        pct = time / $video.duration;
    }

    let points = []
    $: {
        points = $frames.map((frame, index) => ({
            index, hasPosition: frame != null
    })).filter(({hasPosition}) => hasPosition);
    }

</script>

<svelte:body on:click={handleOnclick}/>


<div class="outer" bind:this={element}>
    <div class="inner" style="width: {pct*100}%"></div>
    {#each points as point (point.index)}
		<div class="point" style="left: {point.index/$frames.length*100}%"></div>
	{/each}
</div>

<style>
    .inner {
        height: 50px;
        background-color: green;
        pointer-events: none;
    }

    .point {
        height: 50%;
        width: 2px;
        background-color: #fff ;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 50;
    }

    .outer {
        background-color: #eee;
        position: relative;
    }
</style>