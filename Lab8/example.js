// Sum the numbers up to a specified integer
// Date: September 30, 2020
// Author: Amber Young

var target = 5 ;    // Limit of the sum of numbers
var counter = 1;    // Counter for the loop
var sum = 0;        // Total of the numbers  added together

console.log(`Welcome to the counting program!`);
while (counter <= target) {
    sum += counter;     // the same as sum = sum + counter;
    console.log(`Sum=${sum}`);
    counter++;
}

console.log(`Final Sum=${sum}`);

sum = 0
console.log(`Second try with For loop`);
for (counter=5; counter > 0; counter--) { // for loop only for counting but you can count however you like
    sum += counter;
    console.log(`Sum=${sum}`);
}
console.log(`Final Sum=${sum}`);
// do with loop aren't recommended because they're buggy