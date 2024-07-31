const { Gameboard } = require("../src/factories");

test("Gameboard place: case 1 (same vertical)", () => {
  const game = Gameboard();
  game.placeShip(["A", 1], ["A", 5]);
  expect(String(game.getOccupied())).toMatch(
    String([
      ["A", 1],
      ["A", 2],
      ["A", 3],
      ["A", 4],
      ["A", 5],
    ]),
  );
});

test("Error Handling 1: Vertical Ship Placement", () => {
  const game = Gameboard();
  game.placeShip(["A", 1], ["A", 2]);
  expect(() => game.placeShip(["A", 1], ["A", 2])).toThrow(
    /^Position is already occupied!$/,
  );
});

test("Gameboard place: case 2 (different vertical)", () => {
  const game = Gameboard();
  game.placeShip(["B", 1], ["D", 1]);
  expect(String(game.getOccupied())).toMatch(
    String([
      ["B", 1],
      ["C", 1],
      ["D", 1],
    ]),
  );
});

test("Error Handling 2: Horizontal Ship Placement", () => {
  const game = Gameboard();
  game.placeShip(["A", 1], ["B", 1]);
  expect(() => game.placeShip(["A", 1], ["B", 1])).toThrow(
    /^Position is already occupied!$/,
  );
});

test("Gameboard Single Block Ship Placement", () => {
  const game = Gameboard();
  game.placeShip(["A", 1], ["A", 1]);
  expect(String(game.getOccupied())).toMatch(String(["A", 1]));
});

test("Get ships", () => {
  const game = Gameboard();
  game.placeShip(["A", 1], ["A", 5]);
  game.placeShip(["B", 1], ["B", 5]);
  game.placeShip(["C", 1], ["E", 1]);
  expect(String(game.getShips())).toBe(
    String([
      [
        {},
        [
          ["A", 1],
          ["A", 2],
          ["A", 3],
          ["A", 4],
          ["A", 5],
        ],
      ],
      [
        {},
        [
          ["B", 1],
          ["B", 2],
          ["B", 3],
          ["B", 4],
          ["B", 5],
        ],
      ],
      [
        {},
        [
          ["C", 1],
          ["D", 1],
          ["E", 1],
        ],
      ],
    ]),
  );
  expect(game.getShips()[0][0].len).toEqual(5);
  expect(game.getShips()[2][0].len).toEqual(3);
});
