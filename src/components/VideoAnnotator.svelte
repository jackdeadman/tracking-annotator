<script>
    import Annotator from './Annotator.svelte';
    import { video, rate } from '../stores/video.js';
    import { frames } from '../stores/annotations.js';
    import VideoProgress from './VideoProgress.svelte';
    import VideoProgressContext from './VideoProgressContext.svelte';
    import AnnotationVideoViewer from './AnnotationVideoViewer.svelte';
    import OpticalFlow from './OpticalFlow.svelte';
    import { time2frame } from '../functions/frames.js';
    import { tick, onMount } from 'svelte';
    import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

    // These values are bound to properties of the video
    let paused = true;
    let duration;
    let videoElement;
    let time = 0;
    let seeking = false;
    let points = [];


    async function handleKeydown(e) {
        if (document.activeElement.nodeName == 'INPUT') {
            return;
        }

        if (e.key == ' ') {
            if (paused) {
                let oldrate = $rate;
                $rate = 0.1;
                videoElement.play();
                setTimeout(() => $rate=oldrate, 200);
            } else {
                videoElement.pause();
            }
            e.preventDefault();
        } 

        if (e.key == 'ArrowLeft') {
            videoElement.currentTime = time - 1;
        }

        if (e.key == 'ArrowRight') {
            videoElement.currentTime = time + 1;
        }

        if (e.key == 'q') {
            rate.increase();
        }

        if (e.key == 'a') {
            rate.decrease();
        }

    }

    $: video.setDuration(duration);

    $: if (duration) {
        $frames = Array(time2frame(duration)).fill(null)
    }

    let error = false;
    let loaded = false;

    onMount(() => {
        videoElement.addEventListener('error', () => {
            error = true;
            loaded = false;
        });

        videoElement.addEventListener('seeking', (e) => {
            // Needed as pausing fires seeking event;
            seeking = e.target.currentTime !== time;
        });

        videoElement.addEventListener('seeked', (e) => {
            seeking = false;
        });

        videoElement.addEventListener('loadeddata', () => {
            loaded = true;
            error = false;
        });
    });


</script>

<style>
	div {
		position: relative;
	}

	video {
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px;
        background: #fff;
        margin: auto;
        width: 100%;
        /* display: block; */
    }

    .video {
        width: 100%;
        /* width: 700px; */
        /* max-width: 100%; */
        max-width: 1100px;
        margin: 0 30px;
        display: block;
        margin: auto;
        /* margin: 30px 200px; */
    }

    .seeking {
        opacity: 0.6;
    }

    .speed {
        position: absolute;
        right: 30px;
        top: 60px;
        font-size: 4em;
        color: #aaa;
        font-style: italic;
        pointer-events: none;
    }

    .error {
        font-size: 2em;
    }

</style>

<svelte:window on:keydown={handleKeydown}/>
<OpticalFlow {videoElement} bind:points {loaded} {time} {paused} />


<div class="video" class:seeking>
    <VideoProgress bind:paused {videoElement} bind:time={time} />
    <Annotator bind:points={points} container={videoElement} bind:time={time}>
        <video src={$video.src}
            crossorigin="anonymous"
            bind:currentTime={time}
            bind:duration
            bind:this={videoElement}
            bind:paused
            preload
            bind:playbackRate={$rate}
        ></video>
        {#if error}
        <div class="error">
            Failed to load video.
        </div>
        {/if}

        {#if loaded && !error}
        <AnnotationVideoViewer container={videoElement} {time}/>
        {/if}

    </Annotator>
    <div class="speed">{$rate}x</div>
    <VideoProgressContext context={10} {videoElement} bind:time={time} />
</div>
