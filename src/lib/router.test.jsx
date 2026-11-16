import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen, act } from "@testing-library/react";
import { RouterProvider } from "./router.jsx";

/* Regression (2026-11-16): RouterProvider ka effect ek aise
   `onPageHide` handler ko reference karta tha jo kahin define hi
   nahi tha — page load par ReferenceError, React root unmount,
   production mein har route blank white. Ye tests usi ko lock
   karte hain: provider saaf mount ho, aur pagehide par scroll
   position history state mein save ho. */

describe("RouterProvider", () => {
  it("baghair crash ke mount hota hai aur children render rehte hain", () => {
    render(
      <RouterProvider>
        <div>route content</div>
      </RouterProvider>,
    );
    expect(screen.getByText("route content")).toBeInTheDocument();
  });

  it("pagehide par current scroll history state mein save hota hai", () => {
    render(
      <RouterProvider>
        <div>route content</div>
      </RouterProvider>,
    );
    act(() => {
      window.dispatchEvent(new Event("pagehide"));
    });
    expect(window.history.state?.__scrollY).toBe(window.scrollY);
  });
});
