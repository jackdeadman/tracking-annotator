<script>
    import { video } from '../stores/video.js';
    import { frames } from '../stores/annotations.js';
   	import { createEventDispatcher, onMount, tick, onDestroy } from 'svelte';
    import { frame2time } from '../functions/frames.js';
    // import { linspace } from '../functions/maths.js';

    
    function format(seconds) {
		if (isNaN(seconds)) return '...';

		const minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);
		if (seconds < 10) seconds = '0' + seconds;

		return `${minutes}:${seconds}`;
	}

    let element;
    export let videoElement;
    export let time;
    export let context = 5;
    let lasttime = time;

    async function handleOnclick(e) {

        if (e.target == element) {
            let rect = element.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let pct = x / rect.width;
            let delta = pct*context - (context/2);
            videoElement.currentTime += delta;
        }
    }

    let pct = 0;
    $: if ($video.duration) {
        pct = time / $video.duration;
    }

    function calcLeft(frame, t) {
        let pointTime = frame2time(frame);
        let distance = pointTime - t;
        return ((distance/context)+1/2)*100;
    }

    let ticker;
    let points = [];

    onMount(() => {
        ticker = setInterval(() => {

            if ($video.paused) {
                return;
            }

            let pts = $frames.map((frame, index) => ({
            ...frame,
            index,
            hasPosition: (frame != null ) && (frame != 'deleted'),
            position: calcLeft(index, time)
            })).filter(({hasPosition, position}) => hasPosition && (
                // Don't render if outside of element
                position >=0 &&
                position <=100
            ));
            points = pts;
        }, 20);
    });

    onDestroy(() => {
        clearInterval(ticker);
    });

    let width;

</script>

<svelte:body on:click={handleOnclick}/>

<div class="time">{format(time)}</div> 
<div class="outer" bind:this={element} bind:clientWidth={width}>
    <div class="inner" style="width: {pct*100}%"></div>
    <div class="centre"></div>
    {#each points as point (point.index)}
		<div class="point" style="transform: translate({point.position*width/100}px, -50%)"></div>
	{/each}
    <div class="left">-5</div> 
    <div class="right">+5</div>
</div>

<style>
    .time {
        text-align: center;
    }

    .centre {
        width: 5px;
        position: absolute;
        background-color: rgba(255,255,255,0.8);
        height: 50px;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
    }

    .inner {
        height: 50px;
        pointer-events: none;
        margin: 3px 0;
    }

    .point {
        height: 50%;
        width: 2px;
        background-color: #fff ;
        position: absolute;
        top: 50%; 
        z-index: 50;
        transition : transform 0.02 s ease;
        pointer-events: none;
    }

    .outer {
        background-color: #222;
        position: relative;
        width: 50%;
        margin: auto;
        margin-bottom: 30px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2), 0 1px 2px;

    }

    .left {
        position: absolute;
        left: 0;
    }

    .right {
        position: absolute;
        right: 0;
    }
</style>