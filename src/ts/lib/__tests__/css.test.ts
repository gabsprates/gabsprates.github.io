import { getCssFromChunk } from "../css";

describe("getCssFromChunk", () => {
  [
    {
      receive: undefined,
      expect: [],
    },
    {
      receive: "style",
      expect: ["style"],
    },
    {
      receive: ["sript1.js", "style1.css", "style2.css"],
      expect: ["style1.css", "style2.css"],
    },
  ].forEach((testCase) => {
    it(`must to return ${
      testCase.expect
    } when receive "${testCase.receive?.toString()}"`, () => {
      expect(getCssFromChunk(testCase.receive)).toEqual(testCase.expect);
    });
  });
});
