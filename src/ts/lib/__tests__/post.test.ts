import path from "path";
import { getPostFile } from "../post";

describe("getPostFile", () => {
  const day = "15",
    year = "2020",
    month = "04",
    post = "file";

  const testFile = `${year}-${month}-${day}-${post}.md`;

  it(`must to return "./${testFile}" content`, () => {
    expect(
      getPostFile(
        { [testFile]: path.resolve(__dirname, testFile) },
        {
          day,
          year,
          month,
          post,
        }
      )
    ).toEqual("# lorem ipsum\n");
  });
});
