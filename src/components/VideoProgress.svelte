<script>
    import { video } from '../stores/video.js';
    import { frames } from '../stores/annotations.js';
   	import { createEventDispatcher, onMount } from 'svelte';
    import { tick, afterUpdate } from 'svelte';
    import { time2frame } from '../functions/frames.js';
    import SvelteTooltip from 'svelte-tooltip';
    import { spring } from 'svelte/motion';
    import { fade } from 'svelte/transition';

    let coords = spring({ x: 50, y: 50 }, {
		stiffness: 0.5,
		damping: 0.95
    });
    
    function format(seconds) {
		if (isNaN(seconds)) return '...';

		const minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);
		if (seconds < 10) seconds = '0' + seconds;

		return `${minutes}:${seconds}`;
	}

    let element;
    let visible = false;
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
            index, hasPosition: (frame != null ) && (frame != 'deleted')
    })).filter(({hasPosition}) => hasPosition);

    }

    let ctx;
    onMount(() => {
        ctx = canvas.getContext('2d');
    });


    let canvas;
    afterUpdate(() => {
        if (canvas) {
            ctx.clearRect(0, 0, 1920, 1);
            var canvasData = ctx.getImageData(0, 0, 1920, 1);
            // https://stackoverflow.com/questions/7812514/drawing-a-dot-on-html5-canvas
            function drawPixel (x, y, r, g, b, a) {
                var index = (x + y * 1920) * 4;

                canvasData.data[index + 0] = r;
                canvasData.data[index + 1] = g;
                canvasData.data[index + 2] = b;
                canvasData.data[index + 3] = a;
            }

            points.forEach(point => {
                let pct = point.index/$frames.length;
                let px = Math.round(pct*1920);
                drawPixel(px, 0, 255, 255, 255, 255);
            });
            ctx.putImageData(canvasData, 0, 0);
        }
    });

</script>

<svelte:body on:click={handleOnclick}/>
<svelte:window on:mousemove="{e => coords.set({ x: e.clientX - element.getBoundingClientRect().x, y: e.clientY })}" />

{#if element && visible}
<div in:fade="{{duration: 200}}" out:fade="{{duration: 200}}" class="clock" style="left: {$coords.x / element.getBoundingClientRect().width*100}%">
    <span>
    {format($coords.x / element.getBoundingClientRect().width * $video.duration)}
    </span>
    </div>
{/if}

<div class="outer" bind:this={element} on:mouseleave={() => visible=false} on:mouseenter={() => visible=true}>
    <div class="inner" style="width: {pct*100}%"></div>
    <canvas bind:this={canvas} height={1} width={1920}></canvas>
    <!-- {#each points as point (point.index)}
		<div class="point" style="left: {point.index/$frames.length*100}%"></div>
	{/each} -->
</div>

<style>

    .hidden {
        display: none;
    }

    .clock {
        position: absolute;
        z-index: 100;
        transform: translate(-50%, 0);
        color: #000;
        background-color:rgba(0,0,0,0.2);
        height: 50px;
        width: 10px;
        box-sizing: border-box;
        pointer-events: none;
    }

    .clock span {
        margin-left: -15px;
        margin-top: -20px;
        display: block;
        /* position: absolute; */
    }


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
        pointer-events: none;

    }

    .outer {
        background-color: #eee;
        position: relative;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2), 0 1px 2px;

    }

    canvas {
        width: 100%;
        height: 20px;
        position: absolute;
        z-index: 100;
        top: 50%;
        pointer-events: none;
        transform: translateY(-50%);
    }
</style>