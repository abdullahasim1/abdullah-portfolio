import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useHideOnScroll } from "./useHideOnScroll";

/* jsdom mein scrollY set karke asal scroll event dispatch karte hain —
   hook bilkul waisi hi sunta hai jaisi browser mein sunega. */
function setScrollY(y) {
  Object.defineProperty(window, "scrollY", {
    value: y,
    configurable: true,
    writable: true,
  });
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

describe("useHideOnScroll", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", {
      value: 0,
      configurable: true,
      writable: true,
    });
  });

  it("starts visible and stays visible near the top of the page", () => {
    const { result } = renderHook(() => useHideOnScroll());
    expect(result.current).toBe(false);
    setScrollY(80);
    expect(result.current).toBe(false);
  });

  it("hides on scroll down and returns on scroll up", () => {
    const { result } = renderHook(() => useHideOnScroll());
    setScrollY(600);
    expect(result.current).toBe(true);
    setScrollY(900);
    expect(result.current).toBe(true);
    setScrollY(850);
    expect(result.current).toBe(false);
  });

  it("ignores tiny scroll jitter", () => {
    const { result } = renderHook(() => useHideOnScroll());
    setScrollY(600);
    expect(result.current).toBe(true);
    setScrollY(604); // +4px — threshold (6) se kam
    expect(result.current).toBe(true);
    setScrollY(610); // cumulative drift bhi threshold cross kare to hi flip
    expect(result.current).toBe(true);
  });

  it("suspended (menu open / focus within) forces the header visible", () => {
    const { result, rerender } = renderHook(
      (props) => useHideOnScroll(props),
      { initialProps: { suspended: false } },
    );
    setScrollY(600);
    expect(result.current).toBe(true);
    rerender({ suspended: true });
    expect(result.current).toBe(false);
    setScrollY(900);
    expect(result.current).toBe(false);
  });
});
