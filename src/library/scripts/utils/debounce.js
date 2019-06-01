function debounce(cb, delay) {
    var timer = null;
    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(function() {
            cb.apply(this, args);
            timer = null;
        }, delay);
    };
}