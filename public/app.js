const overlay = document.querySelector(".robot-overlay");
const articlesContainer = document.querySelector(".all-articles-class");
const article1 = document.querySelectorAll(".article1");
const article2 = document.querySelectorAll(".article2");
const article3 = document.querySelectorAll(".article3");

/*
.robot-overlay→.all-articles-class:has(.article(1)(2)(3):hover) .robot-overlay {...}
aticle要素をhoverしたときに、上の順でクラスがつき変わるそれぞれに対応した関数を実装する。*/

/*このUI制御手法は、状態遷移の一貫性とアニメーションの確実な発火を目的とした「明示的な初期化→遷移」パターンです。

具体的には、任意のインタラクション（例：マウスホバー）発生時、対象要素のクラスを一旦初期状態（非表示・opacity: 0等）にリセットし、
非同期的に（setTimeout等で遅延を挟み）目的の表示状態（画像切替・opacity: 1等）を付与することで、
CSSのtransitionプロパティによるアニメーションを必ず発火させます。

このアプローチは、前回の状態に依存せず、毎回「非表示→表示」への明示的な状態遷移を強制するため、
連続したイベントや異なる要素間の切り替え時にもアニメーションが安定して再生されるという利点があります。
UIの一貫性・UXの向上に寄与する設計パターンです。*/

const addRobotOverlay = () => {
  article1.classList.add("robot-overlay");
};

const addClass = article1.addEventListener("mouseenter", () => {
  robot -
    overlay.classList.remove(
      "all-articles-class:has(.article1:hover) .robot-overlay",
      "all-articles-class:has(.article2:hover) .robot-overlay",
      "all-articles-class:has(.article3:hover) .robot-overlay"
    );
  robot - overlay.classList.add("robot-overlay");
  robot -
    overlay.classList.replace(
      "robot-overlay",
      "all-articles-class:has(.article1:hover) .robot-overlay"
    );
});
