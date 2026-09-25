import { useEffect } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled]):not([type=\"hidden\"])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex=\"-1\"])",
].join(", ");

/**
 * Dialog ke andar Tab/Shift+Tab focus ko trap karta hai, aur close
 * hone par focus wapas us element par lautata hai jahan se khula tha.
 *
 * @param {{ current: HTMLElement | null }} ref — dialog ka root element
 * @param {boolean} [active=true]
 */
export function useFocusTrap(ref, active = true) {
  useEffect(() => {
    if (!active) return undefined;
    const container = ref.current;
    if (!container) return undefined;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const getFocusable = () =>
      Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (el) =>
          !el.hasAttribute("disabled") &&
          el.getAttribute("aria-hidden") !== "true" &&
          !el.closest("[hidden]") &&
          // Browsers mein visibility check; jsdom (tests) mein skip
          (typeof el.checkVisibility !== "function" || el.checkVisibility()),
      );

    const onKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const els = getFocusable();
      if (els.length === 0) {
        e.preventDefault();
        container.focus?.();
        return;
      }
      const first = els[0];
      const last = els[els.length - 1];
      const current = document.activeElement;
      const inside = container.contains(current);

      if (e.shiftKey) {
        if (!inside || current === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (!inside || current === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [ref, active]);
}

export default useFocusTrap;
