import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import ProgressBar from "../../../components/ui/progress-bar";

describe("ProgressBar", () => {
  test("should render", () => {
    const { container } = render(<ProgressBar />);
    expect(container).toBeDefined();
  });

  test("should width 100% when determinate", async () => {
    const { findByTitle } = render(<ProgressBar determinate />);
    const progressBar = await findByTitle("progress-bar");
    expect(progressBar).toHaveStyle("width: 100%");
  });

  test("should width 0% when progress is 0", async () => {
    const { findByTitle } = render(<ProgressBar progress={0} />);
    const progressBar = await findByTitle("progress-bar");
    expect(progressBar).toHaveStyle("width: 0%");
  });

  test("should width 50% when progress is 50", async () => {
    const { findByTitle } = render(<ProgressBar progress={50} />);
    const progressBar = await findByTitle("progress-bar");
    expect(progressBar).toHaveStyle("width: 50%");
  });

  test("should width 100% when progress is 100", async () => {
    const { findByTitle } = render(<ProgressBar progress={100} />);
    const progressBar = await findByTitle("progress-bar");
    expect(progressBar).toHaveStyle("width: 100%");
  });
});
