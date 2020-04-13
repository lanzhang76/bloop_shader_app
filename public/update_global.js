$("#code_text").html(frag_code);


// push current code and emit:
$("#push").click((e) => {
    e.preventDefault();
    socket.emit('pushCode', $('#code_text').val());
})

$("#pull").click((e) => {
    e.preventDefault();
    socket.emit('pullCode', '');
})

$("#updateAll").click((e) => {
    e.preventDefault();
    socket.emit('pushCode', $('#code_text').val());
    socket.emit('updateAll', '');
})

socket.on('update_global', (data) => {
    frag_code = data;
    init();
})



