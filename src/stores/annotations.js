import { writable } from 'svelte/store';

function createAnnotations() {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		// NOTE: This needs to be done in place because it is updated VERY frequently. It causes serious
		// performance problems when it is large.
		add: (ann) => update(anns => {
			anns.push(ann)
			// Force svelte to rerender
			anns = anns;
			return anns;
		}),
		reset: () => set([])
	};
}

export const annotations = createAnnotations();
export const frames = writable([]);