var socket = io();

socket.on('update', (data) => {
    $("#display_count").html(`<span>${countCheck(data.num)}</span>`);
    $("#active_coders").html(`<span> Coders in the room: <span style="color:royalblue">${splitNames(data.who)}</span></span>`);
    $(".console_box").html(`<span> ${data.news} joined the room. <span>`);
});

socket.on('update_leave', (data) => {
    $("#display_count").html(`<span>${countCheck(data.num)}</span>`);
    $("#active_coders").html(`<span> Coders in the room: <span style="color:royalblue">${splitNames(data.who)}</span></span>`);
    $(".console_box").html(`<span> ${data.news} left the room. <span>`);
})

function countCheck(data) {
    var count_sent = ''
    if (data == 1) {
        count_sent = `There is 1 coder in the room.`
    } else if (data == undefined) {
        count_sent = 'There is no coder in the room.'
    } else {
        count_sent = `There are ${data} coders in the room.`
    }
    return count_sent
}

function splitNames(names) {
    return names.join(', ')
}

var name_input = false;
$("#submit").click((e) => {
    e.preventDefault();
    var name = $('#name_input').val();
    // console.log(name);
    if ($.trim(name).length != 0) {
        socket.emit('userName', name);
    }
    $('.hide-1').show();
    $('#form').hide();

})

