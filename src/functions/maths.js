function* linspace(start, end, amount) {
    let delta = (end-start) / (amount-1);

    for (let i=0; i<amount; ++i) {
        yield start+(delta*i);
    }
}