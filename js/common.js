// common.js

function loadComponent(id, file) {
  // 現在のページが artists フォルダ内にあるかチェック
  const isInsideFolder = window.location.pathname.includes("/artists/");
  const pathPrefix = isInsideFolder ? "../" : "";

  fetch(pathPrefix + file)
    .then((response) => response.text())
    .then((data) => {
      const element = document.getElementById(id);
      element.innerHTML = data;

      // 読み込んだHTML内のリンク(href)を調整
      if (isInsideFolder) {
        const links = element.querySelectorAll("a");
        links.forEach((link) => {
          const href = link.getAttribute("href");
          // 外部リンクや '#' でない場合に ../ を追加
          if (
            href &&
            !href.startsWith("http") &&
            !href.startsWith("#") &&
            !href.startsWith("../")
          ) {
            link.setAttribute("href", "../" + href);
          }
        });
      }
    });
}

// 実行
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "header.html");
  loadComponent("footer", "footer.html");
});
