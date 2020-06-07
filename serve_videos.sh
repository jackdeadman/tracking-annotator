# Mount the video directory and serve them using a local server
mkdir -p videos
sshfs acp18jd@sharc:/fastdata/acp18jd/data/videos_converted videos
cd videos
npx http-server --cors
