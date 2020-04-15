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
  // e.preventDefault(); // What does this do?
  socket.emit('startTimedPlay', '');
  console.log('emit startTimedPlay');
});

socket.on('startTimedPlay', function (data) {
  startTimer();
  console.log('receive startTimedPlay');
});
