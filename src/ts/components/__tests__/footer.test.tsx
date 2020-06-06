import React from "react";
import { Footer } from "../footer";
import { render } from "@testing-library/react";
import { site } from "../../../../config/site";

describe("<Footer />", () => {
  it(`must to render correctly`, () => {
    const footer = render(<Footer />);
    expect(footer.getByText(site.metadata.title));

    const [start, end] = site.metadata.description.split("\n");
    expect(footer.getByText(new RegExp(`^${start}`)));
    expect(footer.getByText(new RegExp(`${end}$`)));
  });
});
