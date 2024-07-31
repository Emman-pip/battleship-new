const { Gameboard } = require("../src/factories");

describe("Ship placement", () => {
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
});

describe("Ship data checking", () => {
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
});

describe("Receive attacks", () => {
  test("no hits", () => {
    const game = Gameboard();
    expect(game.receiveAttack("A", 1)).toBeFalsy();
    expect(game.receiveAttack("A", 5)).toBeFalsy();
  });
  test("hits", () => {
    const game = Gameboard();
    game.placeShip(["A", 1], ["A", 1]);
    game.placeShip(["B", 1], ["E", 1]);
    expect(game.receiveAttack("A", 1)).toBeTruthy();
    expect(game.receiveAttack("D", 1)).toBeTruthy();
    expect(game.getShips()[0][0].isSunk()).toBeTruthy();
    expect(game.getShips()[1][0].isSunk()).toBeFalsy();
  });
});
