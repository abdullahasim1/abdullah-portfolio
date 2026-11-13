import { describe, it, expect, beforeEach } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import BusinessHelpWidget from "./BusinessHelpWidget";

const WIDGET_SRC = "https://clone-bussiness-help.vercel.app/widget.js";

function widgetScripts() {
  return document.querySelectorAll(`script[src="${WIDGET_SRC}"]`);
}

describe("BusinessHelpWidget", () => {
  beforeEach(() => {
    widgetScripts().forEach((s) => s.remove());
  });

  it("renders nothing itself", () => {
    const { container } = render(<BusinessHelpWidget />);
    expect(container).toBeEmptyDOMElement();
  });

  it("injects the widget script with the embed attributes", () => {
    render(<BusinessHelpWidget />);
    const scripts = widgetScripts();
    expect(scripts).toHaveLength(1);
    expect(scripts[0].getAttribute("data-business-id")).toBe("8");
    expect(scripts[0].getAttribute("data-widget-key")).toBe(
      "cmwexoy200001le079xr7ps3o",
    );
  });

  it("does not inject a second script on remount", () => {
    const first = render(<BusinessHelpWidget />);
    first.unmount();
    render(<BusinessHelpWidget />);
    expect(widgetScripts()).toHaveLength(1);
  });
});
