import { site } from "../../../../config/site";
import { getJsonLDBase, getJsonLDForPage, getJsonLDForPost } from "../seo";

describe("getJsonLDBase", () => {
  it(`getJsonLDBase`, () => {
    const props = { url: "/", title: "Home do Site" };
    expect(getJsonLDBase(site, props)).toEqual({
      url: `${site.url}${props.url}`,
      publisher: {
        "@type": "Organization",
        logo: {
          "@type": "ImageObject",
          url: `${site.url}${site.metadata.logo}`,
        },
        name: site.metadata.title,
      },
      author: {
        "@type": "Person",
        name: site.metadata.title,
      },
      headline: props.title,
      description: site.metadata.description.replace("\n", " "),
      "@context": "https://schema.org",
    });
  });
});

describe("getJsonLDForPage", () => {
  it(`getJsonLDForPage`, () => {
    const props = { url: "/about/", title: "Sobre Mim" };
    const jsonld = getJsonLDForPage(site, props);
    expect(jsonld.url).toEqual(`${site.url}${props.url}`);
    expect(jsonld.name).toEqual(site.metadata.title);
    expect(jsonld.headline).toEqual(props.title);
    expect(jsonld["@type"]).toEqual("WebSite");
  });
});

describe("getJsonLDForPost", () => {
  it(`getJsonLDForPost`, () => {
    const props = {
      url: "/2020/05/16/post-bacana-sobre-js.html",
      blog: { published_time: new Date(2020, 4, 16) },
      title: "Post Bacana Sobre JS",
      description:
        "**Descrição** do _post_ [sobre](https://url.com) JS __*com vários*__ highlights no texto!",
    };
    const jsonld = getJsonLDForPost(site, props);
    expect(jsonld.url).toEqual(`${site.url}${props.url}`);
    expect(jsonld.headline).toEqual(props.title);
    expect(jsonld.datePublished).toEqual(props.blog.published_time.toJSON());
    expect(jsonld["@type"]).toEqual("BlogPosting");
  });
});
