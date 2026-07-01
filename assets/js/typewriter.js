---
permalink: /assets/js/typewriter.js
---

(function () {
  'use strict';

  var SPEED = 40;
  var SKIP_DELAY = 3000;
  var CJK_RE = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/;

  var state = {
    words: [],
    timerId: null,
    idx: 0,
    active: false,
    sourceHTML: null
  };

  var toggleBtn = null;
  var skipBtn = null;

  function tokenize(text) {
    var tokens = text.match(/\S+\s*/g) || [];
    var result = [];
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (CJK_RE.test(token)) {
        var body = token.replace(/\s+$/, '');
        var ws = token.slice(body.length);
        for (var j = 0; j < body.length; j++) {
          result.push(j === body.length - 1 && ws ? body[j] + ws : body[j]);
        }
      } else {
        result.push(token);
      }
    }
    return result;
  }

  function walkNode(node, words) {
    if (node.nodeType === Node.TEXT_NODE) {
      var tokens = tokenize(node.textContent);
      if (!tokens.length) return;
      var frag = document.createDocumentFragment();
      for (var i = 0; i < tokens.length; i++) {
        var span = document.createElement('span');
        span.className = 'tw-word';
        span.textContent = tokens[i];
        frag.appendChild(span);
        words.push(span);
      }
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'PRE' || /^H[2-5]$/.test(node.tagName)) return;
      var children = Array.from(node.childNodes);
      for (var j = 0; j < children.length; j++) {
        walkNode(children[j], words);
      }
    }
  }

  function processWords(root) {
    var words = [];
    walkNode(root, words);
    return words;
  }

  function revealNext() {
    if (!state.active || state.idx >= state.words.length) {
      finish();
      return;
    }
    state.words[state.idx].classList.add('revealed');
    state.idx++;
    state.timerId = setTimeout(revealNext, SPEED);
  }

  function finish() {
    state.active = false;
    if (state.timerId) {
      clearTimeout(state.timerId);
      state.timerId = null;
    }
    if (skipBtn) {
      skipBtn.remove();
      skipBtn = null;
    }
    if (toggleBtn) {
      toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> Typewriter';
      toggleBtn.classList.remove('active');
    }
  }

  function showSkipBtn() {
    if (skipBtn) return;
    skipBtn = document.createElement('button');
    skipBtn.className = 'tw-skip-btn';
    skipBtn.innerHTML = '<i class="fa-solid fa-forward"></i> Skip';
    skipBtn.addEventListener('click', skip);
    document.body.appendChild(skipBtn);
  }

  function skip() {
    for (var i = state.idx; i < state.words.length; i++) {
      state.words[i].classList.add('revealed');
    }
    finish();
  }

  function toggle() {
    var content = document.querySelector('.content');
    if (!content) return;

    if (state.active) {
      skip();
      return;
    }

    if (state.sourceHTML) {
      content.innerHTML = state.sourceHTML;
    } else {
      state.sourceHTML = content.innerHTML;
    }

    state.words = processWords(content);
    state.active = true;
    state.idx = 0;
    toggleBtn.innerHTML = '<i class="fa-solid fa-stop"></i> Stop';
    toggleBtn.classList.add('active');

    revealNext();

    setTimeout(function () {
      if (state.active) showSkipBtn();
    }, SKIP_DELAY);
  }

  function createToggleBtn() {
    var content = document.querySelector('.content');
    if (!content) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'tw-wrapper';

    toggleBtn = document.createElement('button');
    toggleBtn.className = 'tw-toggle';
    toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> Typewriter';
    toggleBtn.addEventListener('click', toggle);

    wrapper.appendChild(toggleBtn);
    content.parentNode.insertBefore(wrapper, content);
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.content')) {
      createToggleBtn();
    }
  });
})();
