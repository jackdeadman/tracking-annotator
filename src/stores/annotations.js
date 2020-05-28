import { writable } from 'svelte/store';

function createAnnotations() {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		add: (ann) => update(anns => [...anns, ann]),
		reset: () => set([])
	};
}

export const annotations = createAnnotations();
export const frames = writable([]);