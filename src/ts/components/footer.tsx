import React, { useContext } from "react";
import { SiteContext } from "../context/site";

export const Footer = () => {
  const site = useContext(SiteContext);

  return (
    <footer>
      <div>
        <p>{site.metadata.title} </p>

        <div>{site.metadata.description}</div>
      </div>
    </footer>
  );
};
