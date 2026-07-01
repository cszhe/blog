const SPEED = 40;
const SKIP_DELAY = 3000;
const CJK_RE = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/;

const state = {
  words: [],
  timerId: null,
  idx: 0,
  active: false,
  sourceHTML: null
};

let toggleBtn = null;
let skipBtn = null;

function tokenize(text) {
  const tokens = text.match(/\S+\s*/g) || [];
  const result = [];
  for (const token of tokens) {
    if (CJK_RE.test(token)) {
      const body = token.replace(/\s+$/, '');
      const ws = token.slice(body.length);
      for (let i = 0; i < body.length; i++) {
        result.push(i === body.length - 1 && ws ? body[i] + ws : body[i]);
      }
    } else {
      result.push(token);
    }
  }
  return result;
}

function walkNode(node, words) {
  if (node.nodeType === Node.TEXT_NODE) {
    const tokens = tokenize(node.textContent);
    if (!tokens.length) return;
    const frag = document.createDocumentFragment();
    for (const t of tokens) {
      const span = document.createElement('span');
      span.className = 'tw-word';
      span.textContent = t;
      frag.appendChild(span);
      words.push(span);
    }
    node.parentNode.replaceChild(frag, node);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    if (node.tagName === 'PRE' || /^H[2-5]$/.test(node.tagName)) return;
    for (const child of Array.from(node.childNodes)) {
      walkNode(child, words);
    }
  }
}

function processWords(root) {
  const words = [];
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
  for (let i = state.idx; i < state.words.length; i++) {
    state.words[i].classList.add('revealed');
  }
  finish();
}

function toggle() {
  const content = document.querySelector('.content');
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

  setTimeout(() => {
    if (state.active) showSkipBtn();
  }, SKIP_DELAY);
}

function createToggleBtn() {
  const content = document.querySelector('.content');
  if (!content) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'tw-wrapper';

  toggleBtn = document.createElement('button');
  toggleBtn.className = 'tw-toggle';
  toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> Typewriter';
  toggleBtn.addEventListener('click', toggle);

  wrapper.appendChild(toggleBtn);
  content.parentNode.insertBefore(wrapper, content);
}

export function initTypewriter() {
  createToggleBtn();
}
