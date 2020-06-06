import { getDate, getFormatedDate } from "../date";

describe("getDate", () => {
  describe("when date is valid", () => {
    [
      { year: 2020, month: 1, day: 1 },
      { year: 2020, month: 2, day: 1 },
      { year: 2020, month: 3, day: 2 },
      { year: 2021, month: 11, day: 1 },
    ].forEach((testCase) => {
      const json = JSON.stringify(testCase);

      it(`must to return ${json} when receive ${json}`, () => {
        const date = getDate(testCase.year, testCase.month, testCase.day);

        expect(date.getDate()).toEqual(testCase.day);
        expect(date.getMonth()).toEqual(testCase.month - 1);
        expect(date.getFullYear()).toEqual(testCase.year);
      });
    });
  });

  describe("when date is invalid", () => {
    [
      { year: 2020, month: "string", day: 1 },
      { year: "string", month: 1, day: 1 },
      { year: 2020, month: 1, day: "string" },
    ].forEach((testCase) => {
      const json = JSON.stringify(testCase);

      it(`must to return today's date when receive ${json}`, () => {
        const date = getDate(+testCase.year, +testCase.month, +testCase.day);
        const today = new Date();

        expect(date.getDate()).toEqual(today.getDate());
        expect(date.getMonth()).toEqual(today.getMonth());
        expect(date.getFullYear()).toEqual(today.getFullYear());
      });
    });
  });
});

describe("getFormatedDate", () => {
  [
    { year: 2019, month: 0, day: 1, expected: "Jan 1, 2019" },
    { year: 2020, month: 2, day: 1, expected: "Mar 1, 2020" },
    { year: 2020, month: 3, day: 2, expected: "Apr 2, 2020" },
    { year: 2021, month: 11, day: 15, expected: "Dec 15, 2021" },
  ].forEach((testCase) => {
    it(`must to return ${testCase.expected}`, () => {
      const date = new Date(testCase.year, testCase.month, testCase.day);

      expect(getFormatedDate(date)).toEqual(testCase.expected);
    });
  });
});
