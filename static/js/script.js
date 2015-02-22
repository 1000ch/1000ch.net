$(function () {
  var $document = $(document);
  $document.on('touchstart', 'a', function () {
    this.classList.add('is-active');
  }).on('touchend', 'a', function () {
    this.classList.remove('is-active');
  });
});