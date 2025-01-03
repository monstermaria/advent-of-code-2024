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


indexLeft = 0;
indexRight = 0;
totalSimilarityScore = 0;
currentLocationId = leftColumn[0];
numberOfMatches = 0;

while (indexLeft < leftColumn.length) {
  left = leftColumn[indexLeft];
  right = rightColumn[indexRight];

  // no match, update right
  if (left > right) {
    indexRight++;
    continue;
  }

  // match found for this location id
  // check for duplicates in right column
  while (left === right) {
    numberOfMatches++;
    indexRight++;
    right = rightColumn[indexRight];
  }

  // calculate partial similarity score
  partialSimilarityScore = left * numberOfMatches;
  
  // check for duplicates in left column
  while (left === currentLocationId) {
    totalSimilarityScore = totalSimilarityScore + partialSimilarityScore;

    indexLeft++;
    left = leftColumn[indexLeft];
  }

  numberOfMatches = 0;
  currentLocationId = leftColumn[indexLeft];
}

console.log(totalSimilarityScore);
