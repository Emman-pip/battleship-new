const { Ship } = require("../src/factories");

const ship1 = Ship(1);
const ship2 = Ship(2);

test("Ship not sunk", () => {
  expect(ship1.isSunk()).toBeFalsy();
  expect(ship2.isSunk()).toBeFalsy();
});

test("Ship hit will sink", () => {
  ship1.hit();
  ship2.hit();
  ship2.hit();
  expect(ship1.isSunk()).toBeTruthy();
  expect(ship2.isSunk()).toBeTruthy();
});
