<script>
    import Cursor from './Cursor.svelte';
    import { frames, annotations } from '../stores/annotations.js';
    // import { time } from '../stores/video.js';
    import { time2frame } from '../functions/frames.js';

    let position;
    export let container;
    let pressed;
    let scrubbing = false;
    let visible;
    let track = 0;
    export let time;


    function getNormalisedPosition(position) {
        let rect = container.getBoundingClientRect();
        let x = position.x - rect.left;
        let y = position.y - rect.top;

        return { x: x / rect.width, y: y / rect.height };
    }

    function handleMousemove(e) {
        position = getNormalisedPosition({
            x: e.clientX,
            y: e.clientY
        });

        if (pressed) {
            $frames[time2frame(time)] = {
                ...position, track, time
            };
        }
        if (scrubbing) {
            $frames[time2frame(time)] = null;
        }

        if (pressed || scrubbing) {
 
            annotations.add({
                ...position,
                time,
                track,
                left: pressed,
                right: scrubbing
            })
            // console.log($frames)
        }
    }

    let ticker;

    function handleMouseup(e) {
        pressed = false;
    
        position = getNormalisedPosition({
            x: e.clientX,
            y: e.clientY
        });
        clearInterval(ticker);
        ticker = null;
        scrubbing = false;
    }

    function handleMousedown(e) {

        if (e.buttons == 1) {
            pressed = true;
            scrubbing = false;
            track += 1;
        }

        if (e.buttons == 2) {
            pressed = false;
            scrubbing = true;
        }

        ticker = setInterval(() => {
            if (pressed) {
                $frames[time2frame(time)] = {
                    ...position, track, time
                };
            }
            if (scrubbing) {
                $frames[time2frame(time)] = null;
            }

            annotations.add({
                ...position,
                time: time,
                track,
                left: pressed,
                right: scrubbing
            })
        }, 50);
    }

    function handleRightClick() {
        return false;
    }

    function handleKeydown(e) {
        console.log(e.key)
        if (e.key === 'Backspace') {
            scrubbing = true;
            pressed = false;

            if (!ticker) {
                    ticker = setInterval(() => {
                    if (scrubbing) {
                        $frames[time2frame(time)] = null;
                    }

                    annotations.add({
                        ...position,
                        time: time,
                        track,
                        left: pressed,
                        right: scrubbing
                    })
                }, 50);
            }
        }

    }

    function handleKeyup(e) {
        if (e.key === 'Backspace') {
            scrubbing = false;
            clearInterval(ticker);
            ticker = null;
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} on:mousemove={handleMousemove} on:mouseup={handleMouseup}/>

<div on:mousedown={handleMousedown} on:contextmenu|preventDefault={handleRightClick} on:mouseleave={() => visible=false} on:mouseenter={visible=true}>
    <div class="video">
        {#if visible}
            <Cursor {position} {pressed} {container} {scrubbing} />
        {/if}
        <div bind:this={container}><slot /></div>
    </div>
</div>


<style>
    div {
        position: relative;
    }

    .video {
        background-color: #ccc;
        padding: 100px 350px;
        border-top: 10px #aaa solid;
        border-bottom: 10px #aaa solid;
        pointer-events: none;
    }
</style>