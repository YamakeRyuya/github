// Initialize Tippy.js on integration icons
// Works with the current markup under: .icons > .various-icons > div
// Fallback: if Tippy isn't loaded, sets title attributes so native tooltips appear.

(function () {
  const instances = [];

  // Convert CSS length to px (supports px, rem, em; falls back to number)
  function toPx(len, ctxEl) {
    if (!len) return 0;
    const v = String(len).trim();
    if (v.endsWith('px')) return parseFloat(v) || 0;
    if (v.endsWith('rem')) {
      const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      return (parseFloat(v) || 0) * rootSize;
    }
    if (v.endsWith('em')) {
      const base = parseFloat(getComputedStyle(ctxEl || document.documentElement).fontSize) || 16;
      return (parseFloat(v) || 0) * base;
    }
    // fallback: raw number assumed px
    const n = parseFloat(v);
    return isNaN(n) ? 0 : n;
  }

  function getCenterDeltaY(el) {
    const img = el.querySelector("img");
    if (!img) return 0;
    const rWrap = el.getBoundingClientRect();
    const rImg = img.getBoundingClientRect();
    const cyWrap = rWrap.top + rWrap.height / 2;
    const cyImg = rImg.top + rImg.height / 2;
    return Math.round(cyImg - cyWrap); // +Y は見た目上アイコンが下にある
  }

  function init() {
    // 既存を破棄（リサイズ対応）
    if (instances.length) {
      instances.forEach(function (i) {
        if (i && i.destroy) i.destroy();
      });
      instances.length = 0;
    }

    const wrappers = document.querySelectorAll(".icons .various-icons > div");
    if (!wrappers.length) return;

    const labelMap = {
      Slack: "Slack",
      ZenHub: "ZenHub",
      TravisCI: "Travis CI",
      Atom: "Atom",
      CircleCi: "CircleCI",
      Codeship: "Codeship",
      codeclimate: "Code Climate",
    };

    wrappers.forEach(function (el) {
      // ラベル決定（クラス名 or img alt）
      const cls = Array.from(el.classList)[0];
      const img = el.querySelector("img");
      const label = labelMap[cls] || (img && img.alt) || cls || "";
      el.setAttribute("data-tippy-content", label);

      // Tippyが無い場合はネイティブ title
      if (!window.tippy) {
        el.setAttribute("title", label);
        return;
      }

      // 画像が下にズレている分だけツールチップも下げる
      const deltaY = getCenterDeltaY(el); // px 差分（下方向が正）
      const baseDistance = 8; // デフォルト距離
      // ::before の外側まで矢印先端が来るように、--bg-spread を加味
      const spreadLen = getComputedStyle(el).getPropertyValue('--bg-spread');
      const spreadPx = toPx(spreadLen, el);
      const perElementOffset = [0, baseDistance + Math.max(0, deltaY) + (spreadPx || 0)];

      const inst = window.tippy(el, {
        theme: "light-border",
        arrow: true,
        animation: "shift-away-subtle",
        // hover解除時のラグを無くす
        delay: [80, 0], // show, hide
        duration: [200, 0], // show, hide
        placement: "bottom",
        offset: perElementOffset,
        allowHTML: false,
        interactive: false,
      });
      if (Array.isArray(inst)) {
        instances.push(...inst);
      } else if (inst) {
        instances.push(inst);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("resize", function () {
    if (window.__tippyResizeRaf) cancelAnimationFrame(window.__tippyResizeRaf);
    window.__tippyResizeRaf = requestAnimationFrame(init);
  });
})();
