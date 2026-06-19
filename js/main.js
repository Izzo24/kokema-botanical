/* 苔間 KOKEMA — 互動腳本 */
(function () {
  "use strict";

  // 行動選單
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".navlinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // 捲動淡入
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  // 加入購物車提示(示範用,純前端)
  var count = 0;
  var badge = document.getElementById("cart-count");
  function toast(msg) {
    var t = document.createElement("div");
    t.textContent = msg;
    t.style.cssText =
      "position:fixed;left:50%;bottom:34px;transform:translateX(-50%);background:#4a5742;color:#faf7f0;" +
      "padding:13px 26px;border-radius:2px;font-size:.9rem;letter-spacing:.08em;z-index:999;" +
      "box-shadow:0 12px 30px -12px rgba(0,0,0,.5);opacity:0;transition:opacity .3s";
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.style.opacity = "1"; });
    setTimeout(function () { t.style.opacity = "0"; setTimeout(function () { t.remove(); }, 320); }, 1800);
  }
  document.querySelectorAll("[data-add]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      count++;
      if (badge) badge.textContent = count;
      toast("已加入購物籃:" + btn.getAttribute("data-add"));
    });
  });

  // 表單(示範,不送出)
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      toast("感謝您的來信,我們會於兩個工作日內回覆。");
      form.reset();
    });
  }

  // 頁尾年份
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
