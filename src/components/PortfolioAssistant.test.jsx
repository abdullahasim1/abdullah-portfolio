import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PortfolioAssistant from "./PortfolioAssistant";

describe("PortfolioAssistant", () => {
  it("renders the launcher bubble with an accessible label", () => {
    render(<PortfolioAssistant />);
    expect(
      screen.getByRole("button", { name: /open abdullah's ai assistant/i }),
    ).toBeInTheDocument();
  });

  it("opens the panel with greeting, Ready status and suggested questions", async () => {
    const user = userEvent.setup();
    render(<PortfolioAssistant />);
    await user.click(
      screen.getByRole("button", { name: /open abdullah's ai assistant/i }),
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/answers from his portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/I'm Abdullah's AI assistant/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "What services does Abdullah offer?" }),
    ).toBeInTheDocument();
  });

  it("answers when a suggested question chip is clicked", async () => {
    const user = userEvent.setup();
    render(<PortfolioAssistant />);
    await user.click(
      screen.getByRole("button", { name: /open abdullah's ai assistant/i }),
    );
    await user.click(
      screen.getByRole("button", { name: "How can I hire Abdullah?" }),
    );
    // Email jawab ke text mein bhi hai aur mailto link ke label mein bhi
    expect(screen.getAllByText(/abdullah\.gc\.18@gmail\.com/).length).toBeGreaterThan(0);
  });

  it("answers a typed question through the input form", async () => {
    const user = userEvent.setup();
    render(<PortfolioAssistant />);
    await user.click(
      screen.getByRole("button", { name: /open abdullah's ai assistant/i }),
    );
    await user.type(
      screen.getByLabelText(/ask about abdullah's work/i),
      "How many certifications does he have?",
    );
    await user.click(screen.getByRole("button", { name: "Send" }));
    expect(screen.getByText(/certifications and training credentials/i)).toBeInTheDocument();
  });

  it("closes with the close button and with Escape", async () => {
    const user = userEvent.setup();
    render(<PortfolioAssistant />);
    const openBtn = () =>
      screen.getByRole("button", { name: /open abdullah's ai assistant/i });
    await user.click(openBtn());
    await user.click(screen.getByRole("button", { name: /close assistant/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(openBtn());
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
