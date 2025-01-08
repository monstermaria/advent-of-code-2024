const fs = require("node:fs");

let input = "";

try {
  input = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.error(err);
}

input = input.split("\n\n");

let rules = input[0].split("\n");
let printouts = input[1].split("\n");


// make a unified set of rules
const unifiedRules = {};

for (let i = 0; i < rules.length; i++) {
  const rule = rules[i].split("|");

  const first = rule[0];
  const second = rule[1];

  if (!unifiedRules[first]) {
    unifiedRules[first] = {
      before: [],
      after: []
    }
  }

  if (!unifiedRules[first].after.includes(second)) {
    unifiedRules[first].after.push(second);
  }

  if (!unifiedRules[second]) {
    unifiedRules[second] = {
      before: [],
      after: []
    }
  }

  if (!unifiedRules[second].before.includes(first)) {
    unifiedRules[second].before.push(first);
  }
}


let sumOfMiddlePageNumbers = 0;

// check the printouts for correct page order
for (let i = 0; i < printouts.length; i++) {
  const pages = printouts[i].split(",");
  let printoutOk = true;

  for (let j = 0; j < pages.length; j++) {
    const page = pages[j];
    const rules = unifiedRules[page];

    for (let k = 0; k < j; k++) {
      if (!rules.before.includes(pages[k])) {
        printoutOk = false;
        break;
      }
    }

    if (!printoutOk) {
      break;
    }

    for (let l = j + 1; l < pages.length; l++) {
      if (!rules.after.includes(pages[l])) {
        printoutOk = false;
        break;
      }
    }

    if (!printoutOk) {
      break;
    }

  }

  // printout ok, find middle element
  if (printoutOk) {
    const indexOfMiddlePage = Math.floor(pages.length / 2);

    sumOfMiddlePageNumbers = sumOfMiddlePageNumbers + Number.parseInt(pages[indexOfMiddlePage]);
  }
}

console.log(sumOfMiddlePageNumbers);
