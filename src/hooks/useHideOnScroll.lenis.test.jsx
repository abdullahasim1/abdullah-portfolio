import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

/* Lenis ka fake instance — hook getLenis() se yehi leta hai aur is
   par "scroll" subscribe karta hai. Har emit ek RAF frame jaisa hai:
   velocity = animatedScroll ka per-frame delta. */
const { fakeLenis } = vi.hoisted(() => {
  const listeners = new Set();
  const fake = {
    animatedScroll: 0,
    velocity: 0,
    on: (_event, fn) => listeners.add(fn),
    off: (_event, fn) => listeners.delete(fn),
    emit(patch) {
      Object.assign(fake, patch);
      listeners.forEach((fn) => fn(fake));
    },
    reset() {
      listeners.clear();
      fake.animatedScroll = 0;
      fake.velocity = 0;
    },
  };
  return { fakeLenis: fake };
});

vi.mock("../lib/smoothScroll", () => ({
  getLenis: () => fakeLenis,
}));

import { useHideOnScroll } from "./useHideOnScroll";

function frames(list) {
  act(() => {
    list.forEach((patch) => fakeLenis.emit(patch));
  });
}

describe("useHideOnScroll (Lenis-driven)", () => {
  it("hides on sustained downward scroll and stays hidden on pause", () => {
    fakeLenis.reset();
    const { result } = renderHook(() => useHideOnScroll());
    // neeche scroll: kai frames, har frame velocity > 0
    frames([
      { animatedScroll: 400, velocity: 14 },
      { animatedScroll: 430, velocity: 18 },
      { animatedScroll: 470, velocity: 22 },
    ]);
    expect(result.current).toBe(true);
    // pause: velocity 0 — state flip nahi hona chahiye (pin plateau)
    frames([
      { animatedScroll: 470, velocity: 0 },
      { animatedScroll: 470, velocity: 0 },
    ]);
    expect(result.current).toBe(true);
    // slow tail bhi neeche ki taraf hai — hidden hi rahe
    frames([
      { animatedScroll: 474, velocity: 2 },
      { animatedScroll: 477, velocity: 1.5 },
    ]);
    expect(result.current).toBe(true);
  });

  it("a single upward gesture reveals the header", () => {
    fakeLenis.reset();
    const { result } = renderHook(() => useHideOnScroll());
    frames([
      { animatedScroll: 500, velocity: 20 },
      { animatedScroll: 540, velocity: 20 },
    ]);
    expect(result.current).toBe(true);
    frames([{ animatedScroll: 512, velocity: -16 }]);
    expect(result.current).toBe(false);
  });

  it("ignores sub-threshold direction jitter", () => {
    fakeLenis.reset();
    const { result } = renderHook(() => useHideOnScroll());
    frames([
      { animatedScroll: 500, velocity: 20 },
      { animatedScroll: 540, velocity: 20 },
    ]);
    expect(result.current).toBe(true);
    // chhoti ulta seedha harkat — threshold (6) se kam accumulation
    frames([
      { animatedScroll: 537, velocity: -3 },
      { animatedScroll: 540, velocity: 3 },
      { animatedScroll: 538, velocity: -2 },
    ]);
    expect(result.current).toBe(true);
  });

  it("stays visible near the top even while moving down", () => {
    fakeLenis.reset();
    const { result } = renderHook(() => useHideOnScroll());
    frames([{ animatedScroll: 90, velocity: 25 }]);
    expect(result.current).toBe(false);
  });

  it("suspended forces the header visible under Lenis too", () => {
    fakeLenis.reset();
    const { result, rerender } = renderHook(
      (props) => useHideOnScroll(props),
      { initialProps: { suspended: false } },
    );
    frames([
      { animatedScroll: 500, velocity: 20 },
      { animatedScroll: 540, velocity: 20 },
    ]);
    expect(result.current).toBe(true);
    rerender({ suspended: true });
    expect(result.current).toBe(false);
    frames([{ animatedScroll: 600, velocity: 20 }]);
    expect(result.current).toBe(false);
  });
});
