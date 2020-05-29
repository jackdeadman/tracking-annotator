// https://stackoverflow.com/questions/7812514/drawing-a-dot-on-html5-canvas
function drawPixel (canvasData, x, y, r, g, b, a) {
    let index = (x + y * 4000) * 4;

    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
}

self.addEventListener('message', (e) => {
    let res = 4000;
    let {frames} = e.data;
    let canvas = new OffscreenCanvas(res, 1);
    let ctx = canvas.getContext('2d');
    let canvasData = ctx.getImageData(0, 0, res, 1);

    frames.forEach((frame, index) => {
        let hasPosition = (frame != null) && (frame != 'deleted');
        if (hasPosition) {
            let pct = index/frames.length;
            let px = parseInt(pct*res);
            drawPixel(canvasData, px, 0, 255, 255, 255, 255);
        }
    });
    self.postMessage(canvasData);
});