export const getCssFromChunk = (style?: string | string[]) => {
  if (!style) return [];

  if (style instanceof Array)
    style = style.filter((path) => path.endsWith(".css"));

  return style instanceof Array ? style : [style];
};
