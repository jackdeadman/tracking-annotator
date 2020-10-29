# Tracking Annotator ([Live Demo](https://jackdeadman.github.io/tracking-annotator/index.html))
![Screenshot](https://github.com/jackdeadman/tracking-annotator/raw/master/screenshot.png)

## Instructions
You can use the tool without installing it locally by using the ([Live Demo](https://jackdeadman.github.io/tracking-annotator/index.html)).

Because this tool is a web application the videos need to be served over a webserver. The easiest way to do this it to run a static server. See `./serve_videos.sh` as an example. This script mounts a remote drive and starts a server using node (Note: `python -m http.server` has issues with some videos!). The server hosting the videos must enable cross-origin resource sharing (CORS) e.g., `npx http-server --cors`.

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
@inproceedings{Deadman2020,
  author={Jack Deadman and Jon Barker},
  title={{Simulating Realistically-Spatialised Simultaneous Speech Using Video-Driven Speaker Detection and the CHiME-5 Dataset}},
  year=2020,
  booktitle={Proc. Interspeech 2020},
  pages={349--353},
  doi={10.21437/Interspeech.2020-2807},
  url={http://dx.doi.org/10.21437/Interspeech.2020-2807}
}
```
