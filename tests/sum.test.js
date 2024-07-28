const sum = require("../src/index");

test("test sum [1+2]", () => {
  expect(sum(1, 2)).toBe(3);
});
