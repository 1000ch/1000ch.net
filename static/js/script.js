import { Delegate } from 'dom-delegate';

document.addEventListener('DOMContentLoaded', e => {

  const bodyDelegate = new Delegate(document.body);
  bodyDelegate.on('touchstart', 'a', e => e.target.classList.add('is-active'));
  bodyDelegate.on('touchend', 'a', e => e.target.classList.remove('is-active'));

  const blocks = document.querySelectorAll('pre code');
  Array.prototype.forEach.call(blocks, block => hljs.highlightBlock(block));
});
