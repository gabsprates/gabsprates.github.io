import React from "react";
import { site } from "../../../config/site";

export const SiteContext = React.createContext<SiteAndPosts>({
  ...site,
  posts: {},
});
