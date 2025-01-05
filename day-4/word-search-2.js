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


let xmasFound = 0;

// no need to search the outer rows and columns, because the A has to have a row am a column at either side
for (let i = 1; i < input.length - 1; i++) {
  for (let j = 1; j < input[0].length - 1; j++) {

    if (input[i][j] === "A") {
      const upperLeft = input[i - 1][j - 1];
      const upperRight = input[i - 1][j + 1];
      const lowerLeft = input[i + 1][j - 1];
      const lowerRight = input[i + 1][j + 1];

      let firstBarOk = false;
      let secondBarOk = false;

      if (upperLeft === "M" && lowerRight ==="S" || upperLeft === "S" && lowerRight ==="M") {
        firstBarOk = true;
      }

      if (upperRight === "M" && lowerLeft ==="S" || upperRight === "S" && lowerLeft ==="M") {
        secondBarOk = true;
      }

      if (firstBarOk && secondBarOk) {
        xmasFound++;
      }
    }
  }
}

console.log(xmasFound);
