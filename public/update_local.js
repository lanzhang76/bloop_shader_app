// Reads the textarea, udpates the fragment code stored in frag_code,
// and re-init()s the whole scene.

let raw_fs = document.getElementById('code_text');
const udpate_local_button = document.getElementById('update-local');

udpate_local_button.addEventListener('click', function () {
  frag_code = raw_fs.value;
  init();
});
