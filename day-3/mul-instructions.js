const fs = require("node:fs");

let input = "";

try {
  input = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.error(err);
}

// console.log(input);

const mulCommand = /mul\(\d\d?\d?,\d\d?\d?\)/g;
let acceptedCommands = input.match(mulCommand);

// console.log(acceptedCommands);

let totalSum = 0;

for (let i = 0; i < acceptedCommands.length; i++) {
  const multipliers = acceptedCommands[i].slice(4, -1);
  const numbers = multipliers.split(",");

  totalSum = totalSum + numbers[0] * numbers[1];
}

console.log(totalSum);
