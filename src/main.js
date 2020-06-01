import App from './App.svelte';
import { interval } from './functions/utils.js'

const app = new App({
	target: document.body,
	props: {
		name: 'Video Annotator'
	}
});


export default app;
