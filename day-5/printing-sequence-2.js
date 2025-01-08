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

function checkPageOrder(pages, unifiedRules) {
  for (let j = 0; j < pages.length; j++) {
    const page = pages[j];
    const rules = unifiedRules[page];

    for (let k = 0; k < j; k++) {
      if (!rules.before.includes(pages[k])) {
        return false;
      }
    }

    for (let l = j + 1; l < pages.length; l++) {
      if (!rules.after.includes(pages[l])) {
        return false;
      }
    }
  }

  return true;
}

function sortPages(pages, unifiedRules) {
  while (!checkPageOrder(pages, unifiedRules)) {
    for (let i = 0; i < pages.length - 1; i++) {
      const pageOne = pages[i];
      const pageTwo = pages[i + 1];

      if (unifiedRules[pageOne].before.includes(pageTwo) || unifiedRules[pageTwo].after.includes(pageOne)) {
        pages.splice(i, 1);
        pages.splice(i + 1, 0, pageOne);
      }
    }
  }
}


let sumOfMiddlePageNumbers = 0;

// check the printouts for correct page order
for (let i = 0; i < printouts.length; i++) {
  const pages = printouts[i].split(",");
  const printoutOk = checkPageOrder(pages, unifiedRules);

  // fix the incorrect sequences
  if (!printoutOk) {
    sortPages(pages, unifiedRules);
  
    // printout ok, find middle element
    const indexOfMiddlePage = Math.floor(pages.length / 2);

    sumOfMiddlePageNumbers = sumOfMiddlePageNumbers + Number.parseInt(pages[indexOfMiddlePage]);
  }
}

console.log(sumOfMiddlePageNumbers);
