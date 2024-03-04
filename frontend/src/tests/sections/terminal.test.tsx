import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import ActivityBar from "@/components/sections/activityBar";

// - Create terminal button creates/removes a terminal
// - close button closes the terminal
// - "Ctrl+`" creates a terminal
// - the terminal height persists

describe("Terminal correctly opens/collapses", () => {
  test("Create terminal button creates/removes a terminal", () => {
    render(<ActivityBar />);
    const menuBtn = screen.getByRole('button', {name: /menu/i});
    expect(menuBtn).toBeInTheDocument();
  });
})