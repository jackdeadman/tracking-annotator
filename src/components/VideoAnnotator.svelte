<script>
    import Annotator from './Annotator.svelte';
    import { video, rate } from '../stores/video.js';
    import { frames } from '../stores/annotations.js';
    import VideoProgress from './VideoProgress.svelte';
    import VideoProgressContext from './VideoProgressContext.svelte';
    import AnnotationVideoViewer from './AnnotationVideoViewer.svelte';
    import { time2frame } from '../functions/frames.js';
    import { tick, onMount } from 'svelte';

    // These values are bound to properties of the video
    let paused = true;
    let duration;
    let videoElement;
    let time = 0;
    let seeking;


    async function handleKeydown(e) {
        if (e.key == ' ') {
            paused = !paused;
            e.preventDefault();
        }

        if (e.key == 'ArrowLeft') {
            videoElement.currentTime = time - 1;
        }

        if (e.key == 'ArrowRight') {
            videoElement.currentTime = time + 1;
        }

        console.log($rate)

        if (e.key == 'q') {
            console.log('Increase rate')
            rate.increase();
        }

        if (e.key == 'a') {
            rate.decrease();
        }

    }

    $: video.setDuration(duration);

    $: if (duration) {
        $frames = Array(time2frame(duration)).fill(null)
        console.log('Total frames', time2frame(duration))
        console.log('Duration', duration)
    }


    onMount(async () => {
        videoElement.addEventListener('progress', function() {
            var loadedPercentage = this.buffered.end(0) / this.duration;
            console.log(loadedPercentage)
        });
    });

</script>

<style>
	div {
		position: relative;
	}

	video {
        width: 100%;
        
    }

    .video {
        width: 85%;
        margin: auto;
    }

    .seeking {
        opacity: 0.3;
    }
</style>

<svelte:window on:keydown={handleKeydown}/>


<div class="video" class:seeking>
    <VideoProgress {videoElement} bind:time={time} />
    <Annotator container={videoElement} bind:time={time}>
        <video src={$video.src}
            bind:currentTime={time}
            bind:duration
            bind:seeking
            bind:this={videoElement}
            bind:paused
            bind:playbackRate={$rate}
        ></video>
        <AnnotationVideoViewer container={videoElement} {time}/>
    </Annotator>
    <VideoProgressContext context={20} {videoElement} bind:time={time} />

	<!-- <div class="controls" style="opacity: {duration && showControls ? 1 : 0}">
		<progress value="{(time / duration) || 0}"/>

		<div class="info">
			<span class="time">{format(time)}</span>
			<span>click anywhere to {paused ? 'play' : 'pause'} / drag to seek</span>
			<span class="time">{format(duration)}</span>
		</div>
	</div> -->
</div>