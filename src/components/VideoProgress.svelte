<script>
    import { video } from '../stores/video.js';
    import { frames } from '../stores/annotations.js';
   	import { createEventDispatcher, onMount } from 'svelte';
    import { tick, afterUpdate } from 'svelte';
    import { time2frame } from '../functions/frames.js';
    import SvelteTooltip from 'svelte-tooltip';
    import { spring } from 'svelte/motion';
    import { fade } from 'svelte/transition';
    import PlayButton from './PlayButton.svelte';

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
    export let paused;

    async function handleOnclick(e) {

        if (e.target == element) {
            let rect = element.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let pct = x / rect.width;
            videoElement.currentTime = (pct*$video.duration).toString();
        }
    }

    let pct = 0;
    $: if ($video.duration) {
        pct = time / $video.duration;
    }

    let canvas;
  
    onMount(() => {
        // Render off the main thread
        let worker = new Worker('./workers/progress.js');
        let ctx = canvas.getContext('2d');
        let canvasData = ctx.getImageData(0, 0, 4000, 1);

        worker.postMessage({ frames: $frames });
        worker.addEventListener('message', e => {
            canvasData = e.data;
        });


        requestAnimationFrame(function ticker() {
            if ($video.paused) {
                requestAnimationFrame(ticker);
                return;
            }

            worker.postMessage({ frames: $frames });

            // let framesPerPixel = $frames.length/1920;


            ctx.clearRect(0, 0, 1920, 1);
            // let canvasData = ctx.getImageData(0, 0, 1920, 1);
            
            // for (let i=0; i<=1920; ++i) {
            //     let frameIndex = Math.round(framesPerPixel*i)
            //     let frame = $frames[frameIndex];
            //     let hasPosition = (frame != null) && (frame != 'deleted');
            //     if (hasPosition) {
            //         drawPixel(i, 0, 255, 255, 255, 255);
            //     }
            // }
  
            ctx.putImageData(canvasData, 0, 0);
            requestAnimationFrame(ticker);
        });
    });


</script>

<svelte:body on:click={handleOnclick}/>
<svelte:window on:mousemove="{e => coords.set({ x: e.clientX - element.getBoundingClientRect().x, y: e.clientY })}" />

<div class="container">
<div class="play"><PlayButton bind:paused /></div>


<div class="outer" bind:this={element} on:mouseleave={() => visible=false} on:mouseenter={() => visible=true}>
    {#if element && visible}
    <div in:fade="{{duration: 200}}" out:fade="{{duration: 200}}" class="clock" style="left: {$coords.x / element.getBoundingClientRect().width*100}%">
        <span>
        {format($coords.x / element.getBoundingClientRect().width * $video.duration)}
        </span>
        </div>
    {/if}
    <div class="inner" style="width: {pct*100}%"></div>
    <canvas bind:this={canvas} height={1} width={4000}></canvas>
</div>

</div>

<style>

    .container {
        display: flex;
    }


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
        width: 100%;
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
