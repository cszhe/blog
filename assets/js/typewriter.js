---
permalink: /assets/js/typewriter.js
---

(function () {
  'use strict';

  var SPEED = 40;
  var SKIP_DELAY = 3000;
  var WORDS_PER_CHUNK = 15;
  var MIN_CHUNKS = 20;

  var state = {
    chunks: [],
    timerId: null,
    idx: 0,
    active: false,
    sourceHTML: null
  };

  var toggleBtn = null;
  var skipBtn = null;

  function countWords(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      var m = node.textContent.match(/\S+/g);
      return m ? m.length : 0;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return 0;
    if (node.tagName === 'PRE') return 0;
    var n = 0;
    for (var i = 0; i < node.childNodes.length; i++) {
      n += countWords(node.childNodes[i]);
    }
    return n;
  }

  function buildChunks(content) {
    var totalWords = countWords(content);
    var numChunks = Math.max(MIN_CHUNKS, Math.ceil(totalWords / WORDS_PER_CHUNK));
    var children = Array.from(content.childNodes);
    var wordBudget = Math.ceil(totalWords / numChunks);

    var chunks = [];
    var currentDiv = null;
    var currentWords = 0;

    function flush() {
      if (currentDiv && currentDiv.childNodes.length > 0) {
        chunks.push(currentDiv);
      }
      currentDiv = null;
      currentWords = 0;
    }

    function appendToChunk(node) {
      if (!currentDiv) {
        currentDiv = document.createElement('div');
        currentDiv.className = 'tw-chunk';
      }
      currentDiv.appendChild(node);
    }

    function processNode(node) {
      if (currentWords >= wordBudget) {
        flush();
      }

      if (node.nodeType === Node.TEXT_NODE) {
        var wc = (node.textContent.match(/\S+/g) || []).length;
        if (wc === 0) {
          appendToChunk(node);
          return;
        }
        if (currentWords > 0 && currentWords + wc > wordBudget) {
          flush();
        }
        appendToChunk(node);
        currentWords += wc;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'PRE') {
          flush();
          appendToChunk(node);
          flush();
          return;
        }
        if (/^H[1-6]$/.test(node.tagName)) {
          flush();
          appendToChunk(node);
          flush();
          return;
        }
        var wc = countWords(node);
        if (wc === 0) {
          appendToChunk(node);
          return;
        }
        if (currentWords > 0 && currentWords + wc > wordBudget * 2) {
          flush();
        }
        appendToChunk(node);
        currentWords += wc;
      }
    }

    for (var i = 0; i < children.length; i++) {
      processNode(children[i]);
    }
    flush();

    return chunks;
  }

  function revealNext() {
    if (!state.active || state.idx >= state.chunks.length) {
      finish();
      return;
    }
    state.chunks[state.idx].classList.add('revealed');
    state.idx++;
    state.timerId = setTimeout(revealNext, SPEED);
  }

  function finish() {
    state.active = false;
    if (state.timerId) {
      clearTimeout(state.timerId);
      state.timerId = null;
    }
    var content = document.querySelector('.content');
    if (content) content.classList.remove('tw-active');
    if (skipBtn) {
      skipBtn.remove();
      skipBtn = null;
    }
    if (toggleBtn) {
      toggleBtn.innerHTML = '<i class="fa-solid fa-robot"></i> BlogGPT';
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
    for (var i = state.idx; i < state.chunks.length; i++) {
      state.chunks[i].classList.add('revealed');
    }
    var content = document.querySelector('.content');
    if (content) content.classList.remove('tw-active');
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

    var chunks = buildChunks(content);
    content.innerHTML = '';
    for (var i = 0; i < chunks.length; i++) {
      content.appendChild(chunks[i]);
    }

    state.chunks = chunks;
    content.classList.add('tw-active');
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
    toggleBtn.innerHTML = '<i class="fa-solid fa-robot"></i> BlogGPT';
    toggleBtn.addEventListener('click', toggle);

    wrapper.appendChild(toggleBtn);
    content.parentNode.insertBefore(wrapper, content);
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.content')) {
      createToggleBtn();
      setTimeout(toggle, 100);
    }
  });
})();
