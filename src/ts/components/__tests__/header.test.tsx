import React from "react";
import { Header } from "../header";
import { render } from "@testing-library/react";
import { site } from "../../../../config/site";

describe("<Header />", () => {
  it(`must to render correctly`, () => {
    const header = render(<Header />);
    expect(header.getByText(site.metadata.title)).toBeInTheDocument();
    expect(header.getByText("Sobre mim")).toBeInTheDocument();
    expect(header.getByText("Projetos")).toBeInTheDocument();
    expect(header.getByText("Talks")).toBeInTheDocument();
  });
});
