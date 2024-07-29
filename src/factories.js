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
  return { isSunk, hit };
};

module.exports = { Ship };
