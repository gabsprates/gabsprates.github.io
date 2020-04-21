import path from "path";
import { getPostFile, getPostLink, pathToPostParams } from "../post";

const day = "15",
  year = "2020",
  month = "04",
  post = "file";

const testFile = `${year}-${month}-${day}-${post}.md`;

describe("getPostFile", () => {
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

describe("getPostLink", () => {
  const expected = `/${year}/${month}/${day}/${post}.html`;

  it(`must to return "${expected}"`, () => {
    expect(
      getPostLink({
        day,
        year,
        month,
        post,
      })
    ).toEqual(expected);
  });

  it(`must to return "/"`, () => {
    expect(getPostLink()).toEqual("/");
  });
});

describe("pathToPostParams", () => {
  it(`must to return "${testFile}"`, () => {
    expect(pathToPostParams(testFile)).toEqual({ day, month, year, post });
  });

  it(`must to return "undefined"`, () => {
    expect(pathToPostParams("")).toBeUndefined();
  });
});
