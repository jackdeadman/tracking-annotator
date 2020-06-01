// https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
export function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}


// Alternative to setInterval, this will not queue up the intervals
// this prevents a build up.
export function interval(fn, time) {
    fn();
    let current = setTimeout(function timeout() {
        fn();
        current = setTimeout(timeout, time)
    }, time);
    
    return {
        clear() {
            clearInterval(current);
        }
    }
}