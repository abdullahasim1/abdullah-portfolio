import { describe, it, expect } from "vitest";
import React, { useRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFocusTrap } from "./useFocusTrap";

function Dialog({ onClose }) {
  const ref = useRef(null);
  useFocusTrap(ref);
  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-label="test dialog">
      <button type="button">first</button>
      <button type="button">last</button>
      <button type="button" onClick={onClose}>
        close
      </button>
    </div>
  );
}

function Harness() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOpen(true)}>
        open
      </button>
      <button type="button">outside</button>
      {open && <Dialog onClose={() => setOpen(false)} />}
    </div>
  );
}

describe("useFocusTrap", () => {
  it("keeps Tab cycling inside the dialog", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "open" }));

    const first = screen.getByRole("button", { name: "first" });
    first.focus();
    expect(first).toHaveFocus();

    await userEvent.tab();
    expect(screen.getByRole("button", { name: "last" })).toHaveFocus();

    await userEvent.tab();
    expect(screen.getByRole("button", { name: "close" })).toHaveFocus();

    // Last element par Tab → wapas first (dialog ke bahar nahi)
    await userEvent.tab();
    expect(first).toHaveFocus();
  });

  it("wraps Shift+Tab backwards from the first element", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "open" }));

    const first = screen.getByRole("button", { name: "first" });
    first.focus();
    await userEvent.tab({ shift: true });
    expect(screen.getByRole("button", { name: "close" })).toHaveFocus();
  });

  it("restores focus to the opener on close", async () => {
    render(<Harness />);
    const opener = screen.getByRole("button", { name: "open" });
    await userEvent.click(opener);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });
});
