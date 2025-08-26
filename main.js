// メニュー開閉ボタンの要素を取得
const button = document.getElementById('menuButton');

// メニューの要素を取得
const menu = document.getElementById('menu');

// ボタンがクリックされたときの処理を設定
button.addEventListener('click', () => {
  // メニューにshowクラスがあれば削除、なければ追加
  menu.classList.toggle('show');
});
