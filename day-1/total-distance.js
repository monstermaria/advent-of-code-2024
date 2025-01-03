const fs = require("node:fs");

input = "";

try {
  input = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.error(err);
}

input = input.split("\n");

leftColumn = [];
rightColumn = [];

input.forEach(element => {
  pair = element.split("   ");

  leftColumn.push(pair[0]);
  rightColumn.push(pair[1]);
});

leftColumn.sort();
rightColumn.sort();

sumOfDistances = 0;

for (let i = 0; i < leftColumn.length; i++) {
  distance = rightColumn[i] - leftColumn[i];
  sumOfDistances = sumOfDistances + Math.abs(distance);
}

console.log(sumOfDistances);
