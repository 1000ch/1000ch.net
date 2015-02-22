$(function () {
  $(document).on('touchstart', 'a', function () {
    this.classList.add('is-active');
  }).on('touchend', 'a', function () {
    this.classList.remove('is-active');
  });
  
  $('pre code').each(function (index, block) {
    hljs.highlightBlock(block);
  });
});