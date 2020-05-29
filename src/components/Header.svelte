<script>
    import { video } from '../stores/video.js';
    import DownloadButton from './DownloadButton.svelte';
    import { annotations, frames } from '../stores/annotations.js';
    import { beforeUpdate, afterUpdate } from 'svelte';
    let focus = true;

    function toName(url) {
        let parts = url.split('/');
        let name = parts[parts.length-1];
        return name;
    }

    function handleInput(e) {
        let value = e.target.value;

        if (value != $video.src) {
            video.setSrc(value);
        }
    }

    function handleKey(e) {
        if (e.key == 'Enter') {
            e.target.blur();
        }
        console.log(e.key)
        if (e.key == 'Escape') {
            e.target.blur();
        }
    }

    function handleFocus(e) {
        focus = true;
    }

</script>


<header>
    {#if focus || ($video.src=='')}
        <div class="blocker"><span>Please enter video url</span></div>
    {/if}
    <h1>
    { toName($video.src) }
    </h1>
    <div class="buttons">
        <div class:focus={focus || ($video.src=='')}>
            <input autofocus on:keydown={handleKey}
                on:focus={handleFocus} on:blur={()=> focus=false} placeholder="Location of mp4 file" type="text" value={$video.src} on:input={handleInput}>
        </div>
        <DownloadButton data={$annotations} filename='log.json'>Download raw input</DownloadButton>
        <DownloadButton data={$frames} filename='labels.json'>Download labels</DownloadButton>
    </div>
</header>

<style>
header {
    padding: 10px 144px;
    background-color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
}


h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 200;
    /* text-align: center; */
    margin: 0;
}

.buttons {
    /* position: absolute;
    right: 0;
    top: 0; */
    background-color: #ccc;
    padding: 5px;
    display: flex;
}

input {
    height: 100%;
    width: 350px;
    opacity: 0.5;
    transition: 1s position all;
    cursor: pointer;
}

.focus input {
    opacity: 1;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 400px;
    z-index: 400;
    height: 50px;
    text-size: 3em;
    cursor: auto;
}

.blocker {
    position: absolute;
    height: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 300;
    text-align: center;
    background: rgba(252, 255, 255, 0.9);
}

.blocker span {
    display: block;
    position: absolute;
    top: 300px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 3em;
}

</style>