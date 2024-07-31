const Ship = (length) => {
  const len = length;
  let timesHit = 0;
  let sunk = false;
  const hit = () => {
    if (timesHit + 1 > len) {
      throw new Error("Already sunk");
    }
    timesHit++;
    if (timesHit === len) {
      sunk = true;
    }
  };
  function isSunk() {
    return sunk;
  }
  return { isSunk, hit, len };
};

const Gameboard = () => {
  const occupied = [];

  const ships = [];

  const shipMaker = (start, end) => {
    if (start[0] == end[0]) {
      return Ship(end[1] - start[1] + 1);
    } else {
      return Ship(end[0].charCodeAt(0) - start[0].charCodeAt(0) + 1);
    }
  };

  const placeShip = (start, end) => {
    const tempPos = [];

    const case1LoopLogic = (start, i) => {
      if (String(occupied).includes(String([start[0], i]))) {
        throw new Error("Position is already occupied!");
      }
      tempPos.push([start[0], i]);
    };

    const case2LoopLogic = (start, i) => {
      if (
        String(occupied).includes(String([String.fromCharCode(i), start[1]]))
      ) {
        throw new Error("Position is already occupied!");
      }
      tempPos.push([String.fromCharCode(i), start[1]]);
    };

    if (start[0] == end[0]) {
      for (let i = start[1]; i <= end[1]; i++) {
        case1LoopLogic(start, i);
      }
    } else {
      for (let i = start[0].charCodeAt(0); i <= end[0].charCodeAt(0); i++) {
        case2LoopLogic(start, i);
      }
    }
    ships.push([shipMaker(start, end), []]);
    tempPos.forEach((e) => {
      occupied.push(e);
      ships[ships.length - 1][1].push(e);
    });
  };
  const getOccupied = () => occupied;
  const getShips = () => ships;
  return { placeShip, getOccupied, getShips };
};

module.exports = { Ship, Gameboard };
