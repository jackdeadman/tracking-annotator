let count = 0;

self.addEventListener('message', (e) => {
    count += 1;
    self.postMessage(count)
});