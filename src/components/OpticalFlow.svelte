<script>
    import { frames } from '../stores/annotations.js';
    import { time2frame } from '../functions/frames.js';

    let canvasHeight;
    let canvasWidth;
    let canvas;
    export let paused;

    export let loaded;
    export let videoElement;
    export let time;
    export let points;

    let renderedPoint;

    $: console.log('Points: ', points)

    let gui,options,ctx;
    let curr_img_pyr, prev_img_pyr, point_count, point_status, prev_xy, curr_xy;

    $: {
        console.log('Changed')
        console.log(points[0], renderedPoint)
        if (points[0] != renderedPoint) {
    
            curr_img_pyr = new jsfeat.pyramid_t(3);
            prev_img_pyr = new jsfeat.pyramid_t(3);
            curr_img_pyr.allocate(960, 540, jsfeat.U8_t|jsfeat.C1_t);
            prev_img_pyr.allocate(960, 540, jsfeat.U8_t|jsfeat.C1_t);

            point_count = 0;
            point_status = new Uint8Array(100);
            prev_xy = new Float32Array(100*2);
            curr_xy = new Float32Array(100*2);

            if (points[0]) {
                let coords = {
                    x: points[0].x * canvasWidth,
                    y: points[0].y * canvasHeight
                }

                if(coords.x > 0 & coords.y > 0 & coords.x < canvasWidth & coords.y < canvasHeight) {
                    curr_xy[point_count<<1] = coords.x;
                    curr_xy[(point_count<<1)+1] = coords.y;
                    point_count = 1;
                } else {
                    point_count = 0;
                }
            }
        }
    }

    function run() {


    var demo_opt = function(){
        this.win_size = 20;
        this.max_iterations = 30;
        this.epsilon = 0.01;
        this.min_eigen = 0.001;
    }

    function demo_app(videoWidth, videoHeight) {
        canvasWidth  = canvas.width;
        canvasHeight = canvas.height;
        ctx = canvas.getContext('2d');

        ctx.fillStyle = "rgb(0,255,0)";
        ctx.strokeStyle = "rgb(0,255,0)";

        curr_img_pyr = new jsfeat.pyramid_t(3);
        prev_img_pyr = new jsfeat.pyramid_t(3);
        curr_img_pyr.allocate(960, 540, jsfeat.U8_t|jsfeat.C1_t);
        prev_img_pyr.allocate(960, 540, jsfeat.U8_t|jsfeat.C1_t);

        point_count = 0;
        point_status = new Uint8Array(100);
        prev_xy = new Float32Array(100*2);
        curr_xy = new Float32Array(100*2);

        options = new demo_opt();

    }

    function tick() {
        requestAnimationFrame(tick);
        let noFeatures = point_count == 0;

        if (paused || noFeatures) {
            return;
        }

        renderedPoint = points[0];

        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            var vRatio = (canvasHeight / 1080) * 1920;
            ctx.drawImage(video, 0, 0, vRatio, canvasHeight);
            var imageData = ctx.getImageData(0, 0, 960, 540);

            // swap flow data
            var _pt_xy = prev_xy;
            prev_xy = curr_xy;
            curr_xy = _pt_xy;
            var _pyr = prev_img_pyr;
            prev_img_pyr = curr_img_pyr;
            curr_img_pyr = _pyr;

            jsfeat.imgproc.grayscale(imageData.data, 960, 540, curr_img_pyr.data[0]);

            curr_img_pyr.build(curr_img_pyr.data[0], true);
            jsfeat.optical_flow_lk.track(prev_img_pyr, curr_img_pyr, prev_xy, curr_xy, point_count, options.win_size|0, options.max_iterations|0, point_status, options.epsilon, options.min_eigen);

            prune_oflow_points(ctx);

        }
    }

    // function on_canvas_click(e) {
    //     var coords = canvas.relMouseCoords(e);
    //     if(coords.x > 0 & coords.y > 0 & coords.x < canvasWidth & coords.y < canvasHeight) {
    //         curr_xy[point_count<<1] = coords.x;
    //         curr_xy[(point_count<<1)+1] = coords.y;
    //         point_count++;
    //     }
    // }
    // canvas.addEventListener('click', on_canvas_click, false);

    function draw_circle(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }

    function prune_oflow_points(ctx) {
        var n = point_count;
        var i=0,j=0;

        for(; i < n; ++i) {
            if(point_status[i] == 1) {
                if(j < i) {
                    curr_xy[j<<1] = curr_xy[i<<1];
                    curr_xy[(j<<1)+1] = curr_xy[(i<<1)+1];
                }
                draw_circle(ctx, curr_xy[j<<1], curr_xy[(j<<1)+1]);
                $frames[time2frame(time)] = {
                    x: curr_xy[j<<1] / canvasWidth,
                    y: curr_xy[(j<<1)+1] / canvasHeight,
                    time,
                    track: "Flow"
                }
                ++j;
            }
        }
        if (point_count == 0) {
            points = [];
        }
    }

    function relMouseCoords(event) {
        var totalOffsetX=0,totalOffsetY=0,canvasX=0,canvasY=0;
        var currentElement = this;

        do {
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
        } while(currentElement = currentElement.offsetParent)

        canvasX = event.pageX - totalOffsetX;
        canvasY = event.pageY - totalOffsetY;

        return {x:canvasX, y:canvasY}
    }
    HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

    // lets do some fun
    var video = videoElement
    try {
        var attempts = 0;

        var findVideoSize = function() {
            onDimensionsReady(video.videoWidth, video.videoHeight);
        };
        var onDimensionsReady = function(width, height) {
            demo_app(width, height);
            requestAnimationFrame(tick);
        };

        findVideoSize();

        setTimeout(function() {
            video.play();
        }, 500);

    } catch (error) {
        console.log('Error', error)
    }

    }

    $: if (loaded) {
        ctx = canvas.getContext('2d');
        run();
    }
</script>

<div>
    <canvas width="960" height="540"
            bind:clientWidth={canvasWidth}
            bind:clientHeight={canvasHeight}
            bind:this={canvas}></canvas>
    <slot></slot>
</div>


<style>canvas {
    display: none;
    width: 960px;
    height: 540px;
}</style>