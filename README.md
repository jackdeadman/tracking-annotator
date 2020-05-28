# Video Annotator
## Instructions
Because this tool is a webapplication the videos need to be served over a webserver. The easiest way to do this it to run a static server. See `./serve_videos.sh` as an example. This script mounts a remote drive and starts a server using node (Note: `python -m http.server` has issued with some video!).

Any video format supported by your web browser can be used, MP4 is probably the best choice.

## Shortcuts
- Space: Pause/play
- Backspace: Remove annotation
- Left click: Start annotation
- Right click: Remove annotaion
- q: increase speed
- a: decrease speed

## Development
```
npm run dev
```

## Deployment
```
./deploy.sh
```
