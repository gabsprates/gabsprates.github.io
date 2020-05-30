type PostURLParams = {
  year: string;
  month: string;
  day: string;
  post: string;
};

type PostAttributes = {
  tags: string[];
  title: string;
  description?: string;
};
