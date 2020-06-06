declare module "*.md" {
  type ContentType = string;
  const content: ContentType;
  export = content;
}

declare module "*.markdown" {
  type ContentType = string;
  const content: ContentType;
  export = content;
}
