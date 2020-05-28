# Mount the video directory and serve them using a local server

read -p "Enter Sharc username: " username
sshfs $username@sharc:/fastdata/acp18jd/data/videos_converted videos
cd videos
npx http-server
