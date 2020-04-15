import React from "react";
import { Header } from "../header";
import { render } from "@testing-library/react";
import { site } from "../../../../config/site";

describe("<Header />", () => {
  it(`must to render correctly`, () => {
    const header = render(<Header />);
    expect(header.getByText(site.metadata.title));
    expect(header.getByText("Sobre mim"));
    expect(header.getByText("Projetos"));
    expect(header.getByText("Talks"));
  });
});
