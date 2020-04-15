var socket = io();
let nusers = 1;
let users = [];

socket.on('update', (data) => {
  $('#display_count').html(`<span>${countCheck(data.num)}</span>`);
  $('#active_coders').html(
    `<span><span style="color:royalblue">${splitNames(data.who)}</span></span>`
  );
  $('.console_box').prepend(`<p> ${data.news} joined the room. <p>`);

  // update size of blob based on users in the room
  nusers = data.num;
  init();

  // update user list for workshop game
  users = data.who;
});

socket.on('update_leave', (data) => {
  $('#display_count').html(`<span>${countCheck(data.num)}</span>`);
  $('#active_coders').html(
    `<span><span style="color:royalblue">${splitNames(data.who)}</span></span>`
  );
  $('.console_box').prepend(`<p> ${data.news} left the room. <p>`);

  // update size of blob based on users in the room
  nusers = data.num;
  init();

  // update user list for workshop game
  users = data.who;
});

function countCheck(data) {
  var count_sent = '';
  if (data == 1) {
    count_sent = `There is 1 coder in the room:`;
  } else if (data == undefined) {
    count_sent = 'There is no coder in the room:';
  } else {
    count_sent = `There are ${data} coders in the room:`;
  }
  return count_sent;
}

function splitNames(names) {
  return names.join(', ');
}

var name_input = false;
$('#submit').click((e) => {
  e.preventDefault();
  var name = $('#name_input').val();
  // console.log(name);
  if ($.trim(name).length != 0) {
    socket.emit('userName', name);
  }
  $('.hide-1').show();
  $('#form').hide();
});
