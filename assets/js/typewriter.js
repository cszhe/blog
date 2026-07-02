---
permalink: /assets/js/typewriter.js
---

(function () {
  'use strict';

  /*
   * Block-level streaming reveal — performance-first approach.
   *
   * Instead of wrapping every word/character in a <span> (which creates
   * thousands of DOM nodes and fires hundreds of concurrent CSS animations),
   * we collect the existing ~30–80 block-level elements in the post and
   * reveal them one by one using a simple opacity transition.
   *
   * Benefits vs the old word-span approach:
   *   - Zero new DOM nodes created
   *   - O(blocks) class changes, not O(words)
   *   - opacity transition is GPU-composited — no layout, no paint
   *   - No concurrent animations; only one transition runs at a time
   *   - Skip is O(blocks), not O(words)
   */

  var BLOCK_DELAY = 120;  /* ms between block reveals */
  var SKIP_DELAY  = 2500; /* ms before skip button appears */

  /*
   * Tags whose subtree is treated as a single atomic reveal unit.
   * We do NOT recurse into these.
   */
  var ATOMIC = { P:1, BLOCKQUOTE:1, PRE:1, H2:1, H3:1, H4:1, H5:1, H6:1, FIGURE:1, TABLE:1 };

  /*
   * Tags that are transparent containers — we recurse into them to
   * collect their block children (e.g. li elements inside ul/ol).
   */
  var RECURSE = { UL:1, OL:1, DIV:1, SECTION:1 };

  var state = {
    blocks:  [],
    timerId: null,
    idx:     0,
    active:  false
  };

  var toggleBtn = null;
  var skipBtn   = null;

  /* Walk the content tree and collect leaf block elements to animate. */
  function collectBlocks(root) {
    var blocks = [];
    function walk(el) {
      for (var i = 0; i < el.children.length; i++) {
        var child = el.children[i];
        var tag   = child.tagName;
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

  function revealNext() {
    if (!state.active || state.idx >= state.blocks.length) {
      finish();
      return;
    }
    state.blocks[state.idx].classList.add('tw-revealed');
    state.idx++;
    state.timerId = setTimeout(revealNext, BLOCK_DELAY);
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
    for (var i = state.idx; i < state.blocks.length; i++) {
      state.blocks[i].classList.add('tw-revealed');
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
    /* Add tw-active before adding tw-block so new classes are hidden immediately. */
    content.classList.add('tw-active');
    state.blocks = collectBlocks(content);
    state.blocks.forEach(function(b) { b.classList.add('tw-block'); });
    state.active = true;
    state.idx    = 0;
    revealNext();
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

    /* Reset from any previous run. Remove tw-active first so the cleanup
       class removals don't trigger opacity transitions. */
    content.classList.remove('tw-active');
    content.querySelectorAll('.tw-block').forEach(function(el) {
      el.classList.remove('tw-block', 'tw-revealed');
    });

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
