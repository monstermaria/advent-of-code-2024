const fs = require("node:fs");

let input = "";

try {
  input = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.error(err);
}


// modify input string
let pos = 0;
let modifiedInput ="";

while (pos < input.length) {
  const dontPos = input.indexOf("don't()", pos);
  const doPos = input.indexOf("do()", dontPos);

  if (dontPos === -1) {
    modifiedInput = modifiedInput + input.slice(pos, input.length);
    break;
  }

  if (doPos === -1) {
    break;
  }

  modifiedInput = modifiedInput + input.slice(pos, dontPos);
  pos = doPos;
}


const mulCommand = /mul\(\d\d?\d?,\d\d?\d?\)/g;
const acceptedCommands = modifiedInput.match(mulCommand);

let totalSum = 0;

for (let i = 0; i < acceptedCommands.length; i++) {
  const multipliers = acceptedCommands[i].slice(4, -1);
  const numbers = multipliers.split(",");

  totalSum = totalSum + numbers[0] * numbers[1];
}

console.log(totalSum);
