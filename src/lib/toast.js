/** Minimal toast utility — alerts ke badle use karo. 0KB, no deps. */
let toastEl = null;

function ensureToast() {
  if (toastEl) return toastEl;
  toastEl = document.createElement("div");
  toastEl.id = "aa-toast";
  toastEl.setAttribute("role", "status");
  toastEl.setAttribute("aria-live", "polite");
  toastEl.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9999;
    padding: 14px 20px;
    border-radius: 12px;
    background: linear-gradient(135deg, #06b6d4, #7c3aed);
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 12px 40px rgba(34,211,238,0.3);
    transform: translateY(120px);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
    max-width: 320px;
    pointer-events: none;
  `;
  document.body.appendChild(toastEl);
  return toastEl;
}

export function showToast(message, duration = 3000) {
  const el = ensureToast();
  el.textContent = message;
  // Force reflow then animate in
  requestAnimationFrame(() => {
    el.style.transform = "translateY(0)";
    el.style.opacity = "1";
  });
  setTimeout(() => {
    el.style.transform = "translateY(120px)";
    el.style.opacity = "0";
  }, duration);
}