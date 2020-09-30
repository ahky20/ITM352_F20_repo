var number = 0;     // Counter for age
var myAge = 21;     // My age 

console.log("Counting Program for Ex2, with break");
while (number < myAge) {
    number++;
    if ((number >= myAge / 2) && (number <= myAge * 3 / 4)) {   //okay to have put break here without {}
        continue;
    }
    console.log("Age=" + number);
}
console.log("No age zone!");