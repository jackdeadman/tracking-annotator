<script>
	import VideoSelector from './components/VideoSelector.svelte';
	import VideoAnnotator from './components/VideoAnnotator.svelte';
	import AnnotationViewer from './components/AnnotationViewer.svelte';
	import Header from './components/Header.svelte';
	import { video, time } from './stores/video.js';
	import { annotations, frames } from './stores/annotations.js';
	import { onMount } from 'svelte';
	import { time2frame } from './functions/frames.js'

	export let name;
	let buffered;

	let speed = 1;
	const increment = 0.2;
	let currentTime;
	let paused = true;

</script>


<main>
	<Header />

	<div class="speed">
		<VideoAnnotator />
		<!-- <AnnotationViewer /> -->
	</div>

</main>

<style>
	main {
		/* text-align: center; */
		max-width: 240px;
		margin: 0 auto;
	}

	video {
		width: 100%;
		display: block;
		margin: auto;
	}


	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

</style>