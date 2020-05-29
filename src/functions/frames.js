const resolution = 15;

export function time2frame(time) {
    return Math.round(time*resolution);
}

export function frame2time(frame) {
    return frame/resolution;
}