const { Player } = require("../src/factories");

describe("Player factory", () => {
  test("Player has gameboard", () => {
    const p1 = Player();
    const p2 = Player();
    expect(p1.board).not.toBeNull();
    expect(p2.board).not.toBeNull();
  });
});
