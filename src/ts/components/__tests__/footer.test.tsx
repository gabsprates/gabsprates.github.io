import React from "react";
import { Footer } from "../footer";
import { render } from "@testing-library/react";
import { site } from "../../../../config/site";

describe("<Footer />", () => {
  it(`must to render correctly`, () => {
    const footer = render(<Footer />);
    expect(footer.getByText(site.metadata.title));
    expect(footer.getByText(site.metadata.description));
  });
});
