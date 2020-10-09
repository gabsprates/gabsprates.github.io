import React, { useContext } from "react";
import { SiteContext } from "../context/site";

export const Discuss = (props: { url: string }) => {
  const { url } = useContext<SiteAndPosts>(SiteContext);

  return (
    <React.Fragment>
      <div id="disqus_thread" />
      <script
        dangerouslySetInnerHTML={{
          __html: `var disqus_config = function () {
  this.page.url = "${url + props.url}";
  this.page.identifier = "${props.url.replace(/\.html?$/, "")}";
};
(function() {  // DON'T EDIT BELOW THIS LINE
  var d = document, s = d.createElement('script');
  s.src = '//gabsprates.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
})();`,
        }}
      />
      <noscript>
        Please enable JavaScript to view the{" "}
        <a href="https://disqus.com/?ref_noscript" rel="nofollow">
          comments powered by Disqus.
        </a>
      </noscript>
    </React.Fragment>
  );
};
