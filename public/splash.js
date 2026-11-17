/**
 * Instant Pure JS Splash Screen Controller
 * Runs synchronously in <head> to prevent FOUC / delayed flashes.
 */
(function () {
  try {
    if (
      sessionStorage.getItem("aa-splash-seen") === "1" ||
      (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      document.documentElement.classList.add("aa-splash-skip");
      window.__aa_splash_done = true;
    }
  } catch {
    // ignore
  }

  var splashDone = false;

  function finishSplash() {
    if (splashDone) return;
    splashDone = true;
    window.__aa_splash_done = true;
    document.documentElement.classList.add("aa-splash-done");
    try {
      sessionStorage.setItem("aa-splash-seen", "1");
    } catch {
      // ignore
    }

    var splash = document.getElementById("initial-splash");
    if (!splash) return;

    splash.classList.add("aa-splash--leaving");
    window.dispatchEvent(new CustomEvent("aa-splash-finish"));

    setTimeout(function () {
      if (splash && splash.parentNode) {
        splash.parentNode.removeChild(splash);
      }
      document.documentElement.classList.add("aa-splash-done");
    }, 560);
  }

  window.finishSplash = finishSplash;

  function initProgress() {
    if (document.documentElement.classList.contains("aa-splash-skip")) {
      var skipped = document.getElementById("initial-splash");
      if (skipped && skipped.parentNode) {
        skipped.parentNode.removeChild(skipped);
      }
      return;
    }

    var splash = document.getElementById("initial-splash");
    if (!splash) return;

    var fill = splash.querySelector(".aa-progress-fill");
    var pct = splash.querySelector(".aa-progress-pct");
    var label = splash.querySelector(".aa-progress-status");
    var skip = splash.querySelector(".aa-skip");

    if (skip) {
      skip.addEventListener("click", finishSplash);
    }

    var startTime = null;
    var duration = 1200; // 1.2s smooth animation

    function step(timestamp) {
      if (splashDone) return;
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var t = Math.min(elapsed / duration, 1);
      // easeOutCubic
      var progress = Math.round((1 - Math.pow(1 - t, 3)) * 100);

      if (fill) fill.style.width = progress + "%";
      if (pct) pct.textContent = progress + "%";

      if (progress >= 100) {
        if (label) label.textContent = "Welcome to my portfolio";
        setTimeout(finishSplash, 240);
      } else {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProgress);
  } else {
    initProgress();
  }
})();
