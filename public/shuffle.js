exports.shuffle = (list) => {
    const time_total = 30;
    let time_left = time_total;
    let timerId;
    let coders = list;
    let theme_ticker = 0;
    let themes = [
        'psychedelic',
        'floral',
        'outer space',
        'calm',
        'spooky',
        'chaos!',
    ];

    function randitem(l) {
        return l[Math.floor(Math.random() * l.length)];
    }

    function chooseTheme(themes) {
        if (theme_ticker % 4 === 0) {
            return randitem(themes)
        };
        theme_ticker += 1;
    }

    function chooseUser(coders) {
        return randitem(coders)
    };

    function countdown() {
        timerId = setInterval(runCountdown, 1000);

        function runCountdown() {
            if (time_left < 0) {
                chooseTheme(themes);
                chooseUser(coders);
                time_left = time_total;
            } else {
                timer_el.innerHTML = time_left;
                time_left--;
            }
        }
        return timerId
    }

    return {
        theme: chooseTheme(themes),
        user: chooseUser(coders)
    }
}


