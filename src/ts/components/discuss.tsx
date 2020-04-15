import React from "react";

export const Discuss = () => (
  <React.Fragment>
    <div id="disqus_thread" />
    <script dangerouslySetInnerHTML={{ __html: "/* @TODO discuss */" }} />
    <noscript>
      Please enable JavaScript to view the{" "}
      <a href="https://disqus.com/?ref_noscript" rel="nofollow">
        comments powered by Disqus.
      </a>
    </noscript>
  </React.Fragment>
);
