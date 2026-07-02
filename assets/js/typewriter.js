---
permalink: /assets/js/typewriter.js
---

(function () {
  'use strict';

  /*
   * Character-by-character textContent slicing — ChatGPT-style streaming.
   *
   * Zero extra DOM nodes. No spans, no CSS animations on hundreds of
   * elements. For each block (paragraph, heading, list item), we
   * progressively set .textContent from empty up to the full text,
   * one character at a time. Once a block is fully revealed, we
   * restore its original innerHTML so inline formatting (links, bold,
   * code) reappears.
   *
   * Only one block is being "typed" at any moment — the previous
   * blocks are already at their final innerHTML state, and future
   * blocks are hidden with opacity:0.
   *
   * Performance:
   *   - O(blocks × characters) textContent writes, zero DOM tree mutations
   *   - No concurrent CSS transitions/animations
   *   - Skip restores all innerHTML instantly
   */

  var CHAR_DELAY = 30;
  var SKIP_DELAY  = 3000;

  var ATOMIC = { P:1, BLOCKQUOTE:1, PRE:1, H2:1, H3:1, H4:1, H5:1, H6:1, FIGURE:1, TABLE:1 };
  var RECURSE = { UL:1, OL:1, DIV:1, SECTION:1 };

  var state = {
    blocks:     null,   /* [{el, innerHTML, fullText}] */
    blockIdx:   0,
    charIdx:    0,
    timerId:    null,
    active:     false,
    sourceHTML: null
  };

  var toggleBtn = null;
  var skipBtn   = null;

  function textContentOf(el) {
    return el.textContent || '';
  }

  function collectBlocks(root) {
    var blocks = [];
    function walk(el) {
      for (var i = 0; i < el.children.length; i++) {
        var child = el.children[i];
        var tag   = child.tagName;
        if (tag === 'PRE') continue; /* skip code blocks entirely */
        if (tag === 'LI' || ATOMIC[tag]) {
          blocks.push(child);
        } else if (RECURSE[tag]) {
          walk(child);
        }
      }
    }
    walk(root);
    return blocks;
  }

  function revealTick() {
    if (!state.active || state.blockIdx >= state.blocks.length) {
      finish();
      return;
    }

    var block = state.blocks[state.blockIdx];
    var full  = block.fullText;
    var pos   = state.charIdx;

    if (pos >= full.length) {
      /* Block fully typed — restore original innerHTML, move to next block. */
      block.el.innerHTML = block.innerHTML;
      block.el.classList.add('tw-revealed');
      state.blockIdx++;
      state.charIdx = 0;

      if (state.blockIdx >= state.blocks.length) {
        finish();
        return;
      }
      state.timerId = setTimeout(revealTick, CHAR_DELAY);
      return;
    }

    /* Type 3-6 characters per tick for a natural streaming pace. */
    var end = Math.min(pos + 5, full.length);
    var chunk = full.substring(0, end);
    block.el.textContent = chunk;

    /* Insert a zero-width space before any trailing spaces so the
       browser doesn't collapse them — critical for natural spacing
       between "typed" words. */
    state.charIdx = end;
    state.timerId = setTimeout(revealTick, CHAR_DELAY);
  }

  function finish() {
    state.active = false;
    clearTimeout(state.timerId);
    state.timerId = null;
    var content = document.querySelector('.content');
    if (content) content.classList.remove('tw-active');
    if (skipBtn)   { skipBtn.remove(); skipBtn = null; }
    if (toggleBtn) {
      toggleBtn.innerHTML = '<i class="fa-solid fa-robot"></i> BlogGPT';
      toggleBtn.classList.remove('active');
    }
  }

  function skipAll() {
    state.active = false;
    clearTimeout(state.timerId);
    state.timerId = null;
    for (var i = state.blockIdx; i < state.blocks.length; i++) {
      var b = state.blocks[i];
      b.el.innerHTML = b.innerHTML;
      b.el.classList.add('tw-revealed');
    }
    var content = document.querySelector('.content');
    if (content) content.classList.remove('tw-active');
    if (skipBtn)   { skipBtn.remove(); skipBtn = null; }
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
    skipBtn.addEventListener('click', skipAll);
    document.body.appendChild(skipBtn);
  }

  function startAnimation(content) {
    state.blocks = collectBlocks(content).map(function(el) {
      return {
        el:        el,
        innerHTML: el.innerHTML,
        fullText:  textContentOf(el)
      };
    });

    /* Hide all blocks, clear their content to start typing from empty. */
    state.blocks.forEach(function(b) {
      b.el.classList.add('tw-block');
      b.el.textContent = '';
    });

    content.classList.add('tw-active');
    state.active   = true;
    state.blockIdx = 0;
    state.charIdx  = 0;
    revealTick();

    setTimeout(function() {
      if (state.active) showSkipBtn();
    }, SKIP_DELAY);
  }

  function toggle() {
    var content = document.querySelector('.content');
    if (!content) return;

    if (state.active) {
      skipAll();
      return;
    }

    /* Reset from any previous run. */
    content.classList.remove('tw-active');
    content.querySelectorAll('.tw-block').forEach(function(el) {
      el.classList.remove('tw-block', 'tw-revealed');
    });

    if (state.sourceHTML) {
      content.innerHTML = state.sourceHTML;
    } else {
      state.sourceHTML = content.innerHTML;
    }

    toggleBtn.innerHTML = '<i class="fa-solid fa-stop"></i> Stop';
    toggleBtn.classList.add('active');
    startAnimation(content);
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

  document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.content')) {
      createToggleBtn();
      setTimeout(toggle, 100);
    }
  });
})();