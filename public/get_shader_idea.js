const get_shader_idea_button = document.getElementById('getIdea');
get_shader_idea_button.addEventListener('click', function () {
  frag_code = randitem(examples);
  init();
});

function randitem(a) {
  return a[Math.floor(Math.random() * a.length)];
}
