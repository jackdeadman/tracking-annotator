import { writable } from 'svelte/store';

function createVideo() {
	const { subscribe, set, update } = writable({
        rate: 1,
		// src: 'https://github.com/intel-iot-devkit/sample-videos/blob/master/people-detection.mp4?raw=true',
		src: 'http://localhost:8080/dev/S02_U02_full.mp4',
        duration: 0
    });

	return {
		subscribe,
		play: () => update((s) => ({ ...s, rate: 1 })),
		pause: () => update((s) => ({ ...s, rate: 0 })),
        setDuration: (duration) => update((s) => ({ ...s, duration })),
        setSrc: (src) => update((s) => ({ ...s, src }))
        
	}; 
}

function createTime() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		forward: (n) => update((s) => s+n),
		back: (n) => update((s) => s-n),
		set
	};
}

function createRate() {
	const { subscribe, set, update } = writable(1);

	return {
		subscribe,
		increase: () => update((s) => Math.min(s+0.5, 4)),
		decrease: () => update((s) => Math.max(s-0.5, 0)),
		set
	};
}



export const video = createVideo();
export const time = createTime();
export const rate = createRate();