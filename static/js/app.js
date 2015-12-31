document.addEventListener('DOMContentLoaded', function () {
  var blocks = document.querySelectorAll('pre code');
  for (var i = 0, l = blocks.length; i < l; i++) {
    hljs.highlightBlock(blocks[i]);
  }
});
