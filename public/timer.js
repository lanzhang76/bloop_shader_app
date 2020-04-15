const time_total = 30;
let time_left = time_total;
const timer_el = document.getElementById('timer');
const timer_button_el = document.getElementById('timer_button');
const timer_stop_button_el = document.getElementById('timer_stop_button');
let timerId;

function countdown() {
  timerId = setInterval(runCountdown, 1000);

  function runCountdown() {
    if (time_left < 0) {
      chooseTheme();
      chooseUser();
      time_left = time_total;
    } else {
      timer_el.innerHTML = time_left;
      time_left--;
    }
  }
}

let user_ticker = 0;
function chooseUser() {
  document.getElementById('active_user').innerText = `Now up: ${
    users[user_ticker % users.length]
  }`;
  user_ticker += 1;
}

let theme_ticker = 0;
let themes = [
  'psychedelic',
  'floral',
  'outer space',
  'soothing',
  'spooky',
  'chaos!',
];

function chooseTheme() {
  if (theme_ticker % 4 === 0) {
    document.getElementById('active_theme').innerText = `Theme: ${
      themes[theme_ticker % themes.length]
    }`;
  }

  theme_ticker += 1;
}

function startTimer() {
  theme_ticker = 0;
  time_left = time_total;
  // time_left = time_total;
  // chooseTheme();
  // chooseUser();
  countdown();
}

function stopTimer() {
  timer_el.innerText = '';
  document.getElementById('active_user').innerText = '';
  document.getElementById('active_theme').innerText = '';
  clearInterval(timerId);
}
