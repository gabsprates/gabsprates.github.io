import React from "react";
import { site } from "../../../config/site";
import { PAGES } from "../../../config/pages";

export const SiteContext = React.createContext<SiteType<typeof PAGES>>(site);
