const average = require("../utils/for_testing").average;

describe("average", () => {
  test("of one value is the value itself", () => {
    expect(average([3])).toBe(3);
  });

  test("of many is calculated right", () => {
    expect(average([1, 2, 3, 4, 5, 6, 7])).toBe(4);
  });

  test("of empty array is zero", () => {
    expect(average([])).toBe(0);
  });
});
