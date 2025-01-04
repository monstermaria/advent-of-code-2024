const fs = require("node:fs");

input = "";

try {
  input = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.error(err);
}

input = input.split("\n");

numberOfSafeReports = 0;

input.forEach(element => {
  reportIsSafe = true;
  report = element.split(" ");

  // console.log(report);

  // determine increase or decrease
  increase = false;
  firstLevel = report.shift();
  secondLevel = report.shift();

  difference = firstLevel - secondLevel;
  if (difference > 0) {
    increase = true;
  }

  // console.log("increase", increase);

  // determine if steps are ok
  while (secondLevel !== undefined && reportIsSafe === true) {
    difference = firstLevel - secondLevel;

    if (difference === 0 || Math.abs(difference) > 3) {
      reportIsSafe = false;
    } else if (increase === true && difference < 0) {
      reportIsSafe = false;
    } else if (increase === false && difference > 0) {
      reportIsSafe = false;
    }

    firstLevel = secondLevel;
    secondLevel = report.shift();
  }

  // console.log("report is safe", reportIsSafe);

  if (reportIsSafe) {
    numberOfSafeReports++;
  }

});

console.log(numberOfSafeReports);
