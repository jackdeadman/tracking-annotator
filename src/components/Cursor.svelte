<script>
    export let position;
    export let container;
    export let pressed;
    export let scrubbing;

    let posDenormed;
    let rect;


    function denormalise(position) {

        if (!container) return position;

        rect = container.getBoundingClientRect();
        return {
            x: position.x*rect.width - 10,
            y: position.y*rect.height - 10,
        }
    }

    $: posDenormed = denormalise(position);
    $: scale = pressed ? 1.2 : 1;

</script>


{#if posDenormed}
    <div class:pressed class:scrubbing style="transform: translate({posDenormed.x + 'px'}, {posDenormed.y + 'px'}) scale({scale});"></div>
{/if}

<style>
    div {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        position: absolute;
        background-color: rgb(127, 165, 109);
        transition: scale 0.2 ease-in-out;
        pointer-events: none;
        z-index: 100;
    }

    .pressed {
        background-color: green;
    }

    .scrubbing {
        background-color: red;
    }
</style>