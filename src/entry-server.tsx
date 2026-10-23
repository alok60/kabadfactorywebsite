import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { routes } from "./content";
import { seoTags } from "./seo";
import "./styles.css";

export function render(url: string) {
  return renderToString(<App initialPath={url} />);
}

export function tags(url: string) {
  const route = routes.find((item) => item.path === url) || routes.find((item) => item.path === "/")!;
  return seoTags(route);
}
