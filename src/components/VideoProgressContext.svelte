<script>
    import { video } from '../stores/video.js';
    import { frames } from '../stores/annotations.js';
   	import { createEventDispatcher, onMount, tick, onDestroy } from 'svelte';
    import { frame2time, time2frame } from '../functions/frames.js';
    import { spring } from 'svelte/motion';
    import { fade } from 'svelte/transition';
    import PlayButton from './PlayButton.svelte';

    // import { linspace } from '../functions/maths.js';

    let visible = false;
    let innerElement;

    let coords = spring({ x: 50, y: 50 }, {
		stiffness: 0.5,
		damping: 0.95
    });
    
    function format(seconds, withRem=false) {
        if (seconds < 0) return '0:00';
        if (isNaN(seconds)) return '...';
        
        let rem = seconds - parseInt(seconds);
        rem = (Math.round(rem*100)/100).toString();
        rem = rem.slice(2)

		const minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);
        if (seconds < 10) seconds = '0' + seconds;
        
        if (withRem) {
            return `${minutes}:${seconds}.${rem}`;
        } else {
            return `${minutes}:${seconds}`;
        }
	}

    let element;
    export let videoElement;
    export let time;
    export let context = 5;
    let lasttime = time;

    function calcTime(x) {
        let rect = element.getBoundingClientRect();
        let pct = x / rect.width;
        let delta = pct*context - (context/2);
        return time + delta;;
    }

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

    let points = [];

    onMount(() => {
        // Only render when we have time to.
        requestAnimationFrame(function ticker() {
            if ($video.paused) {
                requestAnimationFrame(ticker);
                return;
            }

            // Get only the frames that could be visible
            let visibleFrames = [];
            let start = time2frame((time-(context/2))-1);
            let end = time2frame((time+(context/2))+1);

            for (let i=0; i<(end-start); ++i) {
                visibleFrames[i] = [$frames[start+i], start+i];
            }

            let pts = visibleFrames.map(([frame, index]) => ({
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

            requestAnimationFrame(ticker);
        });
    });


    let width;

</script>

<svelte:body on:click={handleOnclick}/>
<svelte:window on:mousemove="{e => coords.set({ x: e.clientX - element.getBoundingClientRect().x, y: e.clientY })}" />


<div class="time">{format(time)}</div>

<div class="outer" bind:this={element} bind:clientWidth={width} on:mouseleave={() => visible=false} on:mouseenter={() => visible=true}>
    <div bind:this={innerElement} class="inner" style="width: 100%"></div>
    <div class="centre"></div>
    {#if innerElement && visible}
    <div in:fade="{{duration: 200}}" out:fade="{{duration: 200}}" class="clock" style="left: {$coords.x / innerElement.getBoundingClientRect().width*100}%">
        <span>
        {format(calcTime($coords.x), true)}
        </span>
        </div>
    {/if}
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

    .clock {
        position: absolute;
        top: 0;
        z-index: 10000;
        color: #ccc;
        background-color:rgba(0,0,0,0.4);
        height: 50px;
        width: 10px;
        box-sizing: border-box;
        pointer-events: none;
    }
</style>