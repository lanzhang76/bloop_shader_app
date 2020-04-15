// Allow TAB in text-area
$('#code_text').keydown(function (e) {
    if (e.keyCode === 9) {
        // tab was pressed
        // get caret position/selection
        var start = this.selectionStart;
        end = this.selectionEnd;

        var $this = $(this);

        // set textarea value to: text before caret + tab + text after caret
        $this.val(
            $this.val().substring(0, start) + '\t' + $this.val().substring(end)
        );

        // put caret at right position again
        this.selectionStart = this.selectionEnd = start + 1;

        // prevent the focus lose
        return false;
    }
});

$('#clap').click((e) => {
    e.preventDefault();
    var re = "clap";
    socket.emit("reaction", re);
});

$('#hi').click((e) => {
    e.preventDefault();
    var re = "hi"
    socket.emit("reaction", re);
});

socket.on("reactions", (data) => {
    console.log(data)
    if (data.reaction == 'clap') {
        $('.console_box').prepend(`<p> ${data.person}: 👏 <p>`);
    } else if (data.reaction == 'hi') {
        $('.console_box').prepend(`<p> ${data.person} says hi: 😃 <p>`);
    }

})

