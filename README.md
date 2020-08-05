# Tracking Annotator ([Live Demo](https://jackdeadman.github.io/tracking-annotator/index.html))
![Screenshot](https://github.com/jackdeadman/tracking-annotator/raw/master/screenshot.png)

## Instructions
You can use the tool without installing it locally by using the ([Live Demo](https://jackdeadman.github.io/tracking-annotator/index.html)).

Because this tool is a web application the videos need to be served over a webserver. The easiest way to do this it to run a static server. See `./serve_videos.sh` as an example. This script mounts a remote drive and starts a server using node (Note: `python -m http.server` has issued with some videos!). The server hosting the videos must enable cross-origin resource sharing (CORS) e.g., `npx http-server --cors`.

Any video format supported by your web browser can be used, MP4 is probably the best choice.

## Shortcuts
- Space: Pause/play
- Backspace: Remove annotation
- Left click: Start annotation
- Right click: Remove annotaion
- q: increase speed
- a: decrease speed
- left arrow: -1s
- right arrow: +1s
- middle click: Add optical flow point to automatically track

## Development
```
npm run dev
```

## Deployment
```
./deploy.sh
```

## Citation
If you find this tool useful for your research please cite the following paper:
```
@inproceedings{Deadman-Barker_2020,  
  author = {Deadman, Jack and Barker, Jon}  
  title = {{Simulating realistically-spatialised simultaneous speech using video-driven speaker detection and the CHiME-5 dataset}},  
  year = 2020,  
  booktitle = {Proceedings of the 21st Annual Conference of the International Speech Communication Association (INTERSPEECH 2020)}  
}
```

The paper has been accepted for Interspeech2020 and will be presented in October. [Preprint](https://drive.google.com/drive/folders/1p9wDjK3t5l_4B7SG929LRTybD83xX0sI)
