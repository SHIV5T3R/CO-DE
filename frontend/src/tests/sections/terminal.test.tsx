// import { describe, expect, test } from "vitest";
// import { fireEvent, render, screen } from "@testing-library/react";
// import ActivityBar from "../../components/sections/activityBar";
// import Terminal from "@/components/sections/terminal";
// import RightSectionContainer from "@/components/sections/rightSectionContainer";

// Test cases:
// - Create terminal button creates/removes a terminal
// - close button closes the terminal
// - "Ctrl+`" creates a terminal
// - the terminal height persists

// describe("Terminal correctly opens/collapses", () => {
// test("Create terminal button creates/removes a terminal", async () => {
//   render(<ActivityBar />);
//   const menuBtn = screen.getByLabelText("menu");
//   expect(menuBtn).toBeInTheDocument();

//   fireEvent.click(menuBtn);

//   const subMenu = await screen.findByText("Create terminal");
//   expect(subMenu).toBeInTheDocument();

// const terminal = await screen.getByText('TERMINAL');
// expect(terminal).toBeInTheDocument();
// });

// test("Ctrl+` creates a terminal", () => {
//   render(<RightSectionContainer />);
//   expect(screen.getByText('TERMINAL')).not.toBeInTheDocument();

//   fireEvent.keyDown(document, {key: 'Control', code: 'ControlLeft'});
//   fireEvent.keyDown(document, {key: '`', code: 'Backquote'});

//   const terminal = screen.getByText('TERMINAL');
//   expect(terminal).not.toBeInTheDocument();
// });
// });
