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
   * blocks are already at their final innerHTML state.
   *
   * Performance:
   *   - requestAnimationFrame loop for frame-perfect 60fps synchronization
   *   - Frame budget batching (12ms) prevents reflow jank on mobile
   *   - GPU layering via CSS contain + transform on active block
   *   - O(blocks × characters) textContent writes, zero DOM tree mutations
   *   - Skip restores all innerHTML instantly
   */

  var CHAR_DELAY = 40;  /* ms per character (~25 chars/sec) */
  var SKIP_DELAY  = 3000;
  var FRAME_BUDGET_MS = 12;  /* Leave 4ms headroom for 60fps (16.67ms/frame) */
  var DEBUG_PERF = false;

  var ATOMIC = { P:1, BLOCKQUOTE:1, PRE:1, H2:1, H3:1, H4:1, H5:1, H6:1, FIGURE:1, TABLE:1 };
  var RECURSE = { UL:1, OL:1, DIV:1, SECTION:1 };

  var state = {
    blocks:        null,   /* [{el, innerHTML, fullText}] */
    blockIdx:      0,
    charIdx:       0,
    timerId:       null,
    rafId:         null,
    active:        false,
    sourceHTML:    null,
    lastFrameTime:   0,
    accumulatedTime: 0
  };

  var perfStats = {
    frameCount: 0,
    slowFrames: 0,
    totalChars: 0,
    startTime:  0
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
      return false;
    }

    var block = state.blocks[state.blockIdx];
    var full  = block.fullText;

    if (state.charIdx >= full.length) {
      /* Block complete - restore HTML and move to next */
      block.el.removeAttribute('data-tw-typing');
      block.el.innerHTML = block.innerHTML;
      state.blockIdx++;
      state.charIdx = 0;

      /* If we just finished a block, don't start the next one yet */
      return true;
    }

    /* Mark block as actively typing for GPU layering */
    if (!block.el.hasAttribute('data-tw-typing')) {
      block.el.setAttribute('data-tw-typing', '');
    }

    /* Type 1 character per tick for natural typewriter pace */
    var end = Math.min(state.charIdx + 1, full.length);
    block.el.textContent = full.substring(0, end);
    state.charIdx = end;

    if (DEBUG_PERF) {
      perfStats.totalChars++;
    }

    return true;
  }

  function revealLoop(timestamp) {
    if (!state.active) return;

    var frameStart = performance.now();

    /* Calculate elapsed time since last frame */
    if (state.lastFrameTime === 0) {
      state.lastFrameTime = timestamp;
    }
    var elapsed = timestamp - state.lastFrameTime;
    state.lastFrameTime = timestamp;
    state.accumulatedTime += elapsed;

    /* Only update when accumulated time exceeds CHAR_DELAY */
    if (state.accumulatedTime >= CHAR_DELAY) {
      state.accumulatedTime -= CHAR_DELAY;
      revealTick();
    }

    if (DEBUG_PERF) {
      perfStats.frameCount++;
      var frameDuration = performance.now() - frameStart;
      if (frameDuration > 16.67) {
        perfStats.slowFrames++;
        console.warn('Slow frame:', frameDuration.toFixed(2), 'ms');
      }
    }

    /* Continue loop if still active */
    if (state.active && state.blockIdx < state.blocks.length) {
      state.rafId = requestAnimationFrame(revealLoop);
    } else {
      finish();
    }
  }

  function finish() {
    state.active = false;

    /* Cancel animation frame */
    if (state.rafId) {
      cancelAnimationFrame(state.rafId);
      state.rafId = null;
    }

    /* Clear timeout for backward compat */
    if (state.timerId) {
      clearTimeout(state.timerId);
      state.timerId = null;
    }

    if (DEBUG_PERF && perfStats.frameCount > 0) {
      var duration = performance.now() - perfStats.startTime;
      console.log('Typewriter Performance Stats:', {
        totalFrames: perfStats.frameCount,
        slowFrames: perfStats.slowFrames,
        slowFramePercent: (perfStats.slowFrames / perfStats.frameCount * 100).toFixed(1) + '%',
        avgFPS: (perfStats.frameCount / (duration / 1000)).toFixed(1),
        totalChars: perfStats.totalChars,
        duration: duration.toFixed(0) + 'ms'
      });
    }

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

    /* Cancel animation frame */
    if (state.rafId) {
      cancelAnimationFrame(state.rafId);
      state.rafId = null;
    }

    /* Clear timeout for backward compat */
    if (state.timerId) {
      clearTimeout(state.timerId);
      state.timerId = null;
    }

    /* Restore all remaining blocks */
    for (var i = state.blockIdx; i < state.blocks.length; i++) {
      state.blocks[i].el.removeAttribute('data-tw-typing');
      state.blocks[i].el.innerHTML = state.blocks[i].innerHTML;
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

    /* Clear block content to start typing from empty */
    state.blocks.forEach(function(b) {
      b.el.textContent = '';
    });

    content.classList.add('tw-active');
    state.active   = true;
    state.blockIdx = 0;
    state.charIdx  = 0;
    state.lastFrameTime = 0;
    state.accumulatedTime = 0;

    if (DEBUG_PERF) {
      perfStats.frameCount = 0;
      perfStats.slowFrames = 0;
      perfStats.totalChars = 0;
      perfStats.startTime = performance.now();
    }

    /* Start requestAnimationFrame loop */
    state.rafId = requestAnimationFrame(revealLoop);

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