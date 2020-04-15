$('#code_text').html(frag_code);

// push current code and emit:
$('#push').click((e) => {
  e.preventDefault();
  socket.emit('pushCode', $('#code_text').val());
});

$('#pull').click((e) => {
  e.preventDefault();
  socket.emit('pullCode', '');
});

$('#updateAll').click((e) => {
  e.preventDefault();
  socket.emit('updateAll', $('#code_text').val());
});

socket.on('update_global', (data) => {
  frag_code = data;
  init();
});

socket.on('consoleUpdate', function (msg) {
  var action = msg.action;
  var person = msg.person;
  var msg_update = '';
  if (action == 'pull') {
    msg_update = `${person} pulled from the server.`;
  } else if (action == 'push') {
    msg_update = `${person} pushed to the server.`;
  } else {
    msg_update = `${person} forced push to everyone.`;
  }
  $('.console_box').prepend(`<p>${msg_update}</p>`);
});

// Timer
$('#timer_button').click((e) => {
  socket.emit('startTimedPlay', '');
  console.log('emit startTimedPlay');
});

socket.on('startGlobalTimer', function (data) {
  startTimer();
  var theme = data.theme;
  var user = data.user;
  document.getElementById('active_theme').innerText = theme;
  document.getElementById('active_user').innerText = user;
});

// $('#timer_stop_button').click((e) => {
//   socket.emit('stopTime', '');
//   socket.emit('stopTimedPlay', '');
//   console.log('emit stopTimedPlay');
// });

socket.on('stopGlobalTimer', function (data) {
  stopTimer();
});

//   console.log('receive stopTimedPlay');
// });
