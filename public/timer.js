console.log('timer connected');

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

function chooseUser() {
  document.getElementById('active_user').innerText = `Now up: ${randitem(
    users
  )}`;
}

let themes = [
  'psychedelic',
  'floral',
  'outer space',
  'calm',
  'spooky',
  'lava lamp',
];
let theme_ticker = 0;

function chooseTheme() {
  if (theme_ticker % 4 === 0) {
    document.getElementById('active_theme').innerText = `Theme: ${randitem(
      themes
    )}`;
  }

  theme_ticker += 1;
}

timer_button_el.addEventListener('click', function () {
  theme_ticker = 0;
  chooseTheme();
  chooseUser();
  countdown();
});

timer_stop_button_el.addEventListener('click', function () {
  timer_el.innerText = '';
  document.getElementById('active_user').innerText = '';
  document.getElementById('active_theme').innerText = '';
  clearInterval(timerId);
});
