var socket = io();

socket.on('giveCOUNT', function (data) {
    $("#display_count").html(`<span>${countCheck(data)}</span>`);
})

socket.on('disconnect', function (data) {
    $("#display_count").html(`<span>${countCheck(data)}</span>`);
});

function countCheck(data) {
    console.log(data)
    var count_sent = ''
    if (data == 1) {
        count_sent = `There is 1 coder in the room.`
    } else {
        count_sent = `There are ${data} coders in the room.`
    }
    return count_sent
}