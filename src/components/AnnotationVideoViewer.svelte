<script>
    import { frames } from '../stores/annotations.js';
    import { time2frame } from '../functions/frames.js';
    import { fade } from 'svelte/transition';

    export let time;
    export let container;

    function denormalise(position) {

        if (!container) return position;

        let rect = container.getBoundingClientRect();
        return {
            x: position.x*rect.width - 5,
            y: position.y*rect.height - 5,
        }
    }

    $: frame = time2frame(time);
    $: ann = $frames[time2frame(time)];
</script>

{#if ann && (ann !== 'deleted')}
    <div out:fade="{{ duration: 100 }}" class="point" style="transform: translate({denormalise(ann).x + 'px'}, {denormalise(ann).y + 'px'})"></div>
{/if}

<div class="debug">
{frame}
{JSON.stringify(ann)}
</div>


<style>

.debug {
    font-style: italic;
    font-size: 0.8em;
}

.point {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    background-color: #fff;
    transition: 0.1s ease transform;
    /* transform: translate(-50%, -50%); */
}
</style>