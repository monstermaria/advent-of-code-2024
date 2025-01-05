const fs = require("node:fs");

let input = "";

try {
  input = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.error(err);
}

input = input.split("\n");

for (let i = 0; i < input.length; i++) {
  input[i] = input[i].split("");
}

// console.log(input);

function findWord(grid, word, x, y, xDir, yDir) {
  // check boundaries
  const xMax = grid[0].length - 1;
  const yMax = grid.length - 1;

  const xStop = x + (word.length - 1) * xDir;
  const yStop = y + (word.length - 1) * yDir;

  if (xStop < 0 || xStop > xMax) {
    return false;
  }

  if (yStop < 0 || y > yMax) {
    return false;
  }

  // check the word
  for (let i = 0; i < word.length; i++) {
    if (word.charAt(i) !== grid[x + i * xDir][y + i * yDir]) {
      return false;
    }
  }

  return true;
}

function findWordAllDirections(grid, word, x, y) {
  let numberFound = 0;

  if (findWord(input, word, x, y, 1, 0)) {
    numberFound++;
  }

  if (findWord(input, word, x, y, -1, 0)) {
    numberFound++;
  }

  if (findWord(input, word, x, y, 0, 1)) {
    numberFound++;
  }

  if (findWord(input, word, x, y, 0, -1)) {
    numberFound++;
  }

  if (findWord(input, word, x, y, 1, 1)) {
    numberFound++;
  }

  if (findWord(input, word, x, y, -1, -1)) {
    numberFound++;
  }

  if (findWord(input, word, x, y, 1, -1)) {
    numberFound++;
  }

  if (findWord(input, word, x, y, -1, 1)) {
    numberFound++;
  }

  // console.log(numberFound);
  return numberFound;
}

let xmasFound = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {

    if (input[i][j] === "X") {
      // console.log("X found at ", i, j);
      // find all possible XMAS
      xmasFound = xmasFound + findWordAllDirections(input, "XMAS", i, j);
    }
  }
}

console.log(xmasFound);
