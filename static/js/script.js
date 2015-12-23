import { Delegate } from 'dom-delegate';
import hljs from 'highlight.js';

document.addEventListener('DOMContentLoaded', e => {
  const bodyDelegate = new Delegate(document.body);
  bodyDelegate.on('touchstart', 'a', e => e.target.classList.add('is-active'));
  bodyDelegate.on('touchend', 'a', e => e.target.classList.remove('is-active'));

  const blocks = document.querySelectorAll('pre code');
  for (let i = 0, l = blocks.length; i < l; i++) {
    hljs.highlightBlock(blocks[i]);
  }
});
