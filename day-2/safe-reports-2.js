const fs = require("node:fs");

let input = "";

try {
  input = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.error(err);
}

input = input.split("\n");

let numberOfSafeReports = 0;


function reportIsSafe(report) {
  let isSafe = true;

  // determine increase or decrease
  let increase = false;
  let firstLevel = report.shift();
  let secondLevel = report.shift();

  difference = firstLevel - secondLevel;
  if (difference > 0) {
    increase = true;
  }

  // determine if steps are ok
  while (secondLevel !== undefined && isSafe === true) {
    difference = firstLevel - secondLevel;

    if (difference === 0 || Math.abs(difference) > 3) {
      isSafe = false;
    } else if (increase === true && difference < 0) {
      isSafe = false;
    } else if (increase === false && difference > 0) {
      isSafe = false;
    }

    firstLevel = secondLevel;
    secondLevel = report.shift();
  }

  return isSafe;
}

function reportIsSafeWithDampener(report) {
  // test all possible removals of one level, until a safe report is found
  for (let i = 0; i < report.length; i++) {
    const reportCopy = report.slice();

    reportCopy.splice(i, 1);

    if (reportIsSafe(reportCopy)) {
      return true;
    }
  }

  // no safe report was found
  return false;
}

input.forEach(element => {
  const report = element.split(" ");

  if (reportIsSafeWithDampener(report)) {
    numberOfSafeReports++;
  }

});

console.log(numberOfSafeReports);
